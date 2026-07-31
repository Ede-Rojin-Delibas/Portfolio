"use client";

import * as React from "react";
import {
  Canvas,
  extend,
  useFrame,
  type ThreeElement,
  type ThreeEvent,
} from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { cn } from "@/lib/utils";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

const CARD_GLB = "/assets/lanyard/card.glb";
const LANYARD_PNG = "/assets/lanyard/lanyard.png";
const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

type CardGLTF = {
  nodes: {
    card: THREE.Mesh;
    clamp: THREE.Mesh;
    clip: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial & { map: THREE.Texture };
    metal: THREE.MeshStandardMaterial;
  };
};

type LanyardProps = {
  backImage?: string | null;
  className?: string;
  fov?: number;
  frontImage?: string | null;
  gravity?: [number, number, number];
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
  position?: [number, number, number];
  transparent?: boolean;
};

type BandProps = {
  backImage?: string | null;
  frontImage?: string | null;
  imageFit?: "cover" | "contain";
  isMobile?: boolean;
  lanyardImage?: string | null;
  lanyardWidth?: number;
  maxSpeed?: number;
  minSpeed?: number;
};

type LanyardRigidBody = RapierRigidBody & {
  lerped?: THREE.Vector3;
};

export function Lanyard({
  backImage = null,
  className,
  fov = 20,
  frontImage = null,
  gravity = [0, -40, 0],
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  position = [0, 0, 30],
  transparent = true,
}: LanyardProps) {
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mountedTimer = window.setTimeout(() => setMounted(true), 0);

    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(mountedTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={cn("lanyard-wrapper", className)}>
      {mounted ? (
        <Canvas
          camera={{ position, fov }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{ alpha: transparent, antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          }}
        >
          <ambientLight intensity={Math.PI} />
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              backImage={backImage}
              frontImage={frontImage}
              imageFit={imageFit}
              isMobile={isMobile}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      ) : (
        <div className="lanyard-loading" />
      )}
    </div>
  );
}

