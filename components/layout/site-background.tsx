"use client";

import * as React from "react";

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
      <div className="site-background__aurora" />
      <div className="site-background__texture" />
      <div className="site-background__mouse" />
      <div className="site-background__grid" />
      <div className="site-background__beam site-background__beam--primary" />
      <div className="site-background__beam site-background__beam--accent" />
      <div className="floating-cube floating-cube--primary" />
      <div className="floating-cube floating-cube--secondary" />
      <div className="site-background__noise" />
    </div>
  );
}
