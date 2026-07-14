import { cn } from "@/lib/utils";

type ShaderFlowProps = {
  className?: string;
};

export function ShaderFlow({ className }: ShaderFlowProps) {
  return (
    <section
      aria-hidden="true"
      className={cn("shader-flow section-skin", className)}
    >
      <div className="shader-flow__mesh" />
      <div className="shader-flow__strand shader-flow__strand--one" />
      <div className="shader-flow__strand shader-flow__strand--two" />
      <div className="shader-flow__strand shader-flow__strand--three" />
      <div className="shader-flow__spectrum" />
      <div className="shader-flow__sheen" />
    </section>
  );
}
