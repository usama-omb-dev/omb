"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Menu as MenuIcon, X } from "lucide-react";
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

interface ServiceNavMenu {
  navLabel: string;
  navLink: string;
}

const Header = () => {
  const [isWhiteNav, setIsWhiteNav] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  const pathName = usePathname();

  const { data: services, isLoading } = useServices();

  const servicesNavigationData = isLoading
    ? []
    : services.map((item: any) => {
        return { navLabel: item.title.rendered, navLink: item.slug };
      });

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    {
      title: "Services",
      href: "/services",
      submenu: servicesNavigationData,
    },
    { title: "Blogs", href: "/blogs" },
    { title: "Contact", href: "/contact" },
  ];

  const featuredItems = [
    { title: "Stobe", href: "/" },
    { title: "Jebra", href: "/" },
    {
      title: "RayWorks",
      href: "/",
    },
    { title: "Locquet Power", href: "/" },
  ];

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

  useEffect(() => {
    if (!menuRef.current) return;
    const fullHeight = menuRef.current.scrollHeight;
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(menuRef.current, {
      height: fullHeight,
      duration: 0.5,
      ease: "power3.out",
      overflow: "hidden",
    });
    gsap.set(menuRef.current, {
      height: 0,
      overflow: "hidden",
      paddingTop: 0,
      paddingBottom: 0,
    });
  }, []);

  useEffect(() => {
    if (!tl.current) return;

    if (isOpen) tl.current.play();
    else tl.current.reverse();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="absolute sm:top-10 top-6 left-0 z-50 w-full">
      <div className="container">
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
      </div>
    </header>
  );
};

export default Header;
