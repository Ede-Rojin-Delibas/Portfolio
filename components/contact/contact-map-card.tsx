import { Clock3, MapPin, Radio, Wifi } from "lucide-react";
import { IconTile } from "@/components/shared/icon-tile";

const signals = [
  {
    label: "Location",
    value: "Turkiye / Remote",
    icon: MapPin,
    tone: "blue" as const,
  },
  {
    label: "Response",
    value: "Async friendly",
    icon: Clock3,
    tone: "cyan" as const,
  },
  {
    label: "Focus",
    value: "Software, AI, Data",
    icon: Radio,
    tone: "emerald" as const,
  },
];

export function ContactMapCard() {
  return (
    <aside className="glass-panel overflow-hidden rounded-lg">
      <div className="relative h-56 border-b border-border/70 bg-background/55">
        <div className="contact-map-grid absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" />

        <div className="absolute left-[14%] top-[24%] h-px w-[58%] rotate-12 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="absolute right-[16%] top-[40%] h-px w-[42%] -rotate-12 bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <div className="absolute bottom-[24%] left-[24%] h-px w-[46%] rotate-[-4deg] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <IconTile
          className="absolute left-[18%] top-[30%]"
          icon={MapPin}
          iconClassName="size-5"
          size="lg"
          tone="blue"
        />
        <IconTile
          className="absolute right-[20%] top-[22%]"
          icon={Wifi}
          iconClassName="size-4"
          size="md"
          tone="cyan"
        />
        <IconTile
          className="absolute bottom-[20%] left-[48%]"
          icon={Radio}
          iconClassName="size-4"
          size="sm"
          tone="emerald"
        />

        <div className="absolute bottom-4 left-4 right-4 rounded-md border border-border/70 bg-background/80 p-3 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Collaboration map
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            A remote-friendly contact point for practical engineering work.
          </p>
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-3 lg:grid-cols-1">
        {signals.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-start gap-3">
              <IconTile
                icon={Icon}
                iconClassName="size-4"
                size="sm"
                tone={item.tone}
              />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
