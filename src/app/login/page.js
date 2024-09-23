import SignInForm from "../../components/SignInForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import Container from "../../components/ui/container";
import { authOptions } from "../..//lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/plan");
  }
  return (
    <Container>
      <div className="flex justify-center">
      <Card  className="w-[450px] space-y-8">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Please enter your email to receive login link.
          </CardDescription>
        </CardHeader>
        <CardContent  className="grid gap-4">
          <SignInForm />
        </CardContent>
      </Card>
      </div>
    </Container>
  );
};

export default page;
