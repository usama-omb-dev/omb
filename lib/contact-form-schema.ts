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

/** Server-side validation (mirrors `Form.tsx` rules). */
export const contactFormPayloadSchema = z.object({
  userName: z.string().min(5).max(32),
  userPhone: z.string().min(1).regex(/^[0-9]{7,15}$/),
  userMessage: z.string().min(20).max(100),
  userEmail: z.string().email(),
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
  fd.append("contactAgreement", "1");

  return fd;
}

export function parseCf7Response(json: unknown): Cf7JsonResponse {
  if (!json || typeof json !== "object") return {};
  return json as Cf7JsonResponse;
}
