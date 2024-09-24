import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

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

export default TripNotFound;