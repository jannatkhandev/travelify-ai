"use client"
// src/components/TripDetail.jsx
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlaneDeparture, FaPlaneArrival, FaWallet, FaDollarSign, FaGem, FaUser, FaUsers, FaCamera, FaMountain, FaTheaterMasks, FaGlassCheers, FaUtensilSpoon, FaCarrot, FaBacon } from 'react-icons/fa';
import { MdFamilyRestroom } from "react-icons/md";
import { TbFriends } from "react-icons/tb";
import PulsatingButton from "@/components/magicui/pulsating-button";
import { QRCodeSVG } from 'qrcode.react';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });


function DayPlan({ day }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`day-${day.dayNumber}`}>
        <AccordionTrigger>Day {day.dayNumber}</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {day.places.length > 0 && (
              <div>
                <h4 className="font-semibold flex items-center mb-2"><FaCamera className="w-4 h-4 mr-2" /> Places to Visit</h4>
                <ul className="space-y-2">
                  {day.places.map((place) => (
                    <li key={place.id}>
                      <span className="font-medium">{place.name}</span>
                      <p className="text-sm text-muted-foreground">{place.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {day.restaurants.length > 0 && (
              <div>
                <h4 className="font-semibold flex items-center mb-2"><FaUtensilSpoon className="w-4 h-4 mr-2" /> Restaurants</h4>
                <ul className="space-y-2">
                  {day.restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                      <span className="font-medium">{restaurant.name}</span>
                      <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {day.activities.length > 0 && (
              <div>
                <h4 className="font-semibold flex items-center mb-2"><FaTheaterMasks className="w-4 h-4 mr-2" /> Activities</h4>
                <ul className="space-y-2">
                  {day.activities.map((activity) => (
                    <li key={activity.id}>
                      <span className="font-medium">{activity.name}</span>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function TripDetail({ trip }) {
  const [isCopied, setIsCopied] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const tripUrl = `https://travelify-ai-tool.vercel.app/trip/${trip.slug}`;

  const getTravelingWithIcon = () => {
    switch (trip.with?.toLowerCase()) {
      case 'solo': return <FaUser className="mr-2 h-4 w-4" />;
      case 'family': return <MdFamilyRestroom className="mr-2 h-4 w-4" />;
      case 'friends': return <FaUsers className="mr-2 h-4 w-4" />;
      default: return <TbFriends className="mr-2 h-4 w-4" />;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tripUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };


  const handleMapPointClick = (point) => {
    setSelectedPoint(point);
  };

  const getAllMapPoints = () => {
    return trip.dailyPlans.flatMap(day => [
      ...day.places,
      ...day.restaurants,
      ...day.activities
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{trip.name}</h1>
        <Badge variant="outline" className="text-lg">
          {trip.type === 'BUDGET' ? <FaWallet className="mr-1 h-3 w-3" /> :
           trip.type === 'MODERATE' ? <FaDollarSign className="mr-1 h-3 w-3" /> :
           <FaGem className="mr-1 h-3 w-3" />}
          {trip.type} Trip
        </Badge>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <FaPlaneDeparture className="mr-2 h-4 w-4" />
              <span>{trip.fromPlace}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <FaPlaneArrival className="mr-2 h-4 w-4" />
              <span>{trip.toPlace}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              {getTravelingWithIcon()}
              <span>{trip.with || 'Not specified'}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <FaDollarSign className="mr-2 h-4 w-4" />
              <span>Budget: ${trip.budget}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <PulsatingButton>Share</PulsatingButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share your itinerary with friends</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input
                value={tripUrl}
                readOnly
                className="flex-1"
              />
              <Button onClick={copyToClipboard} size="sm">
                {isCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="flex justify-center mt-4">
              <QRCodeSVG value={tripUrl} size={200} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="itinerary">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="itinerary" className="space-y-4">
          {trip.dailyPlans.map((day) => (
            <DayPlan key={day.dayNumber} day={day} />
          ))}
        </TabsContent>
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Trip Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <Map points={getAllMapPoints()} selectedPoint={selectedPoint} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}