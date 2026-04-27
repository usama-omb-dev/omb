"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AnimatedButton from "./button/AnimatedButton";
import AnimatedArrowIcon from "./button/AnimatedArrowIcon";
import { useLocale, useTranslations } from "next-intl";

export function ScheduleCallForm() {
  const t = useTranslations("ScheduleCallForm");
  const tVal = useTranslations("ScheduleCallForm.validation");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formSchema = React.useMemo(
    () =>
      z.object({
        yourName: z
          .string()
          .min(1, tVal("nameMin"))
          .max(100, tVal("nameMax")),
        yourEmail: z.string().email(tVal("emailInvalid")),
        yourPhone: z
          .string()
          .refine(
            (s) =>
              s.length === 0 || /^[0-9+()\-\s]{7,25}$/.test(s),
            tVal("phoneInvalid"),
          )
          .refine((s) => s.length === 0 || s.trim().length >= 7, tVal("phoneMin")),
        yourCompany: z.string().max(200, tVal("companyMax")),
      }),
    [tVal],
  );

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourName: "",
      yourEmail: "",
      yourPhone: "",
      yourCompany: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/schedule-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          yourName: data.yourName,
          yourEmail: data.yourEmail,
          yourPhone: data.yourPhone,
          yourCompany: data.yourCompany ?? "",
          locale: locale === "nl" ? "nl" : "en",
        }),
      });

      const payload = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (res.status === 503 && payload.error === "contact_not_configured") {
        toast.error(t("submitErrorConfig"), { position: "bottom-right" });
        return;
      }

      if (res.ok && payload.ok) {
        toast.success(t("submitSuccess"), {
          description: payload.message || undefined,
          position: "bottom-right",
        });
        form.reset({
          yourName: "",
          yourEmail: "",
          yourPhone: "",
          yourCompany: "",
        });
        return;
      }

      toast.error(t("submitError"), {
        description: payload.message || undefined,
        position: "bottom-right",
      });
    } catch {
      toast.error(t("submitError"), { position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <h5 className="text-md font-semibold text-black leading-none">
        {t("title")}
      </h5>
      <div className="flex flex-col gap-2.5">
        <Controller
          name="yourName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-0! " data-invalid={fieldState.invalid}>
              <Input
                {...field}
                autoComplete="name"
                placeholder={t("placeholderName")}
                aria-invalid={fieldState.invalid}
                className="h-12.75 bg-background border-0 shadow-none rounded-full"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="yourEmail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-0!" data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="email"
                autoComplete="email"
                placeholder={t("placeholderEmail")}
                aria-invalid={fieldState.invalid}
                className="h-12.75 bg-background border-0 shadow-none rounded-full"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="yourPhone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-0!" data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="tel"
                autoComplete="tel"
                placeholder={t("placeholderPhone")}
                aria-invalid={fieldState.invalid}
                className="h-12.75 bg-background border-0 shadow-none rounded-full"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="yourCompany"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-0!" data-invalid={fieldState.invalid}>
              <Input
                {...field}
                autoComplete="organization"
                placeholder={t("placeholderCompany")}
                aria-invalid={fieldState.invalid}
                className="h-12.75 bg-background border-0 shadow-none rounded-full"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <AnimatedButton
        className={cn(
          "bg-primary text-white justify-between w-full p-2.5! pl-5!",
          isSubmitting && "pointer-events-none opacity-70",
        )}
        type="submit"
        disabled={isSubmitting}
        trailingContent={<AnimatedArrowIcon tone="on-dark" />}
      >
        {t("submit")}
      </AnimatedButton>
    </form>
  );
}
