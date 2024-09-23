import React from 'react';
import Container from "@/components/ui/container";
import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TripDetail } from '@/components/TripDetail';

const TripNotFound = () => (
  <Card>
    <CardHeader>
      <CardTitle>Trip Not Found</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Sorry, we couldn't find the trip you're looking for.</p>
    </CardContent>
  </Card>
);

const Trip = async ({ params }) => {
  const slug = params.slug;
  const trip = await db.trip.findUnique({
    where: {
      slug: slug,
    },
    include: {
      dailyPlans: {
        include: {
          places: true,
          restaurants: true,
          activities: true,
        },
        orderBy: {
          dayNumber: 'asc',
        },
      },
    },
  });

  return (
    <Container>
      {trip ? (
        <TripDetail trip={trip} />
      ) : (
        <TripNotFound />
      )}
    </Container>
  );
};

export default Trip;