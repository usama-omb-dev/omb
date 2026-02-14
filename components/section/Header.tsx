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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline | null>(null);

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    {
      title: "Services",
      href: "/services",
      submenu: [
        { title: "SEO & GEO", href: "/services/seo-geo" },
        { title: "SEA", href: "/services/sea" },
        { title: "Web Design", href: "/services/web-design" },
      ],
    },
    { title: "Blog", href: "/blog" },
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

  return (
    <header className="absolute sm:top-10 top-6 left-0 z-50 w-full">
      <div className="container">
        <div className="flex justify-between items-center relative">
          <Link href="/">
            <Image
              className="brightness-0 invert-100"
              src="/logo.svg"
              alt="Logo"
              width={111}
              height={45}
            />
          </Link>

          <div className="md:relative z-50 flex items-center gap-2.5">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer flex items-center justify-between leading-none py-3.75 px-5 rounded-[0.625rem] bg-white/10 backdrop-blur-3xl text-white text-body relative lg:min-w-126.5 md:min-w-96"
            >
              <span className="md:inline-block hidden">
                {isOpen ? "Close" : "Menu"}
              </span>
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
            <Dialog>
              <DialogTrigger className="cursor-pointer flex items-center justify-between py-4.5 px-5 rounded-[0.625rem] bg-white/10 backdrop-blur-3xl text-white text-body relative">
                <Image
                  src={"/play-btn.svg"}
                  alt="Play Button"
                  width={18}
                  height={18}
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
              className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white/10 rounded-[0.625rem] px-5 backdrop-blur-3xl flex flex-col"
            >
              <div className="flex flex-col gap-7.5 py-5.5">
                <div className=" flex flex-col gap-5">
                  <h6 className="text-body text-white/20 leading-none pb-5 border-b border-white/10">
                    Company
                  </h6>
                  <ul className="flex flex-col gap-2.5">
                    {menuItems.map((item, i) => (
                      <li key={i}>
                        {item.submenu ? (
                          <NavigationMenu>
                            <NavigationMenuList>
                              <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-lg text-white font-normal! leading-none hover:text-white/50! p-0! rounded-none! bg-transparent! hover:bg-transparent!">
                                  {item.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                  {item.submenu.map((sub, j) => (
                                    <NavigationMenuLink key={sub + String(j)}>
                                      Link
                                    </NavigationMenuLink>
                                  ))}
                                </NavigationMenuContent>
                              </NavigationMenuItem>
                            </NavigationMenuList>
                          </NavigationMenu>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-lg font-normal text-white leading-none hover:text-white/50"
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
                  <h6 className="text-body text-white/20 leading-none pb-5 border-b border-white/10">
                    Featured Projects
                  </h6>
                  <ul className="flex flex-col gap-2.5">
                    {featuredItems.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className="text-lg font-normal text-white leading-none hover:text-white/50"
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
            className="text-white underline underline-offset-4 text-body md:flex hidden "
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
