"use client";

import * as React from "react";
import { NeatBackground } from "@/components/layout/neat-background";

export function SiteBackground() {
  const backgroundRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const background = backgroundRef.current;

      if (!background) {
        return;
      }

      background.style.setProperty("--mouse-x", `${event.clientX}px`);
      background.style.setProperty("--mouse-y", `${event.clientY}px`);
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div ref={backgroundRef} aria-hidden="true" className="site-background">
      <NeatBackground />
      <div className="site-background__wash" />
      <div className="site-background__mouse" />
      <div className="site-background__noise" />
    </div>
  );
}
