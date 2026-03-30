"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa6";

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "Over ons" },
  { href: "/", label: "Outsource link building" },
  { href: "/", label: "SEO-copywriter" },
  { href: "/", label: "Online marketing agency Roermond " },
];

const helpNavLinks = [
  { href: "/", label: "Faqs" },
  { href: "/", label: "Help Center" },
  { href: "/", label: "Support" },
];

const socialLinks = [
  { icon: <FaFacebookF aria-hidden />, href: "#", label: "Facebook" },
  { icon: <FaInstagram aria-hidden />, href: "#", label: "Instagram" },
  { icon: <FaLinkedin aria-hidden />, href: "#", label: "LinkedIn" },
];

const kvkNumber = "78033616";
const btwNumber = "NL003276206B85";

const footerContact = {
  phone: "0681843267",
  email: "hello@onlinemarketingbakery.nl",
  address: "Noordhoven 176042 NW Roermond",
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{ backgroundImage: "url(/footer-bg.png)" }}
      className="bg-cover bg-center bg-no-repeat sm:py-14 py-4 xl:py-20 relative isolate"
    >
      <div className="container ">
        <div className="grid lg:gap-8 gap-6 border-b border-white/20 lg:grid-cols-2 xl:gap-0">
          <div className="flex flex-col sm:gap-8 gap-4 lg:border-r lg:border-white/20 lg:pr-12 sm:pt-4.5">
            <p className="text-lg font-bold leading-none tracking-tight text-white sm:text-xl xl:text-2xl">
              Creative solutions. Strategic growth. Real results. <br />
              Let&apos;s take your brand to the next level.
            </p>
            <div className="flex sm:flex-row flex-col-reverse flex-wrap sm:items-center gap-3.5">
              <ul className="flex flex-wrap gap-2.5">
                {socialLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex lg:size-[54px] sm:size-12 size-10 items-center justify-center rounded-[10px] border border-primary bg-primary sm:text-lg text-md text-white transition-all hover:bg-transparent"
                      aria-label={item.label}
                    >
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className="inline-flex shrink-0 opacity-90 transition-opacity hover:opacity-100"
              >
                <Image
                  src="/leadinfo-rounded.png"
                  alt="Leadinfo Certified Partner"
                  width={116}
                  height={54}
                  className="h-auto"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:pb-20.75 sm:pb-10 pb-6 2xl:pl-24 xl:pl-12 lg:pl-12 pl-0 sm:pt-4.5">
            <div className="grid sm:grid-cols-2 2xl:gap-8 gap-4">
              <div>
                <h2 className="text-md font-medium text-white">
                  Our Solutions
                </h2>
                <ul className="mt-4 flex list-inside list-disc flex-col gap-3 xl:text-sm text-xsm text-white/85 marker:text-white">
                  {mainNavLinks.map((item, index) => (
                    <li key={index} className="pl-0.5">
                      <Link
                        href={item.href}
                        className="-ml-1 hover:text-white"
                      >
                        {item.label.trim()}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-md font-medium text-white">Help</h2>
                <ul className="mt-4 flex list-inside list-disc flex-col gap-3 xl:text-sm text-xsm text-white/85 marker:text-white">
                  {helpNavLinks.map((item, index) => (
                    <li key={index} className="pl-0.5">
                      <Link
                        href={item.href}
                        className="-ml-1 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="sm:mt-2 grid sm:grid-cols-2 gap-3 w-fit">
              <div className="min-w-[156px] rounded-[5px] w-fit bg-white/6 px-4 py-3">
                <p className="text-xsm text-white/58">KvK number</p>
                <p className="mt-1 text-sm font-bold text-white">{kvkNumber}</p>
              </div>
              <div className="min-w-[156px] rounded-[5px] w-fit bg-white/6 px-4 py-3">
                <p className="text-xsm text-white/58">BTW-number</p>
                <p className="mt-1 text-sm font-bold leading-tight text-white">
                  {btwNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between xl:gap-8 gap-4 pt-2.5 pb-4.25 xl:flex-row md:items-center border-b border-white/20">
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src="/logo-icon.svg"
              alt="Omb"
              width={46.6}
              height={66.09}
              className="brightness-0 invert"
            />
            <p className="text-xsm text-white/80 md:text-sm">
              © Copyright {year}, Omb all rights reserved
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 md:flex-row md:items-center sm:gap-x-6 sm:gap-y-2 md:w-auto md:justify-between xl:min-w-[55%] ">
            <div className="flex flex-col">
              <span className="text-white/58 text-base">
              Phone
              </span>
              <a
                href={`tel:${footerContact.phone.replace(/\s/g, "")}`}
                className="text-white"
              >
                {footerContact.phone}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-white/58 text-base">
              Email
              </span>
              <a
                href={`tel:${footerContact.phone.replace(/\s/g, "")}`}
                className="text-white"
              >
                {footerContact.email}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-white/58 text-base">
              Address
              </span>
              <a
                href={`tel:${footerContact.phone.replace(/\s/g, "")}`}
                className="text-white"
              >
                {footerContact.address}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
