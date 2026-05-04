import { OmbFormBuilderForm } from "@/components/omb-form-builder/OmbFormBuilderForm";
import { ContactForm } from "@/components/section/Form";
import { MARKETING_HERO_GRADIENT } from "@/components/section/marketing-hero-shared";
import { loadMessagesJson } from "@/lib/load-messages";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMessagesJson(locale);
  return { title: messages.PageTitles?.contact ?? "Contact" };
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  const ombFormId = process.env.OMB_FORM_BUILDER_CONTACT_FORM_ID?.trim();
  const ombFormSlug = process.env.OMB_FORM_BUILDER_CONTACT_FORM_SLUG?.trim();
  const useOmbForm =
    (ombFormId && /^\d+$/.test(ombFormId)) || Boolean(ombFormSlug?.length);

  return (
    <main className="bg-background pb-16 sm:pb-20">
      <div
        className="relative isolate overflow-x-hidden pb-16 sm:pb-20 lg:pb-24"
        style={{ background: MARKETING_HERO_GRADIENT }}
      >
        <div className="container relative mx-auto px-4 lg:px-0">
          <div className="mx-auto flex max-w-260 flex-col items-center gap-4 pt-28 text-center sm:gap-5 sm:pt-40 lg:pt-44">
            <p className="flex items-center justify-center gap-2 sm:gap-2.5">
              <span
                className="size-2 shrink-0 rounded-full bg-primary sm:size-2.5"
                aria-hidden
              />
              <span className="text-sm font-semibold tracking-tight text-primary sm:text-base">
                {t("pill")}
              </span>
            </p>
            <p className="max-w-161.5 text-pretty text-xsm leading-relaxed text-black/80 sm:text-body">
              {t("intro")}
            </p>
            <h1 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-black sm:text-5xl sm:leading-[1.06] lg:text-[56px] lg:leading-[1.06]">
              {t("heading")}
            </h1>
            <p className="max-w-lg text-pretty text-xsm leading-relaxed text-black/70 sm:text-body">
              {t("subheading")}
            </p>
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto -mt-12 px-4 sm:-mt-16 lg:-mt-20 lg:px-0">
        <div className="mx-auto w-full max-w-165.25 rounded-[0.625rem] border border-black/10 bg-white px-4 py-8 shadow-[0px_20px_48px_rgba(56,56,249,0.12)] sm:px-8 sm:py-10">
          <h2 className="mb-6 text-left text-lg font-semibold leading-none text-black sm:mb-8 sm:text-xl">
            {t("formCardTitle")}
          </h2>
          {useOmbForm ? (
            <OmbFormBuilderForm
              darkForm
              {...(ombFormId && /^\d+$/.test(ombFormId)
                ? { formId: ombFormId }
                : { formSlug: ombFormSlug! })}
            />
          ) : (
            <ContactForm darkForm={true} />
          )}
        </div>
      </div>
    </main>
  );
}
