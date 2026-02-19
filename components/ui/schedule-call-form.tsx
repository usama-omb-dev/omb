"use client";

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

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number is required")
    .regex(/^[0-9+()\-\s]{7,20}$/, "Enter a valid phone number"),
  interest: z.array(z.string()).min(1, "Please select at least one option"),
});

export function ScheduleCallForm() {
  const { data: services, isLoading } = useServices();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Form submitted successfully!", {
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
    : services.map((item: any) => {
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
        Schedule a call
      </h5>
      <div className="flex flex-col gap-2.5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-0! " data-invalid={fieldState.invalid}>
              <Input
                {...field}
                placeholder="Name"
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
                placeholder="Email"
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
                placeholder="Phone number"
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
                        ? `${selectedValues.length} selected`
                        : "I am interested in..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search interest..." />
                      <CommandEmpty>No interest found.</CommandEmpty>

                      <CommandGroup>
                        {interests.map((item: any) => {
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
                        })}
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
        Let’s talk!
      </AnimatedButton>
    </form>
  );
}
