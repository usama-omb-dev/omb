import { ContactForm } from "@/components/section/Form";
import Pill from "@/components/ui/pill";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";

const page = () => {
  return (
    <section className="bg-[#3838F9] min-h-screen relative isolate pt-60.5 pb-10">
      <div
        className="absolute -top-1/6 -left-1/7 w-1/2 blur-xl h-[120%] bg-cover bg-no-repeat -z-10 animate-rays"
        style={{ backgroundImage: "url(/hero-rays.png)" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(56,56,249,1)_100%)] -z-20" />
      <div className="container flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-2 max-w-165.25 mx-auto">
          <Pill className="text-white">Contact us</Pill>
          <p className="text-white text-body text-center">
            Marketing does not get better by waiting. If you are ready to
            challenge what is not working and want an honest conversation about
            growth, you are in the right place.
          </p>
          <h2 className="text-white text-5xl">Let’s talk</h2>
          <p className="text-white text-body text-center py-7.5">
            New business or a concrete question?
          </p>
          <div className="flex flex-col items-center gap-5 sm:pb-5 pb-3 sm:mb-5 mb-3">
            <Image
              src={"/rubin-koot-avatar.png"}
              alt={"Rubin's Avatar"}
              width={88}
              height={88}
            />
            <div className="flex flex-col items-center">
              <Link
                className="flex gap-2.5 items-center leading-none text-white sm:text-md text-sm"
                href={"https://www.linkedin.com/in/rubinkoot"}
                target="_blank"
              >
                Rubin Koot{" "}
                <span className="text-white">
                  <FaLinkedin />
                </span>
              </Link>
              <Link
                className="text-white/40 sm:text-body text-xsm"
                href={"mailto:rubin@onlinemarketingbakery.nl"}
              >
                rubin@onlinemarketingbakery.nl
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white py-8.25 px-8 rounded-[0.625rem] max-w-165.25 mx-auto w-full">
          <ContactForm darkForm={true} />
        </div>
      </div>
    </section>
  );
};

export default page;
