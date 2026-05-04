"use client";

import * as React from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import { cn } from "@/lib/utils";
import {
  buildFormLayoutRows,
  flattenCfbFields,
  getFieldErrorDisplayName,
  getVisibleCfbFieldIds,
  type CfbField,
  type CfbPublicFormPayload,
} from "@/lib/omb-form-builder";
import {
  renderOmbFormField,
  type OmbFormFieldRenderCtx,
} from "@/components/omb-form-builder/render-omb-form-field";

type FormValue = string | string[];

function buildInitialValues(flat: CfbField[]): Record<string, FormValue> {
  const v: Record<string, FormValue> = {};
  for (const f of flat) {
    const id = f.id;
    const type = f.type || "";
    if (!id) continue;
    if (
      type === "row_break" ||
      type === "page_break" ||
      type === "section" ||
      type === "html"
    ) {
      continue;
    }
    if (type === "date_range") {
      v[`${id}_from`] = "";
      v[`${id}_to`] = "";
      continue;
    }
    if (type === "checkbox") {
      v[id] = [];
      continue;
    }
    if (type === "select" && f.multiple) {
      v[id] = [];
      continue;
    }
    if (type === "calculation" || type === "merge_text") {
      v[id] = String(f.default_value ?? "");
      continue;
    }
    v[id] = String(f.default_value ?? "");
  }
  return v;
}

function validateRequired(
  flat: CfbField[],
  values: Record<string, FormValue>,
): string | null {
  for (const f of flat) {
    if (!f.required) continue;
    const id = f.id;
    const type = f.type || "";
    if (!id) continue;
    if (
      type === "file" ||
      type === "section" ||
      type === "html" ||
      type === "row_break"
    ) {
      continue;
    }
    if (type === "date_range") {
      const a = String(values[`${id}_from`] ?? "").trim();
      const b = String(values[`${id}_to`] ?? "").trim();
      if (!a || !b) return id;
      continue;
    }
    if (type === "checkbox" || (type === "select" && f.multiple)) {
      const arr = values[id];
      if (!Array.isArray(arr) || arr.length === 0) return id;
      continue;
    }
    const s = String(values[id] ?? "").trim();
    if (!s) return id;
  }
  return null;
}

function buildCfbPayload(
  flat: CfbField[],
  values: Record<string, FormValue>,
): Record<string, unknown> {
  const cfb: Record<string, unknown> = {};
  for (const f of flat) {
    const id = f.id;
    const type = f.type || "";
    if (!id) continue;
    if (
      type === "section" ||
      type === "html" ||
      type === "row_break" ||
      type === "page_break"
    ) {
      continue;
    }
    if (type === "date_range") {
      cfb[`${id}_from`] = String(values[`${id}_from`] ?? "");
      cfb[`${id}_to`] = String(values[`${id}_to`] ?? "");
      continue;
    }
    if (type === "file") continue;
    const val = values[id];
    if (val === undefined) continue;
    cfb[id] = val;
  }
  return cfb;
}

