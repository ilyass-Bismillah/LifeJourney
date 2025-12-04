import React from "react";
import Link from "next/link";
import  Image  from 'next/image';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center py-32 text-center space-y-5 min-h-full px-5">
      <h2 className="text-sm font-medium">Welcom to LifeJourney</h2>
      <h1 className="text-3xl md:text-5xl font-bold max-w-2xl">
        Discover and Share Inspiring Life Journey
      </h1>
      <p className="max-w-lg text-muted-foreground">
        LifeJourney is a unique platform where individuals from all walks of
        life can share their journey stories, challenges, and successes. Whether
        you&apos;re just starting out.
      </p>
      <Link href="/stories">
        <Button>Discover people stories</Button>
      </Link>
      <Image src="/walksunset.webp" alt="work" width={500} height={500} 
      />
    </section>
  );
};

export default Hero;
