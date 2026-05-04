/**
 * Headless OMB Forms (WordPress plugin `wordpress/omb-form-builder`).
 *
 * WordPress exposes:
 * - GET  `{WORDPRESS_ORIGIN}/wp-json/custom-form-builder/v1/public/forms/{id}`
 * - GET  `{WORDPRESS_ORIGIN}/wp-json/custom-form-builder/v1/public/forms/by-slug/{slug}`
 * - POST `{WORDPRESS_ORIGIN}/wp-json/custom-form-builder/v1/public/forms/{id}/submit` (Bearer secret)
 *
 * Optional on WordPress (`wp-config.php`):
 * - `define( 'CFB_HEADLESS_SUBMIT_SECRET', '...' );` — required for submit
 * - `define( 'CFB_HEADLESS_PUBLIC_FORM_IDS', '12,34' );` — limit which forms are public
 */

export type CfbFieldChoice = { value?: string; label?: string };

export type CfbFormLayoutRow = {
  columns: number;
  fields: CfbField[];
};

export type CfbField = {
  id?: string;
  type?: string;
  label?: string;
  name?: string;
  /** For `row_break`: 1–12 columns for the row that follows (WordPress builder default 2). */
  columns?: number;
  required?: boolean;
  placeholder?: string;
  default_value?: string;
  choices?: CfbFieldChoice[];
  multiple?: boolean;
  section_title?: string;
  section_desc?: string;
  template?: string;
  accept?: string;
  depends_on?: string;
  depends_on_values?: string;
  choices_source?: string;
  [key: string]: unknown;
};

/** Visible label from WordPress only (no fallback to field id). */
export function getFieldLabelText(f: CfbField): string {
  const type = f.type || "";
  if (type === "section") {
    return String(f.section_title ?? "").trim();
  }
  return String(f.label ?? "").trim();
}

/** For error toasts: label, else placeholder, else empty (caller uses generic copy). */
export function getFieldErrorDisplayName(f: CfbField): string {
  const lb = getFieldLabelText(f);
  if (lb) return lb;
  return String(f.placeholder ?? "").trim();
}

export type CfbPublicFormSettings = {
  submit_button_text?: string;
  success_message?: string;
  redirect_url?: string;
  redirect_after_submit?: string;
  step_titles?: string[];
  default_row_columns?: number;
  custom_css?: string;
};

export type CfbPublicFormPayload = {
  id: number;
  title: string;
  slug: string;
  fields: CfbField[];
  settings: CfbPublicFormSettings;
};

export function getWordPressOrigin(): string {
  return (
    process.env.WORDPRESS_ORIGIN?.replace(/\/$/, "") ||
    "https://backend.onlinemarketingbakery.nl"
  );
}

function addNumericId(out: Set<string>, value: string | undefined) {
  const v = value?.trim();
  if (v && /^\d+$/.test(v)) out.add(v);
}

/**
 * All numeric form IDs the app may fetch or submit.
 * Unions `OMB_FORM_BUILDER_ALLOWED_IDS` with every `*_FORM_ID` env so sidebar/contact
 * forms do not need to be listed twice.
 */
export function getAllowedOmbFormIds(): Set<string> {
  const out = new Set<string>();
  const raw = process.env.OMB_FORM_BUILDER_ALLOWED_IDS?.trim();
  if (raw) {
    for (const s of raw.split(",")) {
      addNumericId(out, s);
    }
  }
  addNumericId(out, process.env.OMB_FORM_BUILDER_DEFAULT_ID);
  addNumericId(out, process.env.OMB_FORM_BUILDER_CONTACT_FORM_ID);
  addNumericId(out, process.env.OMB_FORM_BUILDER_SIDEBAR_FORM_ID);
  addNumericId(out, process.env.OMB_FORM_BUILDER_BLOG_SIDEBAR_FORM_ID);
  addNumericId(out, process.env.OMB_FORM_BUILDER_CASE_STUDY_SIDEBAR_FORM_ID);
  return out;
}

function addSlug(out: Set<string>, value: string | undefined) {
  const s = value?.trim().toLowerCase();
  if (s) out.add(s);
}

/** Slugs allowed for `?slug=` loads (plus contact/sidebar slug envs). */
export function getAllowedOmbFormSlugs(): Set<string> {
  const out = new Set<string>();
  const raw = process.env.OMB_FORM_BUILDER_ALLOWED_SLUGS?.trim();
  if (raw) {
    for (const s of raw.split(",")) {
      addSlug(out, s);
    }
  }
  addSlug(out, process.env.OMB_FORM_BUILDER_CONTACT_FORM_SLUG);
  addSlug(out, process.env.OMB_FORM_BUILDER_SIDEBAR_FORM_SLUG);
  addSlug(out, process.env.OMB_FORM_BUILDER_BLOG_SIDEBAR_FORM_SLUG);
  addSlug(out, process.env.OMB_FORM_BUILDER_CASE_STUDY_SIDEBAR_FORM_SLUG);
  return out;
}

export function isOmbFormIdAllowed(id: string): boolean {
  const allowed = getAllowedOmbFormIds();
  if (allowed.size === 0) return false;
  return allowed.has(id);
}

export function isOmbFormSlugAllowed(slug: string): boolean {
  const allowed = getAllowedOmbFormSlugs();
  if (allowed.size === 0) return false;
  return allowed.has(slug.trim().toLowerCase());
}

export function getOmbFormPublicJsonUrl(id: string): string | null {
  if (!/^\d+$/.test(id)) return null;
  return `${getWordPressOrigin()}/wp-json/custom-form-builder/v1/public/forms/${id}`;
}

