
import { PlanForm } from '@/components/PlanForm';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PlanPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  
  return (
    <div className="container mx-auto py-10">
      <PlanForm />
    </div>
  );
}