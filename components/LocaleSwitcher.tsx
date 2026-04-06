"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");

  return (
    <div
      className={cn("flex items-center gap-1 text-sm", className)}
      role="group"
      aria-label={t("localeLabel")}
    >
      <button
        type="button"
        className={cn(
          "rounded px-1.5 py-0.5 font-medium transition-colors",
          locale === "en"
            ? "text-primary"
            : "text-black/50 hover:text-black",
        )}
        onClick={() => router.replace(pathname, { locale: "en" })}
      >
        {t("localeEn")}
      </button>
      <span className="text-black/30" aria-hidden>
        |
      </span>
      <button
        type="button"
        className={cn(
          "rounded px-1.5 py-0.5 font-medium transition-colors",
          locale === "nl"
            ? "text-primary"
            : "text-black/50 hover:text-black",
        )}
        onClick={() => router.replace(pathname, { locale: "nl" })}
      >
        {t("localeNl")}
      </button>
    </div>
  );
}
