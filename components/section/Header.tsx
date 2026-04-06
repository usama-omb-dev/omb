"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown, ChevronUp, Menu as MenuIcon, X } from "lucide-react";
import { ArrowRight, HamburgerIcon } from "@/components/ui/icons";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { useServices } from "@/hooks/useServices";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AnimatedButton from "../ui/button/AnimatedButton";
import AnimatedArrowIcon from "../ui/button/AnimatedArrowIcon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ServiceData } from "@/app/ServicesData";

interface ServiceNavMenu {
  navLabel: string;
  navLink: string;
  imageUrl: string;
}

function resolveServiceMenuImage(item: {
  slug: string;
  _embedded?: { "wp:featuredmedia"?: Array<{ source_url?: string }> };
}): string {
  const fromWp = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (fromWp) return fromWp;
  const slug = item.slug;
  const entry = ServiceData.find(
    (s) => s.url === slug || s.url === slug.replace(/-/g, "_"),
  );
  if (entry?.heroData?.heroImage) return entry.heroData.heroImage;
  return "/service-hero_img.png";
}

function isHoverCapablePointer(e: React.PointerEvent) {
  return e.pointerType === "mouse" || e.pointerType === "pen";
}

function normalizePathname(path: string) {
  if (!path) return "/";
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/** Top-level route: exact match, or nested under that segment (not home). */
function isHrefActive(pathName: string, href: string): boolean {
  const p = normalizePathname(pathName);
  const h = normalizePathname(href);
  if (h === "/") return p === "/";
  return p === h || p.startsWith(`${h}/`);
}

function isServicesNavActive(pathName: string): boolean {
  const p = normalizePathname(pathName);
  return p === "/services" || p.startsWith("/services/");
}

function isServiceSubLinkActive(pathName: string, serviceSlug: string): boolean {
  const p = normalizePathname(pathName);
  const target = normalizePathname(`/services/${serviceSlug}`);
  return p === target || p.startsWith(`${target}/`);
}

const Header = () => {
  const [isWhiteNav, setIsWhiteNav] = useState(true);
  // const [isOpen, setIsOpen] = useState(false);
  // const menuRef = useRef<HTMLDivElement>(null);
  // const wrapperRef = useRef<HTMLDivElement>(null);
  // const tl = useRef<GSAPTimeline | null>(null);
  const pathName = usePathname();

  const { data: services, isLoading } = useServices();

  const servicesNavigationData: ServiceNavMenu[] = isLoading
    ? []
    : services.map((item: any) => ({
        navLabel: item.title.rendered,
        navLink: item.slug,
        imageUrl: resolveServiceMenuImage(item),
      }));

  const [activeServiceMenuIndex, setActiveServiceMenuIndex] = useState(0);
  const [servicesMegaPointerInside, setServicesMegaPointerInside] =
    useState(false);
  const [servicesMegaTouchExpanded, setServicesMegaTouchExpanded] =
    useState(false);
  const [supportsRealHover, setSupportsRealHover] = useState(true);
  const servicesMegaRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setSupportsRealHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const servicesMegaOpen =
    servicesMegaPointerInside || servicesMegaTouchExpanded;

  useEffect(() => {
    setActiveServiceMenuIndex(0);
  }, [servicesNavigationData.length]);

  useEffect(() => {
    setServicesMegaTouchExpanded(false);
  }, [pathName]);

  useEffect(() => {
    if (!servicesMegaTouchExpanded) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!servicesMegaRef.current?.contains(e.target as Node)) {
        setServicesMegaTouchExpanded(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [servicesMegaTouchExpanded]);

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    {
      title: "Services",
      href: "",
      submenu: servicesNavigationData,
    },
    { title: "Blogs", href: "/blogs" },
    { title: "Career", href: "/careers" },
  ];

  // const featuredItems = [
  //   { title: "Stobe", href: "/" },
  //   { title: "Jebra", href: "/" },
  //   {
  //     title: "RayWorks",
  //     href: "/",
  //   },
  //   { title: "Locquet Power", href: "/" },
  // ];

  useEffect(() => {
    if (
      pathName.split("/")[1].length === 0 ||
      pathName.split("/")[1] === "contact" ||
      pathName.split("/")[pathName.split("/").length - 1] === "blogs"
    ) {
      setIsWhiteNav(true);
    } else {
      setIsWhiteNav(false);
    }
  }, [pathName]);

  // useEffect(() => {
  //   if (!menuRef.current) return;
  //   const fullHeight = menuRef.current.scrollHeight;
  //   tl.current = gsap.timeline({ paused: true });
  //   tl.current.to(menuRef.current, {
  //     height: fullHeight,
  //     duration: 0.5,
  //     ease: "power3.out",
  //     overflow: "hidden",
  //   });
  //   gsap.set(menuRef.current, {
  //     height: 0,
  //     overflow: "hidden",
  //     paddingTop: 0,
  //     paddingBottom: 0,
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!tl.current) return;

  //   if (isOpen) tl.current.play();
  //   else tl.current.reverse();
  // }, [isOpen]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (!wrapperRef.current) return;

  //     if (!wrapperRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <header className="absolute sm:top-10 top-6 left-0 z-50 w-full px-5">
      {/* <div className="container">
        <div className="flex justify-between items-center relative">
          <Link href="/">
            <Image
              className={`${isWhiteNav ? "brightness-0 invert-100" : ""} sm:max-w-full max-w-4/5`}
              src="/logo.svg"
              alt="Logo"
              width={111}
              height={45}
            />
          </Link>

          <div
            ref={wrapperRef}
            className="md:relative z-50 flex items-center gap-2.5"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`cursor-pointer flex items-center justify-between leading-none sm:py-3.75 py-2 sm:px-5 px-4 rounded-[0.625rem] backdrop-blur-3xl ${isWhiteNav ? "bg-white/10 text-white" : "bg-black/10 text-black"} text-body relative lg:min-w-126.5 md:min-w-96`}
            >
              <span className="md:inline-block hidden">
                {isOpen ? "Close" : "Menu"}
              </span>
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
            <Dialog>
              <DialogTrigger
                className={`cursor-pointer flex items-center justify-between sm:py-4.5 py-2.75 px-5 rounded-[0.625rem] backdrop-blur-3xl ${isWhiteNav ? "bg-white/10 text-white" : "bg-black/10 text-black"} text-body relative`}
              >
                <Image
                  src={"/play-btn.svg"}
                  alt="Play Button"
                  width={18}
                  height={18}
                  className={`${isWhiteNav ? "" : "brightness-0"}`}
                />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription>Some Video</DialogDescription>
              </DialogContent>
            </Dialog>
            <div
              ref={menuRef}
              style={{
                height: 0,
                overflow: "hidden",
                paddingTop: 0,
                paddingBottom: 0,
              }}
              className={`absolute top-[calc(100%+10px)] left-0 right-0 ${isWhiteNav ? "bg-white/10" : "bg-black/10"} rounded-[0.625rem] px-5 backdrop-blur-3xl flex flex-col`}
            >
              <div className="flex flex-col gap-7.5 py-5.5">
                <div className=" flex flex-col gap-5">
                  <h6
                    className={`text-body border-b ${isWhiteNav ? "text-white/20 border-white/10" : "text-black/50 border-black/10"} leading-none pb-5  `}
                  >
                    Company
                  </h6>
                  <ul className="flex flex-col gap-2.5">
                    {menuItems.map((item, i) => (
                      <li key={i}>
                        {item.submenu ? (
                          <NavigationMenu className="bg-transparent!">
                            <NavigationMenuList className="bg-transparent!">
                              <NavigationMenuItem className="bg-transparent!">
                                <NavigationMenuTrigger
                                  className={`cursor-pointer text-lg ${isWhiteNav ? "text-white hover:text-white/50" : "text-black hover:text-black/50"} font-normal! leading-none p-0! rounded-none! bg-transparent! hover:bg-transparent!`}
                                >
                                  {item.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-transparent!">
                                  {isLoading ? (
                                    <span className=" [&_svg]:animate-spin text-black bg-white flex justify-center items-center h-20  w-16 rounded-[8px]">
                                      <AiOutlineLoading3Quarters />
                                    </span>
                                  ) : (
                                    item?.submenu?.map(
                                      (sub: any, j: number) => (
                                        <NavigationMenuLink
                                          className="bg-transparent!"
                                          asChild
                                          key={sub + String(j)}
                                        >
                                          <Link
                                            onClick={() => setIsOpen(false)}
                                            className="bg-transparent! text-nowrap"
                                            href={`/services/${sub.navLink}`}
                                          >
                                            {sub.navLabel}
                                          </Link>
                                        </NavigationMenuLink>
                                      ),
                                    )
                                  )}
                                </NavigationMenuContent>
                              </NavigationMenuItem>
                            </NavigationMenuList>
                          </NavigationMenu>
                        ) : (
                          <Link
                            href={item.href}
                            className={`text-lg font-normal ${isWhiteNav ? "text-white hover:text-white/50" : "text-black hover:text-black/50"}  leading-none `}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className=" flex flex-col gap-5">
                  <h6
                    className={`text-body border-b ${isWhiteNav ? "text-white/20 border-white/10" : "text-black/50 border-black/10"} leading-none pb-5  `}
                  >
                    Featured Projects
                  </h6>
                  <ul className="flex flex-col gap-2.5">
                    {featuredItems.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className={`text-lg font-normal ${isWhiteNav ? "text-white hover:text-white/50" : "text-black hover:text-black/50"}  leading-none `}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link
            className={`${isWhiteNav ? "text-white hover:text-white/50" : "text-black hover:text-black/50"} underline underline-offset-4 transition-all text-body md:flex hidden`}
            href="#"
          >
            Get in touch
          </Link>
        </div>
      </div> */}
      <div className="container border border-white/22 rounded-[5px] p-1">
        <div className="flex justify-between items-center bg-white rounded-[5px] p-2 pl-4">
          <Link href="/">
            <Image
              className={`${isWhiteNav ? "" : ""} sm:max-w-full max-w-4/5`}
              src="/omb-new-logo.svg"
              alt="Logo"
              width={71.26}
              height={29}
            />
          </Link>
          <div className="flex items-center">
            <ul className="items-center gap-12 lg:!flex !hidden">
              {menuItems.map((item, i) => {
                const servicesActive =
                  item.submenu !== undefined &&
                  isServicesNavActive(pathName);
                const topLinkActive =
                  item.submenu === undefined &&
                  item.href !== "" &&
                  isHrefActive(pathName, item.href);

                return (
                <li
                  key={i + 1}
                  ref={item.submenu !== undefined ? servicesMegaRef : undefined}
                  className={item.submenu !== undefined ? "relative" : ""}
                  onPointerEnter={
                    item.submenu !== undefined
                      ? (e) => {
                          if (!supportsRealHover || !isHoverCapablePointer(e))
                            return;
                          setServicesMegaPointerInside(true);
                        }
                      : undefined
                  }
                  onPointerLeave={
                    item.submenu !== undefined
                      ? (e) => {
                          if (!supportsRealHover || !isHoverCapablePointer(e))
                            return;
                          setServicesMegaPointerInside(false);
                        }
                      : undefined
                  }
                >
                  {item.submenu !== undefined ? (
                    <>
                      <button
                        type="button"
                        className={cn(
                          "transition-all text-base cursor-pointer flex justify-center items-center gap-1 py-1 bg-transparent border-0 p-0 font-inherit text-left",
                          servicesActive
                            ? "text-primary"
                            : "text-black hover:text-black/50",
                        )}
                        aria-expanded={servicesMegaOpen}
                        aria-haspopup="true"
                        onClick={() => {
                          if (servicesMegaPointerInside) return;
                          setServicesMegaTouchExpanded((v) => !v);
                        }}
                      >
                        {item.title}
                        {/* {servicesMegaOpen ? <ChevronUp /> : <ChevronDown />} */}
                        <span className={`${servicesMegaOpen ? "rotate-180" : ""} transition-all duration-300  bg-secondary rounded-full text-primray  size-4.5 flex justify-center items-center`}>
                        <ChevronDown color="#3838F9" />
                        </span>
                      </button>
                      <div
                        className={cn(
                          "absolute left-1/2 -translate-x-1/2 top-full pt-3 z-60 w-[min(90vw,867px)] transition-opacity duration-200",
                          servicesMegaOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none",
                        )}
                        role="presentation"
                      >
                        <div className="rounded-[10px] bg-white p-7 shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-black/5 flex gap-6.75">
                          <div className=" max-w-[245px] w-full shrink-0 flex flex-col gap-2">
                            {isLoading ? (
                              <span className="flex justify-center items-center h-40 text-black/40">
                                <AiOutlineLoading3Quarters className="animate-spin size-6" />
                              </span>
                            ) : (
                              item.submenu.map((sub, idx) => {
                                const subActive = isServiceSubLinkActive(
                                  pathName,
                                  sub.navLink,
                                );
                                return (
                                <AnimatedButton
                                size={"icon"}
                                variant={"secondary"}
                                className={cn(
                                  "md:!p-[6.5px] md:!pl-2.5 lg:!flex !hidden text-base! w-full justify-between bg-primary hover:bg-primary text-white",)}
                                key={sub.navLink}
                                href={`/services/${sub.navLink}`}
                                onMouseEnter={() =>
                                  setActiveServiceMenuIndex(idx)
                                }
                                trailingContent={
                                  <>
                                    <span
                                      className={`bg-white size-9 overflow-hidden flex items-center rounded-[0.3125rem]`}
                                    >
                                      <div className="flex justify-around [&_svg]:w-3! min-w-[72px] -translate-x-1/2 transition-all group-hover:translate-x-0">
                                        <ArrowRight color="#3838F9" />
                                        <ArrowRight color="#3838F9" />
                                      </div>
                                    </span>
                                  </>
                                }
                              >
                                {sub.navLabel}
                              </AnimatedButton>
                                );
                              })
                            )}
                          </div>
                          <div className="flex-1 min-h-[220px] min-w-0 rounded-[5px] bg-zinc-800 overflow-hidden relative max-w-[539px] w-full">
                            {!isLoading &&
                            item.submenu[activeServiceMenuIndex] ? (
                              <Image
                                key={
                                  item.submenu[activeServiceMenuIndex].navLink
                                }
                                src={
                                  item.submenu[activeServiceMenuIndex].imageUrl
                                }
                                alt=""
                                fill
                                className="object-cover transition-opacity duration-300"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      className={cn(
                        "transition-all text-base",
                        topLinkActive
                          ? "text-primary"
                          : "text-black hover:text-black/50",
                      )}
                      href={item.href}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
                );
              })}
            </ul>
            <Sheet>
              <SheetTrigger className="lg:!hidden !flex border border-primary rounded-[0.3125rem] p-2">
                <HamburgerIcon />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="!hidden">
                  <SheetTitle></SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <ul className="flex flex-col items-start px-6 gap-4 mt-8">
                  {menuItems.map((item, i) => {
                    const servicesActive =
                      item.submenu !== undefined &&
                      isServicesNavActive(pathName);
                    const topLinkActive =
                      item.submenu === undefined &&
                      item.href !== "" &&
                      isHrefActive(pathName, item.href);

                    return (
                    <li key={i + 1} className="w-full">
                      {item.submenu !== undefined ? (
                        <div className="flex flex-col gap-2">
                          <span
                            className={cn(
                              "text-xl leading-none font-medium",
                              servicesActive
                                ? "text-primary"
                                : "text-black",
                            )}
                          >
                            {item.title}
                          </span>
                          {isLoading ? (
                            <span className="flex py-2 text-black/40">
                              <AiOutlineLoading3Quarters className="animate-spin size-5" />
                            </span>
                          ) : (
                            <ul className="flex flex-col gap-2 pl-1 border-l border-black/10">
                              {item.submenu.map((sub) => {
                                const subActive = isServiceSubLinkActive(
                                  pathName,
                                  sub.navLink,
                                );
                                return (
                                <li key={sub.navLink}>
                                  <Link
                                    className={cn(
                                      "transition-colors text-base font-medium block py-0.5",
                                      subActive
                                        ? "text-primary"
                                        : "text-black/80 hover:text-primary",
                                    )}
                                    href={`/services/${sub.navLink}`}
                                  >
                                    {sub.navLabel}
                                  </Link>
                                </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          className={cn(
                            "transition-all text-xl leading-none font-medium",
                            topLinkActive
                              ? "text-primary"
                              : "text-black hover:text-black/50",
                          )}
                          href={item.href}
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                    );
                  })}
                  <AnimatedButton
                    size={"icon"}
                    variant={"secondary"}
                    className="md:!p-[6.5px] md:!pl-2.5 bg-primary hover:bg-primary text-base! text-white w-full! justify-between"
                    href="/contact"
                    trailingContent={
                      <>
                        <span
                          className={`bg-white size-7 overflow-hidden flex items-center rounded-[0.3125rem]`}
                        >
                          <div className="flex justify-around [&_svg]:w-3! min-w-14 -translate-x-1/2 transition-all group-hover:translate-x-0">
                            <ArrowRight color="#3838F9" />
                            <ArrowRight color="#3838F9" />
                          </div>
                        </span>
                      </>
                    }
                  >
                    Contact us
                  </AnimatedButton>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
          <AnimatedButton
            size={"icon"}
            variant={"secondary"}
            className="md:!p-[6.5px] md:!pl-2.5 lg:!flex !hidden bg-primary hover:bg-primary text-base! text-white"
            href="/contact"
            trailingContent={
              <>
                <span
                  className={`bg-white size-7 overflow-hidden flex items-center rounded-[0.3125rem]`}
                >
                  <div className="flex justify-around [&_svg]:w-3! min-w-14 -translate-x-1/2 transition-all group-hover:translate-x-0">
                    <ArrowRight color="#3838F9" />
                    <ArrowRight color="#3838F9" />
                  </div>
                </span>
              </>
            }
          >
            Contact us
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
