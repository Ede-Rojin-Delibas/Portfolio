import { FeaturedProjects } from "@/components/sections/featured-projects";
import { CallToAction } from "@/components/sections/call-to-action";
import { EngineeringLayers } from "@/components/sections/engineering-layers";
import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <EngineeringLayers />
      <FeaturedProjects />
      <CallToAction />
    </main>
  );
}
