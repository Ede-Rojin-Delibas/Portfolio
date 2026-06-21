import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
};

export function ProjectCard({ title, description, tech }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <CardHeader>
        <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-primary/30 via-purple-500/20 to-cyan-500/20 transition duration-300 group-hover:scale-[1.02]" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <Badge key={item} variant="secondary">
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
