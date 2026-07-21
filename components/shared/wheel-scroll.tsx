"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type WheelScrollProps = React.ComponentPropsWithoutRef<"div">;

function getWheelDistance(event: WheelEvent, element: HTMLDivElement) {
  const dominantDelta =
    Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;
  const modeMultiplier =
    event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? element.clientWidth : 1;
  const normalizedDelta = dominantDelta * modeMultiplier;
  const direction = Math.sign(normalizedDelta) || 1;
  const absoluteDelta = Math.abs(normalizedDelta);

  if (absoluteDelta >= 42 && Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
    return (
      direction * Math.min(Math.max(element.clientWidth * 0.58, 360), 560)
    );
  }

  return normalizedDelta * 2.4;
}

export function WheelScroll({
  children,
  onWheel,
  ...props
}: WheelScrollProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef<{
    isDragging: boolean;
    pointerId: number | null;
    startX: number;
    scrollLeft: number;
  }>({
    isDragging: false,
    pointerId: null,
    startX: 0,
    scrollLeft: 0,
  });

  const moveHorizontally = React.useCallback(
    (element: HTMLDivElement, delta: number) => {
      const maxScrollLeft = element.scrollWidth - element.clientWidth;

      if (maxScrollLeft <= 0) {
        return false;
      }

      const direction = Math.sign(delta);
      const currentScrollLeft = Math.round(element.scrollLeft);
      const roundedMaxScrollLeft = Math.round(maxScrollLeft);
      const canMove =
        (direction > 0 && currentScrollLeft < roundedMaxScrollLeft - 2) ||
        (direction < 0 && currentScrollLeft > 2);

      if (!canMove) {
        return false;
      }

      const nextScrollLeft = Math.min(
        maxScrollLeft,
        Math.max(0, element.scrollLeft + delta),
      );

      if (nextScrollLeft === element.scrollLeft) {
        return false;
      }

      element.scrollLeft = nextScrollLeft;

      return true;
    },
    [],
  );

  React.useEffect(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const scrollElement = element;

    function handleNativeWheel(event: WheelEvent) {
      const delta = getWheelDistance(event, scrollElement);

      const moved = moveHorizontally(scrollElement, delta);

      if (moved) {
        event.preventDefault();
      }
    }

    scrollElement.addEventListener("wheel", handleNativeWheel, {
      passive: false,
    });

    return () => {
      scrollElement.removeEventListener("wheel", handleNativeWheel);
    };
  }, [moveHorizontally]);

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    onWheel?.(event);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByDirection(event.key === "ArrowRight" ? "right" : "left");
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const element = scrollRef.current;

    if (!element || element.scrollWidth <= element.clientWidth) {
      return;
    }

    dragState.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: element.scrollLeft,
    };

    element.setPointerCapture(event.pointerId);
    element.dataset.dragging = "true";
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const element = scrollRef.current;
    const state = dragState.current;

    if (!element || !state.isDragging) {
      return;
    }

    const dragDistance = event.clientX - state.startX;
    element.scrollLeft = state.scrollLeft - dragDistance;
  }

  function stopDragging() {
    const element = scrollRef.current;

    dragState.current.isDragging = false;
    dragState.current.pointerId = null;

    if (element) {
      delete element.dataset.dragging;
    }
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const element = scrollRef.current;

    if (element && dragState.current.pointerId === event.pointerId) {
      element.releasePointerCapture(event.pointerId);
    }

    stopDragging();
  }

  function scrollByDirection(direction: "left" | "right") {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    element.scrollBy({
      left:
        direction === "left"
          ? -element.clientWidth * 0.82
          : element.clientWidth * 0.82,
      behavior: "smooth",
    });
  }

  return (
    <div className="wheel-scroll-frame">
      <button
        type="button"
        aria-label="Scroll projects left"
        className="wheel-scroll-control wheel-scroll-control--left"
        onClick={() => scrollByDirection("left")}
      >
        <ChevronLeft className="size-4" />
      </button>
      <div
        {...props}
        onKeyDown={handleKeyDown}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerLeave={stopDragging}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        ref={scrollRef}
        tabIndex={0}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Scroll projects right"
        className="wheel-scroll-control wheel-scroll-control--right"
        onClick={() => scrollByDirection("right")}
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
