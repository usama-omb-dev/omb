"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AnimatedButton from "./button/AnimatedButton";
import { ArrowRight } from "./icons";
import { useServices } from "@/hooks/useServices";
import { useTranslations } from "next-intl";

export function ScheduleCallForm() {
  const t = useTranslations("ScheduleCallForm");
  const tVal = useTranslations("ScheduleCallForm.validation");

  const formSchema = React.useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(3, tVal("nameMin"))
          .max(50, tVal("nameMax")),
        email: z.string().email(tVal("emailInvalid")),
        phone: z
          .string()
          .min(7, tVal("phoneRequired"))
          .regex(/^[0-9+()\-\s]{7,20}$/, tVal("phoneInvalid")),
        interest: z.array(z.string()).min(1, tVal("interestMin")),
      }),
    [tVal],
  );

  type FormValues = z.infer<typeof formSchema>;

  const { data: services, isLoading } = useServices();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: [],
    },
  });

  function onSubmit(data: FormValues) {
    toast(t("toastTitle"), {
      description: (
        <pre className="mt-2 w-[300px] overflow-x-auto rounded-md bg-black/80 p-4 text-white text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      ),
      position: "bottom-right",
    });

    form.reset();
  }

  const interests = isLoading
    ? []
    : services.map((item: { title: { rendered: string }; slug: string }) => {
        return {
          label: item.title.rendered,
          value: item.slug,
        };
      });

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
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-0! " data-invalid={fieldState.invalid}>
              <Input
                {...field}
                placeholder={t("placeholderName")}
                aria-invalid={fieldState.invalid}
                className="h-12.75 bg-background border-0 shadow-none rounded-[0.3125rem]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-0!" data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="email"
                placeholder={t("placeholderEmail")}
                aria-invalid={fieldState.invalid}
                className="h-12.75 bg-background border-0 shadow-none rounded-[0.3125rem]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-0!" data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="tel"
                placeholder={t("placeholderPhone")}
                aria-invalid={fieldState.invalid}
                className="h-12.75 bg-background border-0 shadow-none rounded-[0.3125rem]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="interest"
          control={form.control}
          render={({ field, fieldState }) => {
            const selectedValues: string[] = field.value || [];

            return (
              <Field className="gap-0!" data-invalid={fieldState.invalid}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="h-12.75 w-full justify-between rounded-[0.3125rem]"
                    >
                      {selectedValues.length > 0
                        ? t("interestSelected", {
                            count: selectedValues.length,
                          })
                        : t("interestPlaceholder")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder={t("searchPlaceholder")} />
                      <CommandEmpty>{t("searchEmpty")}</CommandEmpty>

                      <CommandGroup>
                        {interests.map(
                          (item: { label: string; value: string }) => {
                            const isSelected = selectedValues.includes(
                              item.value,
                            );

                            return (
                              <CommandItem
                                key={item.value}
                                onSelect={() => {
                                  if (isSelected) {
                                    field.onChange(
                                      selectedValues.filter(
                                        (v) => v !== item.value,
                                      ),
                                    );
                                  } else {
                                    field.onChange([
                                      ...selectedValues,
                                      item.value,
                                    ]);
                                  }
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    isSelected ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {item.label}
                              </CommandItem>
                            );
                          },
                        )}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
      </div>
      <AnimatedButton
        className="bg-primary text-white justify-between w-full p-2.5! pl-5!"
        type="submit"
        trailingContent={
          <span
            className={`bg-white sm:size-12.75 size-10 overflow-hidden flex items-center rounded-[0.3125rem]`}
          >
            <div className="flex justify-around sm:min-w-25.5 min-w-20 -translate-x-1/2 transition-all group-hover:translate-x-0">
              <ArrowRight color="#3838F9" />
              <ArrowRight color="#3838F9" />
            </div>
          </span>
        }
      >
        {t("submit")}
      </AnimatedButton>
    </form>
  );
}
