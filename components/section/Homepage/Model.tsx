"use client";

import { useRef, useEffect, ReactNode } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import { RefObject } from "react";

interface ModelProps {
  mainContainer: RefObject<HTMLDivElement | null>;
}

export default function Model({ mainContainer }: ModelProps) {
  const group = useRef<Group>(null!);
  const { scene } = useGLTF("/models/Cookie.glb");

  useGSAP(() => {
    if (!group.current || !mainContainer.current) return;

    const trigger = ScrollTrigger.create({
      trigger: mainContainer.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      markers: true,
      onUpdate: (self) => {
        group.current!.rotation.y = self.progress * Math.PI * 2;
      },
    });

    // Double RAF ensures layout is final
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => trigger.kill();
  });

  return (
    <group ref={group} scale={1}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
