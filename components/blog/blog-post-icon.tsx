import {
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Database,
  Network,
  ServerCog,
  Waypoints,
} from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { IconTile } from "@/components/shared/icon-tile";

const categoryIcons = {
  "AI Systems": BrainCircuit,
  Data: Database,
  "Machine Learning": ChartNoAxesCombined,
  "Backend Systems": ServerCog,
  Architecture: Blocks,
  "Career Management": BriefcaseBusiness,
  "IT & Systems": Network,
  "Product Thinking": Waypoints,
};

type BlogPostIconProps = {
  post: Pick<BlogPost, "category" | "tone">;
  className?: string;
};

export function BlogPostIcon({ post, className }: BlogPostIconProps) {
  const Icon = categoryIcons[post.category as keyof typeof categoryIcons] ?? BrainCircuit;

  return (
    <IconTile
      className={className}
      icon={Icon}
      iconClassName="size-5"
      size="lg"
      tone={post.tone}
    />
  );
}
