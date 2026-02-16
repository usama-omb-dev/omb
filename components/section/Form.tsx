"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import AnimatedButton from "../ui/button/AnimatedButton";
import { ArrowRight } from "../ui/icons";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import AnimatedArrowIcon from "../ui/button/AnimatedArrowIcon";

const formSchema = z.object({
  userName: z
    .string()
    .min(5, "Name must be at least 3 characters.")
    .max(32, "Name must be at most 32 characters."),
  userPhone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{7,15}$/, "Enter a valid phone number"),
  userMessage: z
    .string()
    .min(20, "Message must be at least 20 characters.")
    .max(100, "Message must be at most 100 characters."),
  userEmail: z.email(),
  contactAgreement: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userPhone: "",
      userMessage: "",
      userEmail: "",
      contactAgreement: false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
    form.reset();
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
              className="text-white sm:text-body! text-xsm!"
              htmlFor="user-name"
            >
              Full Name
            </FieldLabel>
            <Input
              {...field}
              id="user-name"
              aria-invalid={fieldState.invalid}
              placeholder="Your Full Name"
              autoComplete="on"
              className="border-0! bg-white/10 sm:rounded-[8px] rounded-[6px] ring-0! shadow-none! placeholder:text-[#AAACA6]! sm:text-body! text-xsm! text-white sm:min-h-15.25 min-h-10"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex xl:flex-row flex-col xl:gap-7.5 sm:gap-4 gap-2">
        <Controller
          name="userPhone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-white sm:text-body! text-xsm!"
                htmlFor="user-number"
              >
                Phone Number
              </FieldLabel>
              <Input
                {...field}
                type="tel"
                id="user-number"
                aria-invalid={fieldState.invalid}
                placeholder="Your Phone Number"
                autoComplete="on"
                className="border-0! bg-white/10 sm:rounded-[8px] rounded-[6px] ring-0! shadow-none! placeholder:text-[#AAACA6]! sm:text-body! text-xsm! text-white sm:min-h-15.25 min-h-10"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="userEmail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-white sm:text-body! text-xsm!"
                htmlFor="user-email"
              >
                Email Address
              </FieldLabel>
              <Input
                {...field}
                type="email"
                id="user-email"
                aria-invalid={fieldState.invalid}
                placeholder="Your Email Address"
                autoComplete="on"
                className="border-0! bg-white/10 sm:rounded-[8px] rounded-[6px] ring-0! shadow-none! placeholder:text-[#AAACA6]! sm:text-body! text-xsm! text-white sm:min-h-15.25 min-h-10"
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
              className="text-white sm:text-body! text-xsm!"
              htmlFor="user-message"
            >
              Message
            </FieldLabel>
            <InputGroup className="border-0! bg-white/10 sm:rounded-xl ring-0! shadow-none!">
              <InputGroupTextarea
                {...field}
                id="user-message"
                placeholder="Tell us about your project"
                rows={6}
                className="min-h-24 resize-none placeholder:text-[#AAACA6]! sm:text-body! text-xsm! text-white "
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums text-white/50 sm:text-xsm text-[12px]">
                  {field.value.length}/100 characters
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
                  className="bg-white/20 border border-white/20"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="agreement-check"
                  defaultChecked={false}
                />
                <FieldLabel
                  htmlFor="agreement-check"
                  className="xl:text-body! text-[0.75rem]! text-white font-normal! sm:flex! inline!"
                >
                  By contacting us, you agree to our{" "}
                  <Link
                    href="#"
                    className="underline font-medium underline-offset-8"
                  >
                    privacy policy.
                  </Link>
                </FieldLabel>
              </Field>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </>
          )}
        />

        <AnimatedButton size={"icon"} trailingContent={<AnimatedArrowIcon />}>
          Request a Free quote
        </AnimatedButton>
      </div>
    </form>
  );
}
