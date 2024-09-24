'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { toast } from '../hooks/use-toast';
import { signIn } from 'next-auth/react';
import { Mail, Github } from 'lucide-react';

const SignInForm = () => {
  const form = useForm();

  function onSubmit(data) {
    try {
      signIn('email', { email: data.email, redirect: false, callbackUrl: '/plan' });
      toast({
        title: 'Email sent successfully!',
      });
    } catch (error) {
      console.error('Error sending email', error);
      toast({
        title: 'Error sending email',
        message: 'Please try again later',
      });
    }
  }

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/plan' });
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="email@domain.com"
                      {...field}
                      className="pl-10"
                    />
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                      size={18}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            <Mail className="mr-2" size={18} />
            Send login link
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button onClick={handleGitHubSignIn} variant="outline" className="w-full">
        <Github className="mr-2" size={18} />
        Login with GitHub
      </Button>
    </div>
  );
};

export default SignInForm;
