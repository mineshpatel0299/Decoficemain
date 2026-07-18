import Hero from "@/components/Hero";
import ExperienceScroll from "@/components/ExperienceScroll";
import VisionShowcase from "@/components/VisionShowcase";
import DifferenceMarquee from "@/components/DifferenceMarquee";
import Stats from "@/components/Stats";
import DestinationsInMaking from "@/components/DestinationsInMaking";
import ScheduleVisit from "@/components/ScheduleVisit";
import WhatHappensNext from "@/components/WhatHappensNext";
import ConnectCTA from "@/components/ConnectCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ExperienceScroll />
      <VisionShowcase />
      <DifferenceMarquee />
      <Stats />
      <DestinationsInMaking />
      <ScheduleVisit />
      <WhatHappensNext />
      <ConnectCTA />
      <Footer />
    </main>
  );
}    