function Band({
  backImage = null,
  frontImage = null,
  imageFit = "cover",
  isMobile = false,
  lanyardImage = null,
  lanyardWidth = 1,
  maxSpeed = 50,
  minSpeed = 0,
}: BandProps) {
  const band = React.useRef<
    THREE.Mesh<InstanceType<typeof MeshLineGeometry>, InstanceType<typeof MeshLineMaterial>>
  >(null!);
  const fixed = React.useRef<RapierRigidBody>(null!);
  const j1 = React.useRef<LanyardRigidBody>(null!);
  const j2 = React.useRef<LanyardRigidBody>(null!);
  const j3 = React.useRef<RapierRigidBody>(null!);
  const card = React.useRef<RapierRigidBody>(null!);
  const [dragged, drag] = React.useState<false | THREE.Vector3>(false);
  const [hovered, hover] = React.useState(false);
  const [curve] = React.useState(
    () => {
      const nextCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);

      nextCurve.curveType = "chordal";

      return nextCurve;
    },
  );
  const bandResolution = React.useMemo(
    () => new THREE.Vector2(1000, isMobile ? 2000 : 1000),
    [isMobile],
  );
  const bandRepeat = React.useMemo(() => new THREE.Vector2(-4, 1), []);
  const vec = React.useMemo(() => new THREE.Vector3(), []);
  const ang = React.useMemo(() => new THREE.Vector3(), []);
  const rot = React.useMemo(() => new THREE.Vector3(), []);
  const dir = React.useMemo(() => new THREE.Vector3(), []);
  const dragBounds = React.useMemo(
    () => ({
      maxX: isMobile ? 3.2 : 5.8,
      maxY: isMobile ? 4.2 : 5.2,
      minY: isMobile ? -3.2 : -4.4,
    }),
    [isMobile],
  );
  const segmentProps = React.useMemo<RigidBodyProps>(
    () => ({
      angularDamping: 4,
      canSleep: true,
      colliders: false,
      linearDamping: 4,
      type: "dynamic",
    }),
    [],
  );

  const { nodes, materials } = useGLTF(CARD_GLB) as unknown as CardGLTF;
  const texture = useTexture(lanyardImage || LANYARD_PNG);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  const bandTexture = React.useMemo(() => {
    const nextTexture = texture.clone();

    nextTexture.wrapS = THREE.RepeatWrapping;
    nextTexture.wrapT = THREE.RepeatWrapping;
    nextTexture.needsUpdate = true;

    return nextTexture;
  }, [texture]);

  const cardMap = React.useMemo(() => {
    const baseMap = materials.base.map;

    if (!frontImage && !backImage) {
      return baseMap;
    }

    const baseImage = baseMap.image as CanvasImageSource & {
      height: number;
      width: number;
    };
    const width = baseImage.width;
    const height = baseImage.height;
    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      return baseMap;
    }

    const drawingContext = context;

    drawingContext.drawImage(baseImage, 0, 0, width, height);

    function drawFitted(
      image: CanvasImageSource & { height: number; width: number },
      rect: typeof FRONT_UV_RECT,
    ) {
      const rx = rect.x * width;
      const ry = rect.y * height;
      const rw = rect.w * width;
      const rh = rect.h * height;
      const pickScale = imageFit === "contain" ? Math.min : Math.max;
      const scale = pickScale(rw / image.width, rh / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const dx = rx + (rw - drawWidth) / 2;
      const dy = ry + (rh - drawHeight) / 2;

      drawingContext.save();
      drawingContext.beginPath();
      drawingContext.rect(rx, ry, rw, rh);
      drawingContext.clip();
      drawingContext.drawImage(image, dx, dy, drawWidth, drawHeight);
      drawingContext.restore();
    }

    if (frontImage && frontTex.image) {
      drawFitted(
        frontTex.image as CanvasImageSource & { height: number; width: number },
        FRONT_UV_RECT,
      );
    }

    if (backImage && backTex.image) {
      drawFitted(
        backTex.image as CanvasImageSource & { height: number; width: number },
        BACK_UV_RECT,
      );
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;

    return composite;
  }, [backImage, backTex, frontImage, frontTex, imageFit, materials.base.map]);

  useRopeJoint(fixed, j1, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);
  useRopeJoint(j1, j2, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);
  useRopeJoint(j2, j3, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  React.useEffect(() => {
    if (!hovered) {
      return;
    }

    document.body.style.cursor = dragged ? "grabbing" : "grab";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [dragged, hovered]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: THREE.MathUtils.clamp(
          vec.x - dragged.x,
          -dragBounds.maxX,
          dragBounds.maxX,
        ),
        y: THREE.MathUtils.clamp(
          vec.y - dragged.y,
          dragBounds.minY,
          dragBounds.maxY,
        ),
        z: THREE.MathUtils.clamp(vec.z - dragged.z, -1.25, 1.25),
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        const lerped = getLerped(ref.current);
        const distance = lerped.distanceTo(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, distance));

        lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(getLerped(j2.current));
      curve.points[2].copy(getLerped(j1.current));
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event: ThreeEvent<PointerEvent>) => {
              (event.target as Element).releasePointerCapture(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event: ThreeEvent<PointerEvent>) => {
              (event.target as Element).setPointerCapture(event.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[
            {
              color: "white",
              lineWidth: lanyardWidth,
              map: bandTexture,
              repeat: bandRepeat,
              resolution: bandResolution,
              useMap: 1,
            },
          ]}
          color="white"
          depthTest={false}
          lineWidth={lanyardWidth}
          map={bandTexture}
          repeat={bandRepeat}
          resolution={bandResolution}
          useMap={1}
        />
      </mesh>
    </>
  );
}

function getLerped(body: LanyardRigidBody): THREE.Vector3 {
  if (!body.lerped) {
    body.lerped = new THREE.Vector3().copy(body.translation());
  }

  return body.lerped;
}

useGLTF.preload(CARD_GLB);