export function getOmbFormPublicJsonUrlBySlug(slug: string): string | null {
  const s = slug.trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(s)) return null;
  return `${getWordPressOrigin()}/wp-json/custom-form-builder/v1/public/forms/by-slug/${encodeURIComponent(s)}`;
}

export function getOmbFormSubmitUrl(id: string): string | null {
  if (!/^\d+$/.test(id)) return null;
  return `${getWordPressOrigin()}/wp-json/custom-form-builder/v1/public/forms/${id}/submit`;
}

export function getOmbFormSubmitSecret(): string {
  return process.env.OMB_FORM_BUILDER_SUBMIT_SECRET?.trim() || "";
}

export function flattenCfbFields(fields: unknown[]): CfbField[] {
  const out: CfbField[] = [];
  if (!Array.isArray(fields)) return out;
  for (const field of fields) {
    if (!field || typeof field !== "object") continue;
    const f = field as CfbField;
    const type = f.type || "";
    if (type === "page_break") continue;
    if (type === "group") {
      const inner = (f as { fields?: unknown[] }).fields;
      out.push(...flattenCfbFields(Array.isArray(inner) ? inner : []));
      continue;
    }
    out.push(f);
  }
  return out;
}

const INPUT_TYPES = new Set([
  "text",
  "textarea",
  "email",
  "phone",
  "url",
  "number",
  "date",
  "date_range",
  "select",
  "radio",
  "checkbox",
  "hidden",
  "file",
  "calculation",
  "merge_text",
]);

/** Field ids sent as `cfb_visible_fields` (matches WordPress dependency checks). */
export function getVisibleCfbFieldIds(flat: CfbField[]): string[] {
  const ids: string[] = [];
  for (const f of flat) {
    const id = f.id;
    const type = f.type || "";
    if (!id || !INPUT_TYPES.has(type)) continue;
    if (type === "file") continue;
    ids.push(id);
  }
  return ids;
}

/**
 * Split flat fields into rows the same way as WordPress `CFB_Frontend::get_step_rows`
 * (see `class-cfb-frontend.php`): a `row_break` with N columns wraps only the next N
 * non–row_break fields; remaining fields use full width until the next row_break.
 */
export function buildFormLayoutRows(
  stepFields: CfbField[],
  defaultRowColumns?: number,
): CfbFormLayoutRow[] {
  const defaultColumns = Math.max(
    1,
    Math.min(12, Math.floor(Number(defaultRowColumns) || 1)),
  );
  const rows: CfbFormLayoutRow[] = [];
  let current: CfbField[] = [];
  let nextColumns = defaultColumns;
  const list = [...stepFields];
  const n = list.length;

  for (let i = 0; i < n; i++) {
    const field = list[i];
    const type = field.type || "";

    if (type === "row_break") {
      if (current.length > 0) {
        rows.push({ columns: nextColumns, fields: [...current] });
        current = [];
      }
      const colsRaw = field.columns;
      const cols =
        colsRaw !== undefined && colsRaw !== null && String(colsRaw) !== ""
          ? Math.max(1, Math.min(12, Math.floor(Number(colsRaw))))
          : 1;
      let take = 0;
      for (let j = i + 1; j < n && take < cols; j++) {
        const ft = list[j].type || "";
        if (ft === "row_break") break;
        take++;
      }
      const rowFields = list.slice(i + 1, i + 1 + take);
      rows.push({ columns: cols, fields: rowFields });
      i += take;
      nextColumns = 1;
      current = [];
      continue;
    }

    current.push(field);
  }

  if (current.length > 0) {
    rows.push({ columns: nextColumns, fields: current });
  }

  return rows;
}

export type SidebarOmbFormContext = "blog" | "case-study";

/**
 * Sidebar “Plan a call” widget: optional OMB form instead of CF7 `ScheduleCallForm`.
 *
 * Env (all optional):
 * - `OMB_FORM_BUILDER_SIDEBAR_FORM_ID` / `OMB_FORM_BUILDER_SIDEBAR_FORM_SLUG` — default for both blog and case study
 * - `OMB_FORM_BUILDER_BLOG_SIDEBAR_FORM_ID` / `_SLUG` — overrides for blog single only
 * - `OMB_FORM_BUILDER_CASE_STUDY_SIDEBAR_FORM_ID` / `_SLUG` — overrides for case study single only
 *
 * Each used ID must be in `OMB_FORM_BUILDER_ALLOWED_IDS`; each slug in `OMB_FORM_BUILDER_ALLOWED_SLUGS`.
 */
export function getSidebarOmbFormProps(
  context: SidebarOmbFormContext,
): { formId: string } | { formSlug: string } | null {
  const sharedId = process.env.OMB_FORM_BUILDER_SIDEBAR_FORM_ID?.trim();
  const sharedSlug = process.env.OMB_FORM_BUILDER_SIDEBAR_FORM_SLUG?.trim();
  const blogId = process.env.OMB_FORM_BUILDER_BLOG_SIDEBAR_FORM_ID?.trim();
  const blogSlug = process.env.OMB_FORM_BUILDER_BLOG_SIDEBAR_FORM_SLUG?.trim();
  const caseId = process.env.OMB_FORM_BUILDER_CASE_STUDY_SIDEBAR_FORM_ID?.trim();
  const caseSlug =
    process.env.OMB_FORM_BUILDER_CASE_STUDY_SIDEBAR_FORM_SLUG?.trim();

  function pick(
    id: string | undefined,
    slug: string | undefined,
  ): { formId: string } | { formSlug: string } | null {
    if (id && /^\d+$/.test(id)) return { formId: id };
    if (slug) return { formSlug: slug };
    return null;
  }

  if (context === "blog") {
    return pick(blogId, blogSlug) ?? pick(sharedId, sharedSlug);
  }
  return pick(caseId, caseSlug) ?? pick(sharedId, sharedSlug);
}