export function OmbFormBuilderForm({
  darkForm = false,
  formId,
  formSlug,
  className,
}: {
  darkForm?: boolean;
  /** Numeric WordPress `cfb_form` post ID (must be allowed in `OMB_FORM_BUILDER_ALLOWED_IDS`). */
  formId?: string;
  /** Published form slug (must appear in `OMB_FORM_BUILDER_ALLOWED_SLUGS`). */
  formSlug?: string;
  /** Merged onto the root `<form>` (e.g. sidebar spacing). */
  className?: string;
}) {
  const t = useTranslations("Form");
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [config, setConfig] = React.useState<CfbPublicFormPayload | null>(null);
  const [values, setValues] = React.useState<Record<string, FormValue>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [fieldErrorId, setFieldErrorId] = React.useState<string | null>(null);

  const resolvedId = config?.id != null ? String(config.id) : null;

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setLoadError(null);
      const q = formId?.trim()
        ? `id=${encodeURIComponent(formId.trim())}`
        : formSlug?.trim()
          ? `slug=${encodeURIComponent(formSlug.trim())}`
          : "";
      if (!q) {
        setLoadError("missing_form_ref");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/omb-form?${q}`);
        const data = (await res.json()) as CfbPublicFormPayload & {
          error?: string;
        };
        if (cancelled) return;
        if (!res.ok) {
          setLoadError(data.error || "load_failed");
          setConfig(null);
          return;
        }
        setConfig(data);
        const flat = flattenCfbFields(data.fields || []);
        setValues(buildInitialValues(flat));
      } catch {
        if (!cancelled) setLoadError("load_failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [formId, formSlug]);

  const flat = React.useMemo(
    () => flattenCfbFields(config?.fields || []),
    [config],
  );

  const layoutRows = React.useMemo(
    () =>
      buildFormLayoutRows(
        flat,
        config?.settings?.default_row_columns as number | undefined,
      ),
    [flat, config?.settings?.default_row_columns],
  );

  const inputClass = cn(
    "rounded-[6px] text-xsm! ring-0! sm:min-h-15.25 sm:rounded-[8px] sm:text-body!",
    "placeholder:text-zinc-500!",
    darkForm
      ? "border border-zinc-200 bg-zinc-100 text-black shadow-none"
      : "border-0! bg-white/10 text-white shadow-none placeholder:text-[#AAACA6]!",
  );

  const labelClass = cn(
    darkForm ? "text-black" : "text-white",
    "sm:text-body! text-xsm!",
  );

  const submitLabel =
    config?.settings?.submit_button_text?.trim() || t("submit");

  const fieldCtx = React.useMemo<OmbFormFieldRenderCtx>(
    () => ({
      values,
      setValues,
      fieldErrorId,
      t: t as OmbFormFieldRenderCtx["t"],
      inputClass,
      labelClass,
      darkForm,
    }),
    [values, fieldErrorId, t, inputClass, labelClass, darkForm],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrorId(null);
    if (!resolvedId) return;

    const missingId = validateRequired(flat, values);
    if (missingId) {
      setFieldErrorId(missingId);
      return;
    }

    setSubmitting(true);
    try {
      const cfb = buildCfbPayload(flat, values);
      const res = await fetch("/api/omb-form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: resolvedId,
          cfb,
          cfb_visible_fields: getVisibleCfbFieldIds(flat),
        }),
      });
      const payload = (await res.json()) as {
        ok?: boolean;
        message?: string;
        redirect_url?: string;
        error?: string;
      };

      if (res.status === 503 && payload.error === "submit_not_configured") {
        toast.error(t("submitErrorConfig"));
        return;
      }
      if (!res.ok || !payload.ok) {
        toast.error(t("submitError"), {
          description: payload.message,
          position: "bottom-right",
        });
        return;
      }
      toast.success(t("submitSuccess"), {
        description: payload.message,
        position: "bottom-right",
      });
      setValues(buildInitialValues(flat));
      if (payload.redirect_url) {
        window.location.href = payload.redirect_url;
      }
    } catch {
      toast.error(t("submitError"), { position: "bottom-right" });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <p className={cn("text-xsm sm:text-body", darkForm ? "text-black/70" : "text-white/80")}>
        …
      </p>
    );
  }

  if (loadError || !config) {
    return (
      <p className="text-xsm text-red-600 sm:text-body" role="alert">
        {loadError === "form_not_allowed"
          ? "Form is not allowed on this site."
          : "Could not load form."}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col xl:gap-6 sm:gap-4 gap-2", className)}
    >
      {fieldErrorId ? (
        <p className="text-xsm text-red-600 sm:text-body" role="alert">
          {(() => {
            const errField = flat.find((x) => x.id === fieldErrorId);
            const name = errField ? getFieldErrorDisplayName(errField) : "";
            return name
              ? t("validation.fillRequired", { field: name })
              : t("validation.completeRequired");
          })()}
        </p>
      ) : null}

      {layoutRows.map((row, ri) => {
        if (row.fields.length === 0) return null;
        return (
          <div
            key={`omb-row-${ri}-${row.columns}`}
            className="omb-form-layout-row mb-4 last:mb-0"
            data-layout-cols={row.columns}
            style={
              {
                "--omb-layout-cols": String(row.columns),
              } as React.CSSProperties
            }
          >
            {row.fields.map((f) => {
              const type = f.type || "";
              const fullSpan =
                row.columns > 1 && (type === "section" || type === "html");
              const node = renderOmbFormField(f, fieldCtx);
              if (node == null) return null;
              return (
                <div
                  key={f.id || `${ri}-${type}-${String(f.label)}`}
                  className={cn("min-w-0", fullSpan && "col-span-full")}
                >
                  {node}
                </div>
              );
            })}
          </div>
        );
      })}

      <AnimatedButton
        type="submit"
        disabled={submitting}
        className="mt-2 self-start"
        variant={darkForm ? "secondary" : "default"}
        size="icon"
        trailingContent={<AnimatedArrowIcon />}
      >
        {submitting ? "…" : submitLabel}
      </AnimatedButton>
    </form>
  );
}
