import { TripCard } from "@/components/TripCard";

export function TripsList({ trips }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}