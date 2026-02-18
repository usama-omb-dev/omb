import Counter from "@/components/ui/counter";
import Pill from "@/components/ui/pill";
import TextReveal from "@/components/ui/TextReveal";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";

const socialMediaLinks = [
  { icon: <FaLinkedin />, href: "" },
  { icon: <PiInstagramLogoFill />, href: "" },
  { icon: <FaFacebookSquare />, href: "" },
];
const BlogHero = () => {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute -top-1/6 -left-1/7 w-1/2 2xl:blur-none blur-xl h-[120%] bg-cover bg-no-repeat -z-10 animate-rays"
        style={{ backgroundImage: "url(/hero-rays.png)" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,1)_0%,_rgba(56,56,249,1)_100%)] -z-20" />
      <div className="container sm:pt-50 pt-32 sm:pb-27.5 pb-10">
        <div className="flex lg:flex-row flex-col items-center justify-between xl:gap-24 lg:gap-2.5 gap-5">
          <div className="flex flex-col md:gap-10 gap-5">
            <div className="flex flex-col gap-5">
              <Pill iconColor="#fff" className="text-white">
                Meet the expert
              </Pill>
              <h1 className="md:text-5xl sm:text-3xl text-2xl text-white leading-none">
                <TextReveal>Hi, I am Rubin Koot.</TextReveal>
              </h1>
              <p className="sm:text-body text-xsm text-white max-w-164">
                A motivated and detail-oriented professional with a strong focus
                on growth, quality, and innovation. I am passionate about
                developing effective solutions and continuously expanding my
                knowledge across technical and creative disciplines.
              </p>
            </div>
            <div className="flex gap-3.5">
              <div className="sm:p-6.5 p-3.5 bg-white/10 backdrop-blur-2xl rounded-[0.625rem]">
                <p className="text-white font-medium text-sm pb-2.5">
                  Years of Experience
                </p>
                <Counter
                  className="text-white text-2xl font-normal"
                  suffix={"+"}
                >
                  {6}
                </Counter>
              </div>
              <div className="sm:p-6.5 p-3.5 bg-white/10 backdrop-blur-2xl rounded-[0.625rem]">
                <p className="text-white font-medium text-sm pb-2.5">
                  Total Articles
                </p>
                <Counter
                  className="text-white text-2xl font-normal"
                  suffix={"+"}
                >
                  {200}
                </Counter>
              </div>
            </div>
            <div className="md:mt-5">
              <p className="font-medium text-white sm:text-md text-body leading-none">
                Follow me on
              </p>
              <ul className="flex gap-2.5 sm:mt-5 mt-2">
                {socialMediaLinks.map((item, index) => (
                  <li key={index + 1}>
                    <Link
                      className="text-white hover:text-white/50 transition-all text-[25px]"
                      href={item.href}
                    >
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Image
            src={"/rubin-koot-author.png"}
            alt="Rubin Koot"
            width={493}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
