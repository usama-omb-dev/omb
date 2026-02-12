"use client";

import Image from "next/image";
import { ArrowRight } from "./icons";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

interface CardDetails {
  title: string;
  imgUrl: string;
  href: string;
}

const ServiceCard = ({ cardDetails }: { cardDetails: CardDetails }) => {
  const { title, imgUrl, href } = cardDetails;
  const containers = useRef<null | HTMLDivElement>(null);
  const image = useRef<null | HTMLImageElement>(null);

  const mouseLeaveHandler = () => {
    gsap.to(image.current, {
      opacity: 0,
      scale: 0.5,
      rotationY: 0,
      rotationX: 0,
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const mouseEnterHandler = () => {
    gsap.to(image.current, {
      opacity: 1,
      scale: 1.05,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  };

  const mouseMoveHandler = (event: React.MouseEvent) => {
    if (containers.current == null) return;
    const rect = containers.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    const rotateY = (deltaX / centerX) * 20;
    const rotateX = -(deltaY / centerY) * 20;

    const moveX = (deltaX / centerX) * 50;
    const moveY = (deltaY / centerY) * 50;

    gsap.to(image.current, {
      rotationZ: rotateY,
      rotationX: rotateX,
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  useLayoutEffect(() => {
    if (containers == null || image == null) return;
    mouseLeaveHandler();
  }, [image]);

  return (
    <div
      ref={containers}
      onMouseEnter={() => mouseEnterHandler()}
      onMouseLeave={() => mouseLeaveHandler()}
      onMouseMove={(e) => mouseMoveHandler(e)}
      className="bg-white h-full p-7.5 rounded-[0.625rem] flex flex-col justify-between relative isolate perspective-[1000]"
    >
      <h6 className="text-md font-medium max-w-52.5 leading-none">{title}</h6>
      <Image
        ref={image}
        alt="Hero Image"
        width={140}
        height={160}
        src={imgUrl}
        className="drop-shadow-xl absolute top-0 right-1/5 -z-40 pointer-events-none"
      />
      <Link
        href={href}
        className="rounded-[0.3125rem] max-w-10 w-10 h-10 bg-primary self-end [&>svg]:-rotate-45 flex justify-center items-center"
      >
        <ArrowRight color="white" />
      </Link>
    </div>
  );
};

export default ServiceCard;
