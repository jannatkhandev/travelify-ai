// src/components/.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, UsersIcon, BanknoteIcon } from "lucide-react";
import Link from "next/link";

export function TripCard({ trip }) {
  return (
    <Link href={`/trip/${trip.slug}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">{trip.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{`${new Date(trip.createdAt).toLocaleDateString()} - ${new Date(trip.createdAt.getTime() + trip.days * 24 * 60 * 60 * 1000).toLocaleDateString()}`}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPinIcon className="mr-2 h-4 w-4" />
              <span>{`${trip.fromPlace} to ${trip.toPlace}`}</span>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="flex items-center">
                <BanknoteIcon className="mr-1 h-3 w-3" />
                {trip.type}
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <UsersIcon className="mr-1 h-3 w-3" />
                {trip.days} days
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}