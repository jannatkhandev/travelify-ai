import { GoogleGenerativeAI } from '@google/generative-ai';
import { differenceInDays } from 'date-fns';
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  } else {
    try {
      const body = await req.json();
      const { from, to, dateRange, budget, travelingWith, activities, foodPreferences } = body;

      const tripDuration = differenceInDays(new Date(dateRange.to), new Date(dateRange.from));

      const prompt = `
      You are a travel planning assistant that responds only in valid JSON format without any backticks or comments.
      Generate a detailed ${tripDuration}-day travel itinerary for a trip to ${to}. 
      The trip is planned for ${travelingWith} with a ${budget} budget, interested in ${activities.join(', ')} activities, and preferring ${foodPreferences.join(', ')} food.
      
      Format the response as a JSON object with the following structure:
      {
        "name": "Trip from ${from} to ${to}",
        "days": ${tripDuration},
        "budget": Total expected budget amount of entire trip in USD (e.g., 1000),
        "fromPlace": "${from}",
        "toPlace": "${to}",
        "with": "${travelingWith.toLowerCase()}",
        "type": "${budget.toUpperCase()}",
        "dailyPlans": [
          {
            "dayNumber": 1,
            "places": [
              {
                "name": "Place 1",
                "description": "A brief description of the place and what to do there",
                "latitude": 0.0,
                "longitude": 0.0
              },
              {
                "name": "Place 2",
                "description": "Another brief description of the place and its unique features",
                "latitude": 0.0,
                "longitude": 0.0
              }
            ],
            "restaurants": [
              {
                "name": "Restaurant 1",
                "description": "A brief description of the restaurant and what to try there",
                "latitude": 0.0,
                "longitude": 0.0
              },
              {
                "name": "Restaurant 2",
                "description": "Another brief description of the restaurant and its specialty",
                "latitude": 0.0,
                "longitude": 0.0
              }
            ],
            "activities": [
              {
                "name": "Activity 1",
                "description": "A brief description of the activity and what to expect",
                "latitude": 0.0,
                "longitude": 0.0
              },
              {
                "name": "Activity 2",
                "description": "Another brief description of the activity and its highlights",
                "latitude": 0.0,
                "longitude": 0.0
              }
            ]
          }
          // ... repeat for each day
        ]
      }
      
      Ensure the itinerary is tailored to the specified preferences and budget. Include realistic latitude and longitude coordinates for each place, restaurant, and activity. Provide brief, engaging descriptions for restaurants and activities, highlighting key features or recommendations, similar to these examples:
      
      For a place: "Visit the iconic Blue Mosque, a historic mosque known for its blue tiles and unique architecture"
      For a restaurant: "Stop near Bereketzade and enjoy the famous San Sebastian Cheesecake at Viyana kahvesi"
      For an activity: "Explore iconic scenes at Cappadocia, including hot air balloon rides and cave dwellings"
      
      Make sure each description is unique and specific to the location and activity.`;

      const model =  genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      let parsedItinerary;
      try {
        parsedItinerary = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        // Attempt to clean the response and try again (fallback)
        const cleanedText = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        try {
          parsedItinerary = JSON.parse(cleanedText);
        } catch (fallbackError) {
          console.error('Failed to parse cleaned JSON:', fallbackError);
          throw new Error('Unable to parse AI response');
        }
      }

      const slug = `${from}-to-${to}-${Date.now()}`.toLowerCase().replace(/\s+/g, '-');
      
      const tripData = {
        name: String(parsedItinerary.name || ''),
        days: Number(parsedItinerary.days || 0),
        budget: Number(parsedItinerary.budget || 0),
        fromPlace: String(parsedItinerary.fromPlace || ''),
        toPlace: String(parsedItinerary.toPlace || ''),
        type: String(parsedItinerary.type || '').toUpperCase(),
        with: String(parsedItinerary.with || '').toLowerCase(),
        slug: String(slug || ''),
        user: {
          connect: { id: String(session.user.id) }
        },
        dailyPlans: {
          create: (parsedItinerary.dailyPlans || []).map(plan => ({
            dayNumber: Number(plan.dayNumber || 0),
            places: {
              create: (plan.places || []).map(place => ({
                name: String(place.name || ''),
                description: String(place.description || ''),
                latitude: Number(place.latitude || 0),
                longitude: Number(place.longitude || 0),
              }))
            },
            restaurants: {
              create: (plan.restaurants || []).map(restaurant => ({
                name: String(restaurant.name || ''),
                description: String(restaurant.description || ''),
                latitude: Number(restaurant.latitude || 0),
                longitude: Number(restaurant.longitude || 0),
              }))
            },
            activities: {
              create: (plan.activities || []).map(activity => ({
                name: String(activity.name || ''),
                description: String(activity.description || ''),
                latitude: Number(activity.latitude || 0),
                longitude: Number(activity.longitude || 0),
              }))
            }
          }))
        }
      };

      const res = await db.trip.create({
          data: tripData
        });
    
      return NextResponse.json({ success: true, slug: slug });
      
    } catch (error) {
      console.error('Error generating trip:', error);
      return NextResponse.json({ success: false, error: 'Failed to generate trip' }, { status: 500 });
    }
  }
}