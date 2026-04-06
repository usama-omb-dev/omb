import Image from "next/image";
import { ContactForm } from "./Form";
import TextReveal from "@/components/ui/TextReveal";

export type ContactSectionProps = {
  eyebrow?: string;
  headline?: string;
  paragraph1?: string;
  paragraph2?: string;
  bulletPoints?: readonly string[];
  logoSrc?: string;
  logoAlt?: string;
  overlaySrc?: string;
  overlayAlt?: string;
  tickSrc?: string;
  tickAlt?: string;
  /** Numeric CF7 form ID when this block should not use the server default. */
  cf7FormId?: string;
};

const Contact = ({
  eyebrow,
  headline,
  paragraph1,
  paragraph2,
  bulletPoints,
  logoSrc = "/omb-logo.png",
  logoAlt = "Logo",
  overlaySrc = "/glitchy-overlay.png",
  overlayAlt = "Overlay",
  tickSrc = "/gr-tick.png",
  tickAlt = "",
  cf7FormId,
}: ContactSectionProps) => {
  return (
    <section className="lg:py-37.5 py-10">
      <div className="container">
        <div className="sm:rounded-4xl rounded-[1.25rem] bg-linear-to-t from-[#212193] to-[#3838F9] xl:p-14.75 lg:p-10 sm:p-6 p-4 grid lg:grid-cols-2 gap-6 lg:gap-0 relative isolate overflow-hidden">
          <Image
            src={overlaySrc}
            alt={overlayAlt}
            width={1306}
            height={822}
            className="absolute -z-20 top-0 left-0 w-full h-full opacity-80"
          />
          <div className="flex flex-col lg:gap-7.5 gap-4">
            <Image src={logoSrc} alt={logoAlt} width={65} height={92} />
            <div>
              {eyebrow ? (
                <h5 className="text-white sm:text-md text-body font-medium">
                  <TextReveal>{eyebrow}</TextReveal>
                </h5>
              ) : null}
              {headline ? (
                <h2 className="text-white xl:text-3xl sm:text-2xl text-lg leading-none xl:pr-24 pr-10">
                  <TextReveal>{headline}</TextReveal>
                </h2>
              ) : null}
            </div>
            <div className="xl:pt-7.5 xl:pr-0 pr-5 flex flex-col lg:gap-7.5 sm:gap-4 gap-2">
              {paragraph1 ? (
                <p className="xl:text-body sm:text-sm text-xsm font-medium text-white">
                  {paragraph1}
                </p>
              ) : null}
              {paragraph2 ? (
                <p className="xl:text-body sm:text-sm text-xsm font-medium text-white">
                  {paragraph2}
                </p>
              ) : null}
              {bulletPoints?.length && (

              <ul className="flex flex-col gap-2.5">
                {bulletPoints.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="text-white xl:text-body sm:text-sm text-xsm font-medium flex items-center sm:gap-3.75 gap-2"
                  >
                    <Image src={tickSrc} alt={tickAlt} width={27} height={27} />{" "}
                    {item}
                  </li>
                ))}
              </ul>
              )}
            </div>
          </div>
          <div className="bg-white/4 backdrop-blur-3xl border border-white/26 rounded-[0.625rem] xl:p-11.5 sm:p-6 p-4 xl:pr-6.5">
            <ContactForm cf7FormId={cf7FormId} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
