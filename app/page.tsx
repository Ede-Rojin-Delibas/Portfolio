import { FeaturedProjects } from "@/components/sections/featured-projects";
import { CallToAction } from "@/components/sections/call-to-action";
import { EngineeringStatement } from "@/components/sections/engineering-statement";
import { EngineeringLayers } from "@/components/sections/engineering-layers";
import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { ShaderFlow } from "@/components/shared/shader-flow";

export default function Home() {
  return (
    <main>
      <Hero />
      <EngineeringStatement />
      <TechStack />
      <ShaderFlow />
      <EngineeringLayers />
      <FeaturedProjects />
      <CallToAction />
    </main>
  );
}
