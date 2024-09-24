import React from 'react';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Container from "@/components/ui/container";
import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TripsList } from "@/components/TripsList";

export default async function Trips() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  
  const trips = await db.trip.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Your trips</CardTitle>
          <CardDescription>Itineraries you planned.</CardDescription>
        </CardHeader>
        <CardContent>
          {trips.length > 0 ? (<TripsList trips={trips} />
          ) : (
            <p>You haven't planned any trips yet on Travelify.</p>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}