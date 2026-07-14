"use client";

import * as React from "react";

type WheelScrollProps = React.ComponentPropsWithoutRef<"div">;

export function WheelScroll({
  children,
  onWheel,
  ...props
}: WheelScrollProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    onWheel?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const maxScrollLeft = element.scrollWidth - element.clientWidth;

    if (maxScrollLeft <= 0) {
      return;
    }

    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    const nextScrollLeft = Math.min(
      maxScrollLeft,
      Math.max(0, element.scrollLeft + delta * 1.12),
    );

    if (nextScrollLeft === element.scrollLeft) {
      return;
    }

    event.preventDefault();
    element.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  }

  return (
    <div {...props} onWheel={handleWheel} ref={scrollRef}>
      {children}
    </div>
  );
}
