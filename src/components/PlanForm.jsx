"use client"
import React, { useState }  from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { differenceInDays } from 'date-fns';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { FaPlaneDeparture, FaPlaneArrival, FaWallet, FaDollarSign, FaGem, FaUser, FaUsers, FaCamera, FaMountain, FaTheaterMasks, FaGlassCheers, FaUtensilSpoon, FaCarrot, FaBacon } from 'react-icons/fa';
import { MdFamilyRestroom } from "react-icons/md";
import { TbFriends } from "react-icons/tb";
import { RainbowButton } from './magicui/rainbow-button';
import { OptionCard } from '@/components/OptionCard';
import { TripPlanningLoadingList } from './TripPlanningLoadingList';
import { toast } from "../hooks/use-toast"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useRouter } from 'next/navigation'
  
const formSchema = z.object({
  from: z.string().min(2, { message: "From location is required" }),
  to: z.string().min(2, { message: "To location is required" }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }).refine(data => {
    if (!data.from || !data.to) return false;
    const days = differenceInDays(data.to, data.from);
    return days >= 1 && days <= 10;
  }, {
    message: "Trip duration must be between 1 and 10 days",
  }),
  budget: z.enum(["Budget", "Moderate", "Luxury"]),
  travelingWith: z.enum(["Solo", "Couple", "Family", "Friends"]),
  activities: z.array(z.string()).min(1, { message: "Select at least one activity" }),
  foodPreferences: z.array(z.string()).min(1, { message: "Select at least one food preference" }),
});

export function PlanForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activities: [],
      foodPreferences: [],
      dateRange: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
        const response = await fetch('/api/generate-trip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
  
  
        if (!response.ok) throw new Error('Failed to generate trip');
  
        const data = await response.json();
        if (data.success) {
          router.push(`/trip/${data.slug}`);
        } else {
          toast({
            title: "Error generating itinerary",
            message: data.error
          })
          console.error(data.error || "An unexpected error occurred.");
        }
      } catch (error) {
        toast({
          title: "Error generating itinerary",
          message: error.message
        })
        console.error(error.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Plan Your Trip</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <div className="relative">
                    <FaPlaneDeparture className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input className="pl-10" placeholder="Enter departure location" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <div className="relative">
                    <FaPlaneArrival className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input className="pl-10" placeholder="Enter destination" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Range</FormLabel>
                <FormControl>
                  <DatePickerWithRange
                    className="w-full"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
     
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  <OptionCard
                    icon={FaWallet}
                    label="Budget"
                    isSelected={field.value === "Budget"}
                    onClick={() => field.onChange("Budget")}
                  />
                  <OptionCard
                    icon={FaDollarSign}
                    label="Moderate"
                    isSelected={field.value === "Moderate"}
                    onClick={() => field.onChange("Moderate")}
                  />
                  <OptionCard
                    icon={FaGem}
                    label="Luxury"
                    isSelected={field.value === "Luxury"}
                    onClick={() => field.onChange("Luxury")}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="travelingWith"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Traveling with</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <OptionCard
                    icon={FaUser}
                    label="Solo"
                    isSelected={field.value === "Solo"}
                    onClick={() => field.onChange("Solo")}
                  />
                  <OptionCard
                    icon={TbFriends}
                    label="Couple"
                    isSelected={field.value === "Couple"}
                    onClick={() => field.onChange("Couple")}
                  />
                  <OptionCard
                    icon={MdFamilyRestroom}
                    label="Family"
                    isSelected={field.value === "Family"}
                    onClick={() => field.onChange("Family")}
                  />
                  <OptionCard
                    icon={FaUsers}
                    label="Friends"
                    isSelected={field.value === "Friends"}
                    onClick={() => field.onChange("Friends")}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="activities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activities interested</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <OptionCard
                    icon={FaCamera}
                    label="Sight seeing"
                    isSelected={field.value.includes("Sight seeing")}
                    onClick={() => {
                      const updatedValue = field.value.includes("Sight seeing")
                        ? field.value.filter(v => v !== "Sight seeing")
                        : [...field.value, "Sight seeing"];
                      field.onChange(updatedValue);
                    }}
                  />
                  <OptionCard
                    icon={FaMountain}
                    label="Adventure"
                    isSelected={field.value.includes("Adventure")}
                    onClick={() => {
                      const updatedValue = field.value.includes("Adventure")
                        ? field.value.filter(v => v !== "Adventure")
                        : [...field.value, "Adventure"];
                      field.onChange(updatedValue);
                    }}
                  />
                  <OptionCard
                    icon={FaTheaterMasks}
                    label="Cultural experiences"
                    isSelected={field.value.includes("Cultural experiences")}
                    onClick={() => {
                      const updatedValue = field.value.includes("Cultural experiences")
                        ? field.value.filter(v => v !== "Cultural experiences")
                        : [...field.value, "Cultural experiences"];
                      field.onChange(updatedValue);
                    }}
                  />
                  <OptionCard
                    icon={FaGlassCheers}
                    label="Nightlife"
                    isSelected={field.value.includes("Nightlife")}
                    onClick={() => {
                      const updatedValue = field.value.includes("Nightlife")
                        ? field.value.filter(v => v !== "Nightlife")
                        : [...field.value, "Nightlife"];
                      field.onChange(updatedValue);
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="foodPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food preferences</FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  <OptionCard
                    icon={FaUtensilSpoon}
                    label="Local cuisine"
                    isSelected={field.value.includes("Local cuisine")}
                    onClick={() => {
                      const updatedValue = field.value.includes("Local cuisine")
                        ? field.value.filter(v => v !== "Local cuisine")
                        : [...field.value, "Local cuisine"];
                      field.onChange(updatedValue);
                    }}
                  />
                  <OptionCard
                    icon={FaCarrot}
                    label="Vegan"
                    isSelected={field.value.includes("Vegan")}
                    onClick={() => {
                      const updatedValue = field.value.includes("Vegan")
                        ? field.value.filter(v => v !== "Vegan")
                        : [...field.value, "Vegan"];
                      field.onChange(updatedValue);
                    }}
                  />
                  <OptionCard
                    icon={FaBacon}
                    label="Keto"
                    isSelected={field.value.includes("Keto")}
                    onClick={() => {
                      const updatedValue = field.value.includes("Keto")
                        ? field.value.filter(v => v !== "Keto")
                        : [...field.value, "Keto"];
                      field.onChange(updatedValue);
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-center">
        <RainbowButton type="submit" >Plan My Trip</RainbowButton>
        </div>
      </form>
    </Form>
    <Dialog 
        open={isLoading} 
        onOpenChange={(open) => {
          if (isLoading) return;
          setIsLoading(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Planning your epic adventure! 🚀</DialogTitle>
            <DialogDescription>
              Hang tight while we curate the perfect trip for you!
            </DialogDescription>
          </DialogHeader>
          <TripPlanningLoadingList />
        </DialogContent>
      </Dialog>
  </>
  );
}