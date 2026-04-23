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
  /**
   * When sibling content (e.g. async “recipe” service list) changes height, this must
   * change so ScrollTrigger is rebuilt — otherwise scrub progress stays wrong and the
   * cookie appears to stop rotating mid-section.
   */
  layoutRevision?: string | number;
}

export default function Model({
  mainContainer,
  layoutRevision = "",
}: ModelProps) {
  const group = useRef<Group>(null!);
  const { scene } = useGLTF("/models/Cookie.glb");

  useGSAP(
    () => {
      if (!group.current || !mainContainer.current) return;

      const trigger = ScrollTrigger.create({
        trigger: mainContainer.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          group.current!.rotation.y = self.progress * Math.PI * 2;
        },
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });

      return () => trigger.kill();
    },
    { dependencies: [layoutRevision] },
  );

  return (
    <group ref={group} scale={1}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
