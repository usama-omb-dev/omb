import * as z from "zod";

/**
 * Parses allowed Contact Form 7 post IDs (digits only).
 * CF7 REST: `/wp-json/contact-form-7/v1/contact-forms/{id}/feedback` — `{id}` must be numeric.
 *
 * Env:
 * - `CONTACT_FORM_7_ALLOWED_IDS` — comma-separated whitelist (required for any submission).
 * - `CONTACT_FORM_7_DEFAULT_ID` — used when the client omits `formId` (falls back to `CONTACT_FORM_7_ID`).
 */
export function getAllowedCf7FormIds(): string[] {
  if (process.env.CONTACT_FORM_7_ALLOWED_IDS?.trim()) {
    return process.env.CONTACT_FORM_7_ALLOWED_IDS.split(",")
      .map((s) => s.trim())
      .filter((s) => /^\d+$/.test(s));
  }
  const single =
    process.env.CONTACT_FORM_7_DEFAULT_ID?.trim() ||
    process.env.CONTACT_FORM_7_ID?.trim() ||
    "";
  return /^\d+$/.test(single) ? [single] : [];
}

export function getDefaultCf7FormId(allowed: Set<string>): string | null {
  const preferred =
    process.env.CONTACT_FORM_7_DEFAULT_ID?.trim() ||
    process.env.CONTACT_FORM_7_ID?.trim() ||
    "";
  if (/^\d+$/.test(preferred) && allowed.has(preferred)) {
    return preferred;
  }
  const first = [...allowed][0];
  return first ?? null;
}

/**
 * Resolves which CF7 form to post to. Rejects unknown IDs (not in whitelist).
 */
export function resolveContactForm7FormId(requested?: string): string | null {
  const allowedList = getAllowedCf7FormIds();
  const allowed = new Set(allowedList);
  if (allowed.size === 0) return null;

  const req = requested?.trim();
  if (req && /^\d+$/.test(req)) {
    if (!allowed.has(req)) return null;
    return req;
  }

  return getDefaultCf7FormId(allowed);
}

/** Max length for the message field (client + server + CF7). */
export const CONTACT_FORM_MESSAGE_MAX = 2000;

/** Free-text marketing budget (client + server + CF7). */
export const CONTACT_FORM_BUDGET_TEXT_MAX = 500;

/** Server-side validation (mirrors `Form.tsx` rules). */
export const contactFormPayloadSchema = z.object({
  userName: z.string().min(5).max(32),
  userPhone: z.string().min(1).regex(/^[0-9]{7,15}$/),
  userMessage: z.string().min(20).max(CONTACT_FORM_MESSAGE_MAX),
  userEmail: z.string().email(),
  userCompany: z.string().min(1).max(200),
  userMarketingBudget: z
    .string()
    .trim()
    .min(1)
    .max(CONTACT_FORM_BUDGET_TEXT_MAX),
  contactAgreement: z.literal(true),
  locale: z.enum(["en", "nl"]).optional(),
  /** Numeric WordPress CF7 post ID; must appear in `CONTACT_FORM_7_ALLOWED_IDS`. */
  formId: z.string().regex(/^\d+$/).optional(),
});

export type ContactFormPayload = z.infer<typeof contactFormPayloadSchema>;

type Cf7JsonResponse = {
  status?: string;
  message?: string;
  invalid_fields?: Array<{ field?: string; message?: string }>;
};

