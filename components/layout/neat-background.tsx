"use client";

import * as React from "react";
import type { NeatConfig, NeatGradient as NeatGradientInstance } from "@firecms/neat";

type PortfolioNeatConfig = NeatConfig & {
  bakeEdgeSoftness?: number;
  textureMode?: "bitmap";
};

const neatConfig: PortfolioNeatConfig = {
  colors: [
    { color: "#A24141", enabled: true },
    { color: "#17E7FF", enabled: true },
    { color: "#FFC600", enabled: true },
    { color: "#8B6AE6", enabled: true },
    { color: "#FFFFFF", enabled: true },
    { color: "#FF75B5", enabled: true },
  ],
  speed: 4.5,
  horizontalPressure: 3,
  verticalPressure: 4,
  waveFrequencyX: 2.5,
  waveFrequencyY: 2.5,
  waveAmplitude: 6,
  shadows: 10,
  highlights: 1,
  colorBrightness: 1.08,
  colorSaturation: 0.42,
  wireframe: false,
  antialias: false,
  colorBlending: 3,
  backgroundColor: "#E4E4E4",
  backgroundAlpha: 1,
  grainScale: 4,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 0.5,
  resolution: 0.9,
  yOffset: 200,
  yOffsetWaveMultiplier: 4,
  yOffsetColorMultiplier: 4,
  yOffsetFlowMultiplier: 10,
  flowDistortionA: 1.2,
  flowDistortionB: 1.8,
  flowScale: 1.5,
  flowEase: 0.25,
  flowEnabled: false,
  enableProceduralTexture: false,
  transparentTextureVoid: false,
  textureMode: "bitmap",
  bakeEdgeSoftness: 1,
  textureVoidLikelihood: 0.27,
  textureVoidWidthMin: 60,
  textureVoidWidthMax: 420,
  textureBandDensity: 1.2,
  textureColorBlending: 0.06,
  textureSeed: 333,
  textureEase: 0.5,
  proceduralBackgroundColor: "#0E0707",
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0.25,
  vignetteRadius: 0.35,
  fresnelEnabled: false,
  fresnelPower: 1.3,
  fresnelIntensity: 0,
  fresnelColor: "#ffffff",
  iridescenceEnabled: false,
  iridescenceIntensity: 0.8,
  iridescenceSpeed: 1.5,
  bloomIntensity: 0.1,
  bloomThreshold: 0.1,
  chromaticAberration: 3,
  shapeType: "sphere",
  shapeRotationX: -2.49,
  shapeRotationY: -0.89,
  shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 1,
  shapeAutoRotateSpeedY: 1.2,
  sphereRadius: 21,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 0,
  planeTwist: 0,
  silhouetteFade: 0.55,
  cylinderFade: 0.08,
  ribbonFade: 0.05,
  flatShading: false,
  cameraLock: false,
  cameraX: 22.5,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0.86,
  cameraRotationY: -0.007,
  cameraRotationZ: 0,
  cameraZoom: 2.6,
};

function getMotionAwareConfig(reducedMotion: boolean): PortfolioNeatConfig {
  if (!reducedMotion) {
    return neatConfig;
  }

  return {
    ...neatConfig,
    speed: 0,
    shapeAutoRotateSpeedX: 0,
    shapeAutoRotateSpeedY: 0,
    grainSpeed: 0,
  };
}

export function NeatBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isFallbackVisible, setIsFallbackVisible] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const canvasElement: HTMLCanvasElement = canvas;
    let gradient: NeatGradientInstance | null = null;
    let isCancelled = false;
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const reducedMotion = reducedMotionQuery.matches;

    async function setupGradient() {
      try {
        const { NeatGradient } = await import("@firecms/neat");

        if (isCancelled) {
          return;
        }

        gradient = new NeatGradient({
          ref: canvasElement,
          ...getMotionAwareConfig(reducedMotion),
        });

        gradient.yOffset = window.scrollY;
        setIsFallbackVisible(false);
      } catch {
        if (!isCancelled) {
          setIsFallbackVisible(true);
        }
      }
    }

    function handleScroll() {
      if (!gradient || reducedMotion) {
        return;
      }

      gradient.yOffset = window.scrollY;
    }

    void setupGradient();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", handleScroll);
      gradient?.destroy();
    };
  }, []);

  return (
    <div
      className="neat-background"
      data-fallback-visible={isFallbackVisible}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="neat-background__canvas" />
      <div className="neat-background__fallback" />
    </div>
  );
}
