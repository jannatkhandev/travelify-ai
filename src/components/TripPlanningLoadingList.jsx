"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";


const loadingMessages= [
  {
    message: "Scouting the coolest spots for your squad! 🕵️‍♀️",
    icon: "🗺️",
    color: "#FFB800",
  },
  {
    message: "Taste-testing all the local delicacies (yum!) 😋",
    icon: "🍽️",
    color: "#00C9A7",
  },
  {
    message: "Calculating the perfect selfie angles... 📸",
    icon: "🤳",
    color: "#FF3D71",
  },
  {
    message: "Negotiating with the weather for perfect vibes ☀️",
    icon: "🌦️",
    color: "#1E86FF",
  },
  {
    message: "Crafting the ultimate playlist for your journey 🎵",
    icon: "🎧",
    color: "#9C27B0",
  },
  {
    message: "Ensuring your accommodations are Insta-worthy 🏨",
    icon: "📸",
    color: "#FF9800",
  },
  {
    message: "Locating the best Wi-Fi spots (priorities, right?) 📶",
    icon: "💻",
    color: "#4CAF50",
  },
  {
    message: "Arranging surprise encounters with local legends 🦸‍♀️",
    icon: "🤝",
    color: "#E91E63",
  },
];

const extendedMessages = Array.from({ length: 5 }, () => loadingMessages).flat();

const LoadingItem = ({ message, icon, color }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-sm font-normal dark:text-white/60">
            {message}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function TripPlanningLoadingList({ className }) {
  return (
    <div
      className={cn(
        "relative flex h-[400px] w-full flex-col p-6 overflow-hidden rounded-lg bg-background",
        className,
      )}
    >
      <AnimatedList>
        {extendedMessages.map((item, idx) => (
          <LoadingItem {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}