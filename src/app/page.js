import { Cover } from "@/components/ui/cover"
import Globe from "@/components/magicui/globe";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import Ripple from "@/components/magicui/ripple";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 max-w-7xl w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Plan your trips <br /> with <Cover>Travelify AI</Cover>
        </h1>
        <Link href="/plan">
        <RainbowButton>Try Now</RainbowButton></Link>
        <div className="relative w-full max-w-[32rem] aspect-square">
          <Ripple/>
          <Globe className="w-full h-full" />
        </div>
      </main>
    </div>
  );
}