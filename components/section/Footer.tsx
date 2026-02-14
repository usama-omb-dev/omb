"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa6";

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "Over ons" },
  { href: "/", label: "Outsource link building" },
  { href: "/", label: "SEO-copywriter" },
  { href: "/", label: "Online marketing agency Roermond " },
];

const helpNavLinks = [
  { href: "/", label: "FAQ" },
  { href: "/", label: "Help Center" },
  { href: "/", label: "Support" },
];

const contactNavLinks = [
  { href: "#", label: "Address:", info: "Noordhoven 176042 NW Roermond" },
  {
    href: "#",
    label: "Phone:",
    info: "0681843267",
  },
  { href: "#", label: "KvK number:", info: "78033616" },
  { href: "#", label: "Mail:", info: "hello@onlinemarketingbakery.nl" },
  { href: "#", label: "BTW-number:", info: "NL003276206B85" },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "" },
  { icon: <FaInstagram />, href: "" },
  { icon: <FaLinkedin />, href: "" },
];

const Footer = () => {
  const pathName = usePathname().split("/")[1];
  return (
    <footer
      className="relative xsm:h-[350px] h-[550px] bg-primary"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 xsm:h-[350px] h-[550px] w-full  xsm:top-[calc(100vh-350px)] top-[calc(100vh-550px)]">
        <div className="container flex flex-col justify-between h-full pt-14.75">
          <div className="flex items-start xl:gap-42.5 gap-20">
            <div className="max-w-106.25 flex flex-col gap-12.5">
              <div className="flex flex-col gap-7.5">
                <Image
                  className=" brightness-0 invert-100"
                  src="/logo.svg"
                  alt="Logo"
                  width="111"
                  height="45"
                />
                <p className="text-white text-[21px]">
                  {`Creative solutions. Strategic growth. Real results. Let's take your brand to the next level.`}
                </p>
              </div>
              <div className="flex flex-col gap-6.5">
                <ul className="flex gap-2.5 flex-wrap">
                  {socialLinks.map((item, index) => (
                    <li key={index + 1}>
                      <Link
                        className="flex justify-center items-center w-14 h-14 text-white border border-white/10 rounded-[8px] bg-linear-150 transition-all hover:backdrop-blur-3xl from-white/20 from-10% to-transparent to-60% text-[1.25rem]"
                        href={item.href}
                      >
                        {item.icon}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Image
                  className=""
                  src="/leadinfo.png"
                  alt="Logo"
                  width="234"
                  height="104"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 2xl:gap-[7.8438rem] gap-17.5">
              <div>
                <h5 className="text-white text-md font-medium">
                  Our solutions
                </h5>
                <ul className="text-white flex flex-col gap-5 mt-8 text-sm">
                  {mainNavLinks.map((item, index) => (
                    <li key={index + 1}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-white text-md font-medium">
                  Contact details
                </h5>
                <ul className="text-white flex flex-col gap-5 mt-8 text-sm">
                  {contactNavLinks.map((item, index) => (
                    <li key={index + 1}>
                      <h6 className="font-bold">{item.label}</h6>
                      <Link href={item.href} className="opacity-70">
                        {item.info}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-white text-md font-medium">Help</h5>
                <ul className="text-white flex flex-col gap-5 mt-8">
                  {helpNavLinks.map((item, index) => (
                    <li key={index + 1}>
                      <Link className="opacity-70" href={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="text-sm text-white font-medium py-7.5">
            © Copyright 2025, Omb all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
