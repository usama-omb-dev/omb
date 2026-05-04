"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getTranslatedServiceSlug,
  parseServiceDetailSlug,
} from "@/lib/service-translated-slug";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const [pending, setPending] = useState<"en" | "nl" | null>(null);

  const switchLocale = useCallback(
    async (next: "en" | "nl") => {
      if (locale === next) return;
      setPending(next);
      try {
        let targetPath = pathname;
        const serviceSlug = parseServiceDetailSlug(pathname);
        if (serviceSlug) {
          const translated = await getTranslatedServiceSlug(
            serviceSlug,
            locale,
            next,
          );
          if (translated) {
            targetPath = `/services/${translated}`;
          }
        }
        router.replace(targetPath, { locale: next });
      } finally {
        setPending(null);
      }
    },
    [locale, pathname, router],
  );

  return (
    <div
      className={cn("flex items-center gap-1 text-sm", className)}
      role="group"
      aria-label={t("localeLabel")}
    >
      <button
        type="button"
        disabled={pending !== null}
        className={cn(
          "rounded px-1.5 py-0.5 font-medium transition-colors disabled:opacity-50",
          locale === "en"
            ? "text-primary"
            : "text-black/50 hover:text-black",
        )}
        onClick={() => void switchLocale("en")}
      >
        {t("localeEn")}
      </button>
      <span className="text-black/30" aria-hidden>
        |
      </span>
      <button
        type="button"
        disabled={pending !== null}
        className={cn(
          "rounded px-1.5 py-0.5 font-medium transition-colors disabled:opacity-50",
          locale === "nl"
            ? "text-primary"
            : "text-black/50 hover:text-black",
        )}
        onClick={() => void switchLocale("nl")}
      >
        {t("localeNl")}
      </button>
    </div>
  );
}
