import React from 'react';
import Container from "@/components/ui/container";
import { db } from "@/lib/db";
import { TripDetail } from '@/components/TripDetail';
import TripNotFound from '@/components/TripNotFound';

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