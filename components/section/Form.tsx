"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import AnimatedButton from "../ui/button/AnimatedButton";
import { Checkbox } from "../ui/checkbox";
import { Link } from "@/i18n/navigation";
import AnimatedArrowIcon from "../ui/button/AnimatedArrowIcon";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export function ContactForm({
  darkForm = false,
  /** Numeric WordPress CF7 post ID; must be listed in `CONTACT_FORM_7_ALLOWED_IDS`. */
  cf7FormId,
}: {
  darkForm?: boolean;
  cf7FormId?: string;
}) {
  const t = useTranslations("Form");
  const tVal = useTranslations("Form.validation");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formSchema = React.useMemo(
    () =>
      z.object({
        userName: z
          .string()
          .min(5, tVal("nameMin"))
          .max(32, tVal("nameMax")),
        userPhone: z
          .string()
          .min(1, tVal("phoneRequired"))
          .regex(/^[0-9]{7,15}$/, tVal("phoneInvalid")),
        userMessage: z
          .string()
          .min(20, tVal("messageMin"))
          .max(100, tVal("messageMax")),
        userEmail: z.string().email(tVal("emailInvalid")),
        contactAgreement: z.boolean().refine((val) => val === true, {
          message: tVal("privacyRequired"),
        }),
      }),
    [tVal],
  );

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userPhone: "",
      userMessage: "",
      userEmail: "",
      contactAgreement: false,
    },
  });

  const contactAgreement = form.watch("contactAgreement");

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          locale: locale === "nl" ? "nl" : "en",
          ...(cf7FormId && /^\d+$/.test(cf7FormId) ? { formId: cf7FormId } : {}),
        }),
      });

      const payload = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (res.status === 503 && payload.error === "contact_not_configured") {
        toast.error(t("submitErrorConfig"));
        return;
      }

      if (res.status === 400 && payload.error === "invalid_form_id") {
        toast.error(t("submitErrorFormId"));
        return;
      }

      if (res.ok && payload.ok) {
        toast.success(t("submitSuccess"), {
          description: payload.message || undefined,
          position: "bottom-right",
        });
        form.reset({
          userName: "",
          userPhone: "",
          userMessage: "",
          userEmail: "",
          contactAgreement: false,
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
      className="flex flex-col xl:gap-6 sm:gap-4 gap-2"
    >
      <Controller
        name="userName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              className={`${darkForm ? "text-black" : "text-white"} sm:text-body! text-xsm!`}
              htmlFor="user-name"
            >
              {t("labelFullName")}
            </FieldLabel>
            <Input
              {...field}
              id="user-name"
              aria-invalid={fieldState.invalid}
              placeholder={t("placeholderFullName")}
              autoComplete="on"
              className={cn(
                "rounded-[6px] text-xsm! ring-0! sm:min-h-15.25 sm:rounded-[8px] sm:text-body!",
                "placeholder:text-zinc-500!",
                darkForm
                  ? "border border-zinc-200 bg-zinc-100 text-black shadow-none"
                  : "border-0! bg-white/10 text-white shadow-none placeholder:text-[#AAACA6]!",
              )}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div
        className={cn(
          "flex gap-2 sm:gap-4",
          darkForm ? "flex-col sm:flex-row" : "flex-col xl:flex-row xl:gap-7.5",
        )}
      >
        <Controller
          name="userPhone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className={darkForm ? "min-w-0 w-full sm:flex-1" : undefined}
            >
              <FieldLabel
                className={`${darkForm ? "text-black" : "text-white"} sm:text-body! text-xsm!`}
                htmlFor="user-number"
              >
                {t("labelPhone")}
              </FieldLabel>
              <Input
                {...field}
                type="tel"
                id="user-number"
                aria-invalid={fieldState.invalid}
                placeholder={t("placeholderPhone")}
                autoComplete="on"
                className={cn(
                  "min-h-10 w-full rounded-[6px] text-xsm! ring-0! sm:min-h-15.25 sm:rounded-[8px] sm:text-body!",
                  "placeholder:text-zinc-500!",
                  darkForm
                    ? "border border-zinc-200 bg-zinc-100 text-black shadow-none"
                    : "border-0! bg-white/10 text-white shadow-none placeholder:text-[#AAACA6]!",
                )}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="userEmail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className={darkForm ? "min-w-0 w-full sm:flex-1" : undefined}
            >
              <FieldLabel
                className={`${darkForm ? "text-black" : "text-white"} sm:text-body! text-xsm!`}
                htmlFor="user-email"
              >
                {t("labelEmail")}
              </FieldLabel>
              <Input
                {...field}
                type="email"
                id="user-email"
                aria-invalid={fieldState.invalid}
                placeholder={t("placeholderEmail")}
                autoComplete="on"
                className={cn(
                  "min-h-10 w-full rounded-[6px] text-xsm! ring-0! sm:min-h-15.25 sm:rounded-[8px] sm:text-body!",
                  "placeholder:text-zinc-500!",
                  darkForm
                    ? "border border-zinc-200 bg-zinc-100 text-black shadow-none"
                    : "border-0! bg-white/10 text-white shadow-none placeholder:text-[#AAACA6]!",
                )}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Controller
        name="userMessage"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              className={`${darkForm ? "text-black" : "text-white"} sm:text-body! text-xsm!`}
              htmlFor="user-message"
            >
              {t("labelMessage")}
            </FieldLabel>
            <InputGroup
              className={cn(
                "sm:rounded-xl ring-0!",
                darkForm
                  ? "border border-zinc-200 bg-zinc-100 text-black shadow-none"
                  : "border-0! bg-white/10 text-white shadow-none",
              )}
            >
              <InputGroupTextarea
                {...field}
                id="user-message"
                placeholder={t("placeholderMessage")}
                rows={6}
                className={cn(
                  "min-h-24 resize-none text-xsm! sm:text-body!",
                  darkForm
                    ? "text-black placeholder:text-zinc-500!"
                    : "text-white placeholder:text-[#AAACA6]!",
                )}
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText
                  className={`tabular-nums  ${darkForm ? "text-black/50" : "text-white/50"} sm:text-xsm text-[12px]`}
                >
                  {t("charCount", { count: field.value.length })}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-col gap-6 xl:pt-14.75 pt-4">
        <Controller
          name="contactAgreement"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <Field data-invalid={fieldState.invalid} orientation="horizontal">
                <Checkbox
                  className={`border  ${darkForm ? "border-black/20 bg-black/20" : "border-white/20 bg-white/20"} `}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="agreement-check"
                  defaultChecked={false}
                />
                <FieldLabel
                  htmlFor="agreement-check"
                  className={`xl:text-body! text-[0.75rem]!  ${darkForm ? "text-black" : "text-white"} font-normal! sm:flex! inline!`}
                >
                  {t("agreementBefore")}{" "}
                  <Link
                    href="#"
                    className="underline font-medium underline-offset-8"
                  >
                    {t("privacyLink")}
                  </Link>
                </FieldLabel>
              </Field>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </>
          )}
        />

        <AnimatedButton
          type="submit"
          variant={darkForm ? "secondary" : "default"}
          size={"icon"}
          trailingContent={<AnimatedArrowIcon />}
          disabled={!contactAgreement || isSubmitting}
        >
          {t("submit")}
        </AnimatedButton>
      </div>
    </form>
  );
}
