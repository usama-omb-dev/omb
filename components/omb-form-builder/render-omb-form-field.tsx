import * as React from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  getFieldErrorDisplayName,
  getFieldLabelText,
  type CfbField,
} from "@/lib/omb-form-builder";

export type FormValue = string | string[];

export type OmbFormFieldRenderCtx = {
  values: Record<string, FormValue>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, FormValue>>>;
  fieldErrorId: string | null;
  t: (key: string, params?: Record<string, string>) => string;
  inputClass: string;
  labelClass: string;
  darkForm: boolean;
};

export function renderOmbFormField(
  f: CfbField,
  ctx: OmbFormFieldRenderCtx,
): React.ReactNode {
  const { values, setValues, fieldErrorId, t, inputClass, labelClass, darkForm } =
    ctx;
  const id = f.id || "";
  const type = f.type || "";
  const labelText = getFieldLabelText(f);
  const invalid = fieldErrorId === id;
  const ariaIfUnlabeled = !labelText
    ? getFieldErrorDisplayName(f) || t("ariaUnlabeledField")
    : undefined;

  if (type === "row_break" || type === "page_break") return null;

  if (type === "section") {
    const desc = f.section_desc ? String(f.section_desc) : "";
    if (!labelText && !desc) return null;
    return (
      <div className="pt-2">
        {labelText ? (
          <h3
            className={cn(
              "text-base font-semibold sm:text-lg",
              darkForm ? "text-black" : "text-white",
            )}
          >
            {labelText}
          </h3>
        ) : null}
        {desc ? (
          <p
            className={cn(
              "mt-1 text-xsm sm:text-body",
              darkForm ? "text-black/70" : "text-white/80",
            )}
          >
            {desc}
          </p>
        ) : null}
      </div>
    );
  }

  if (type === "html") {
    return (
      <div
        className={cn(
          "prose prose-sm max-w-none text-xsm sm:prose-base",
          darkForm ? "prose-neutral" : "prose-invert",
        )}
        dangerouslySetInnerHTML={{ __html: String(f.html ?? "") }}
      />
    );
  }

  const requiredMark = labelText && f.required ? " *" : "";

  if (type === "textarea") {
    return (
      <Field data-invalid={invalid}>
        {labelText ? (
          <FieldLabel className={labelClass} htmlFor={id}>
            {labelText}
            {requiredMark}
          </FieldLabel>
        ) : null}
        <Textarea
          id={id}
          value={String(values[id] ?? "")}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, [id]: e.target.value }))
          }
          placeholder={String(f.placeholder || "")}
          aria-label={ariaIfUnlabeled}
          aria-invalid={invalid}
          className={cn(inputClass, "min-h-28")}
        />
        {invalid ? (
          <FieldError errors={[{ message: t("validation.required") }]} />
        ) : null}
      </Field>
    );
  }

  if (type === "select") {
    const choices = Array.isArray(f.choices) ? f.choices : [];
    const multiple = Boolean(f.multiple);
    const multiVal = Array.isArray(values[id]) ? values[id] : [];
    const singleVal = String(values[id] ?? "");
    return (
      <Field data-invalid={invalid}>
        {labelText ? (
          <FieldLabel className={labelClass} htmlFor={id}>
            {labelText}
            {requiredMark}
          </FieldLabel>
        ) : null}
        <select
          id={id}
          multiple={multiple}
          aria-label={ariaIfUnlabeled}
          aria-invalid={invalid}
          className={cn(
            inputClass,
            multiple ? "min-h-24" : "min-h-12",
            "w-full px-3 py-2",
          )}
          value={multiple ? multiVal : singleVal}
          onChange={(e) => {
            if (multiple) {
              const selected = Array.from(e.target.selectedOptions).map(
                (o) => o.value,
              );
              setValues((prev) => ({ ...prev, [id]: selected }));
            } else {
              setValues((prev) => ({ ...prev, [id]: e.target.value }));
            }
          }}
        >
          {!multiple ? (
            <option value="">{String(f.placeholder || "Select…")}</option>
          ) : null}
          {choices.map((c, i) => (
            <option key={`${c.value}-${i}`} value={c.value ?? ""}>
              {c.label ?? c.value}
            </option>
          ))}
        </select>
        {invalid ? (
          <FieldError errors={[{ message: t("validation.required") }]} />
        ) : null}
      </Field>
    );
  }

  if (type === "radio") {
    const choices = Array.isArray(f.choices) ? f.choices : [];
    const cur = String(values[id] ?? "");
    return (
      <Field data-invalid={invalid}>
        {labelText ? (
          <span className={cn(labelClass, "mb-1 block font-medium")}>
            {labelText}
            {requiredMark}
          </span>
        ) : null}
        <div
          className="flex flex-col gap-2"
          role={labelText ? undefined : "group"}
          aria-label={ariaIfUnlabeled}
        >
          {choices.map((c, i) => (
            <label
              key={`${c.value}-${i}`}
              className={cn(
                "flex cursor-pointer items-center gap-2 text-xsm sm:text-body",
                darkForm ? "text-black" : "text-white",
              )}
            >
              <input
                type="radio"
                name={id}
                value={c.value ?? ""}
                checked={cur === (c.value ?? "")}
                onChange={() =>
                  setValues((prev) => ({
                    ...prev,
                    [id]: c.value ?? "",
                  }))
                }
                className="size-4 accent-primary"
              />
              {c.label ?? c.value}
            </label>
          ))}
        </div>
        {invalid ? (
          <FieldError errors={[{ message: t("validation.required") }]} />
        ) : null}
      </Field>
    );
  }

  if (type === "checkbox") {
    const choices = Array.isArray(f.choices) ? f.choices : [];
    return (
      <Field data-invalid={invalid}>
        {labelText ? (
          <span className={cn(labelClass, "mb-1 block font-medium")}>
            {labelText}
            {requiredMark}
          </span>
        ) : null}
        <div
          className="flex flex-col gap-2"
          role={labelText ? undefined : "group"}
          aria-label={ariaIfUnlabeled}
        >
          {choices.map((c, i) => {
            const val = c.value ?? "";
            return (
              <label
                key={`${val}-${i}`}
                className={cn(
                  "flex cursor-pointer items-center gap-2 text-xsm sm:text-body",
                  darkForm ? "text-black" : "text-white",
                )}
              >
                <Checkbox
                  checked={
                    Array.isArray(values[id]) ? values[id].includes(val) : false
                  }
                  onCheckedChange={(on) => {
                    setValues((prev) => {
                      const cur = Array.isArray(prev[id])
                        ? (prev[id] as string[])
                        : [];
                      if (on === true) {
                        return { ...prev, [id]: [...cur, val] };
                      }
                      return { ...prev, [id]: cur.filter((x) => x !== val) };
                    });
                  }}
                />
                {c.label ?? val}
              </label>
            );
          })}
        </div>
        {invalid ? (
          <FieldError errors={[{ message: t("validation.required") }]} />
        ) : null}
      </Field>
    );
  }

  if (type === "date_range") {
    const rangeBase =
      labelText ||
      getFieldErrorDisplayName(f) ||
      t("ariaUnlabeledField");
    const fromAria = `${rangeBase} (${t("ariaDateFrom")})`;
    const toAria = `${rangeBase} (${t("ariaDateTo")})`;
    return (
      <Field data-invalid={invalid}>
        {labelText ? (
          <span className={cn(labelClass, "mb-1 block font-medium")}>
            {labelText}
            {requiredMark}
          </span>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Input
            type="date"
            aria-label={fromAria}
            value={String(values[`${id}_from`] ?? "")}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                [`${id}_from`]: e.target.value,
              }))
            }
            className={inputClass}
          />
          <Input
            type="date"
            aria-label={toAria}
            value={String(values[`${id}_to`] ?? "")}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                [`${id}_to`]: e.target.value,
              }))
            }
            className={inputClass}
          />
        </div>
        {invalid ? (
          <FieldError errors={[{ message: t("validation.required") }]} />
        ) : null}
      </Field>
    );
  }

  if (type === "file") {
    return (
      <p
        className={cn(
          "text-xsm sm:text-body",
          darkForm ? "text-black/60" : "text-white/70",
        )}
      >
        {labelText ? `${labelText}: ` : ""}
        {t("fileUploadHeadlessNote")}
      </p>
    );
  }

  if (type === "calculation" || type === "merge_text") {
    return (
      <Field>
        {labelText ? (
          <FieldLabel className={labelClass} htmlFor={id}>
            {labelText}
          </FieldLabel>
        ) : null}
        <Input
          id={id}
          readOnly
          value={String(values[id] ?? "")}
          className={cn(inputClass, "opacity-90")}
          aria-label={ariaIfUnlabeled}
        />
      </Field>
    );
  }

  if (type === "hidden") {
    return (
      <input
        type="hidden"
        name={id}
        value={String(values[id] ?? "")}
        readOnly
      />
    );
  }

  const inputType =
    type === "email"
      ? "email"
      : type === "number"
        ? "number"
        : type === "date"
          ? "date"
          : type === "url"
            ? "url"
            : type === "phone"
              ? "tel"
              : "text";

  return (
    <Field data-invalid={invalid}>
      {labelText ? (
        <FieldLabel className={labelClass} htmlFor={id}>
          {labelText}
          {requiredMark}
        </FieldLabel>
      ) : null}
      <Input
        id={id}
        type={inputType}
        value={String(values[id] ?? "")}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, [id]: e.target.value }))
        }
        placeholder={String(f.placeholder || "")}
          aria-label={ariaIfUnlabeled}
        aria-invalid={invalid}
        className={inputClass}
      />
      {invalid ? (
        <FieldError errors={[{ message: t("validation.required") }]} />
      ) : null}
    </Field>
  );
}
