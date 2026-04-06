import { ContactForm } from "@/components/section/Form";
import Pill from "@/components/ui/pill";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";
import { envSocialUrls, socialHref } from "@/lib/social-links";

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  const rubinLinkedIn = socialHref(envSocialUrls.linkedinRubin);
  return (
    <section className="p-3">
      <div
        style={{ backgroundImage: "url(/gradient-bg-hero.png)" }}
        className="relative isolate lg:pt-60.5 pt-36 pb-10 overflow-hidden bg-cover bg-no-repeat bg-center flex flex-col gap-16.75"
      >
        <div className="container flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-2 max-w-165.25 mx-auto">
            <Pill iconColor="#3838F9" className="text-primary">
              {t("pill")}
            </Pill>
            <p className="text-black text-body text-center">{t("intro")}</p>
            <h2 className="text-black sm:text-5xl text-3xl">{t("heading")}</h2>
            <p className="text-black text-body text-center sm:py-7.5 py-3">
              {t("subheading")}
            </p>
            <div className="flex flex-col items-center gap-5 sm:pb-5 pb-3 sm:mb-5 mb-3">
              <Image
                src={"/rubin-koot-avatar.png"}
                alt={t("avatarAlt")}
                width={88}
                height={88}
              />
              <div className="flex flex-col items-center">
                <a
                  className="flex gap-2.5 items-center leading-none text-primary sm:text-md text-sm"
                  href={rubinLinkedIn.href}
                  target={rubinLinkedIn.target}
                  rel={rubinLinkedIn.rel}
                >
                  Rubin Koot{" "}
                  <span className="text-primary">
                    <FaLinkedin />
                  </span>
                </a>
                <a
                  className="text-black sm:text-body text-xsm"
                  href="mailto:rubin@onlinemarketingbakery.nl"
                >
                  rubin@onlinemarketingbakery.nl
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white py-8.25 sm:px-8 px-4 rounded-[0.625rem] max-w-165.25 mx-auto w-full">
            <ContactForm darkForm={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