export function getContactForm7FeedbackUrl(formId: string): string | null {
  const origin =
    process.env.WORDPRESS_ORIGIN?.replace(/\/$/, "") ||
    "https://backend.onlinemarketingbakery.nl";
  if (!/^\d+$/.test(formId)) return null;
  return `${origin}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
}

/** `userName`, `userMessage` (and new `userCompany`, `userMarketingBudget`) must exist as field names in the WordPress CF7 form template. */
export function buildContactForm7FormData(
  data: ContactFormPayload,
  formId: string,
): FormData {
  const version = process.env.CONTACT_FORM_7_VERSION ?? "6.0";
  const unitTag = process.env.CONTACT_FORM_7_UNIT_TAG
    ? process.env.CONTACT_FORM_7_UNIT_TAG.replace(/\{id\}/g, formId)
    : `wpcf7-f${formId}-o1`;
  const locale =
    data.locale === "nl"
      ? (process.env.CONTACT_FORM_7_LOCALE_NL ?? "nl_NL")
      : (process.env.CONTACT_FORM_7_LOCALE_EN ?? "en_US");

  const fd = new FormData();
  fd.append("_wpcf7", formId);
  fd.append("_wpcf7_version", version);
  fd.append("_wpcf7_locale", locale);
  fd.append("_wpcf7_unit_tag", unitTag);
  fd.append("_wpcf7_container_post", "0");
  fd.append("_wpcf7_status", "init");

  fd.append("userName", data.userName);
  fd.append("userPhone", data.userPhone);
  fd.append("userMessage", data.userMessage);
  fd.append("userEmail", data.userEmail);
  fd.append("userCompany", data.userCompany);
  fd.append("userMarketingBudget", data.userMarketingBudget);
  fd.append("contactAgreement", "1");

  return fd;
}

export function parseCf7Response(json: unknown): Cf7JsonResponse {
  if (!json || typeof json !== "object") return {};
  return json as Cf7JsonResponse;
}

/**
 * Schedule call CF7 form — field names must match the CF7 template tags, e.g.
 * `[text* your-name]`, `[email* your-email]`, `[tel your-phone]`, `[text your-company]`.
 */
export const scheduleCallFormPayloadSchema = z.object({
  yourName: z.string().min(1).max(100),
  yourEmail: z.string().email(),
  /** Optional in CF7 unless you add `*` to the tel field in WordPress. */
  yourPhone: z
    .string()
    .refine(
      (s) => s.length === 0 || /^[0-9+()\-\s]{7,25}$/.test(s),
    )
    .refine((s) => s.length === 0 || s.trim().length >= 7),
  yourCompany: z.string().max(200).optional().default(""),
  locale: z.enum(["en", "nl"]).optional(),
});

export type ScheduleCallFormPayload = z.infer<typeof scheduleCallFormPayloadSchema>;

/**
 * Resolves the numeric CF7 post ID for the “Schedule call” form.
 * Set `CONTACT_FORM_7_SCHEDULE_ID` to that number (and include it in `CONTACT_FORM_7_ALLOWED_IDS`).
 * The value in the shortcode (`id="7b57eae"`) is not the REST id — use the `post=` number from the
 * WordPress edit-URL (e.g. `post.php?post=42&action=edit` → 42).
 */
export function getScheduleCallCf7FormId(): string | null {
  const raw = process.env.CONTACT_FORM_7_SCHEDULE_ID?.trim();
  if (!raw || !/^\d+$/.test(raw)) return null;
  const allowed = new Set(getAllowedCf7FormIds());
  if (allowed.size === 0) return null;
  return allowed.has(raw) ? raw : null;
}

export function buildScheduleCallForm7FormData(
  data: ScheduleCallFormPayload,
  formId: string,
): FormData {
  const version = process.env.CONTACT_FORM_7_VERSION ?? "6.0";
  const unitTag = process.env.CONTACT_FORM_7_SCHEDULE_UNIT_TAG
    ? process.env.CONTACT_FORM_7_SCHEDULE_UNIT_TAG.replace(/\{id\}/g, formId)
    : `wpcf7-f${formId}-o1`;
  const locale =
    data.locale === "nl"
      ? (process.env.CONTACT_FORM_7_LOCALE_NL ?? "nl_NL")
      : (process.env.CONTACT_FORM_7_LOCALE_EN ?? "en_US");

  const fd = new FormData();
  fd.append("_wpcf7", formId);
  fd.append("_wpcf7_version", version);
  fd.append("_wpcf7_locale", locale);
  fd.append("_wpcf7_unit_tag", unitTag);
  fd.append("_wpcf7_container_post", "0");
  fd.append("_wpcf7_status", "init");

  fd.append("your-name", data.yourName);
  fd.append("your-email", data.yourEmail);
  fd.append("your-phone", data.yourPhone ?? "");
  fd.append("your-company", data.yourCompany ?? "");

  return fd;
}
