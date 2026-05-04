"use client";

import { useTranslations } from "next-intl";
import { OmbFormBuilderForm } from "@/components/omb-form-builder/OmbFormBuilderForm";
import { ScheduleCallForm } from "@/components/ui/schedule-call-form";

/**
 * Blog / case-study sidebar lead form: OMB Form Builder when server passes
 * `ombFormId` or `ombFormSlug` (from `getSidebarOmbFormProps`); otherwise CF7 schedule form.
 */
export function SidebarLeadForm({
  ombFormId,
  ombFormSlug,
}: {
  ombFormId?: string | null;
  ombFormSlug?: string | null;
}) {
  const t = useTranslations("ScheduleCallForm");
  const id = ombFormId?.trim();
  const slug = ombFormSlug?.trim();
  const useOmb = Boolean((id && /^\d+$/.test(id)) || slug);

  if (useOmb) {
    return (
      <div className="flex flex-col gap-5">
        <h5 className="text-md leading-none font-semibold text-black">
          {t("title")}
        </h5>
        <OmbFormBuilderForm
          darkForm
          className="gap-2.5 xl:gap-2.5 sm:gap-2.5"
          {...(id && /^\d+$/.test(id)
            ? { formId: id }
            : { formSlug: slug! })}
        />
      </div>
    );
  }

  return <ScheduleCallForm />;
}
