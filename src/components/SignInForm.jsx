"use client"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { toast } from "../hooks/use-toast"
import { signIn } from "next-auth/react";


const SignInForm = () => {
  const form = useForm()
  function onSubmit(data) {
    try {
      signIn("email", { email: data.email, redirect: false, callbackUrl: "/plan" })
    toast({
      title: "Email sent successfully!"
    })
    }
    catch (error) {
      console.error("Error sending email", error)
      toast({
        title: "Error sending email",
        message: "Please try again later"
      })
    }
    
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit">Send login link</Button>
      </form>
    </Form>
    </>
  );
};

export default SignInForm;