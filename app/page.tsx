import { FeaturedProjects } from "@/components/sections/featured-projects";
import { CallToAction } from "@/components/sections/call-to-action";
import { EngineeringStatement } from "@/components/sections/engineering-statement";
import { EngineeringLayers } from "@/components/sections/engineering-layers";
import { Hero } from "@/components/sections/hero";
import { SystemStack } from "@/components/sections/system-stack";
import { TechStack } from "@/components/sections/tech-stack";
import { ShaderFlow } from "@/components/shared/shader-flow";
import { getServerLocale } from "@/lib/server-locale";

export default async function Home() {
  const locale = await getServerLocale();

  return (
    <main>
      <Hero />
      <EngineeringStatement locale={locale} />
      <SystemStack locale={locale} />
      <TechStack locale={locale} />
      <ShaderFlow />
      <EngineeringLayers locale={locale} />
      <FeaturedProjects />
      <CallToAction />
    </main>
  );
}
