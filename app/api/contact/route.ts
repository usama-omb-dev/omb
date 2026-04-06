import { NextResponse } from "next/server";
import {
  buildContactForm7FormData,
  contactFormPayloadSchema,
  getContactForm7FeedbackUrl,
  parseCf7Response,
  resolveContactForm7FormId,
} from "@/lib/contact-form-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, {
      status: 400,
    });
  }

  const parsed = contactFormPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const formId = resolveContactForm7FormId(parsed.data.formId);
  if (!formId) {
    if (parsed.data.formId?.trim()) {
      return NextResponse.json(
        { ok: false, error: "invalid_form_id" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { ok: false, error: "contact_not_configured" },
      { status: 503 },
    );
  }

  const url = getContactForm7FeedbackUrl(formId);
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "contact_not_configured" },
      { status: 503 },
    );
  }

  const formData = buildContactForm7FormData(parsed.data, formId);

  const siteUrl = (() => {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return "";
  })();

  const forwardHeaders: HeadersInit = {
    "User-Agent": request.headers.get("user-agent") ?? "OMB-Contact-Proxy/1",
    Accept: "application/json",
  };

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip");
  if (clientIp) {
    (forwardHeaders as Record<string, string>)["X-Forwarded-For"] = clientIp;
  }

  if (siteUrl) {
    (forwardHeaders as Record<string, string>)["Referer"] = `${siteUrl}/`;
  }

  let cf7Res: Response;
  try {
    cf7Res = await fetch(url, {
      method: "POST",
      body: formData,
      headers: forwardHeaders,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream_unreachable" }, {
      status: 502,
    });
  }

  const text = await cf7Res.text();
  let json: unknown;
  try {
    json = JSON.parse(text) as unknown;
  } catch {
    return NextResponse.json(
      { ok: false, error: "upstream_invalid_response", status: cf7Res.status },
      { status: 502 },
    );
  }

  const cf7 = parseCf7Response(json);

  if (cf7Res.status === 415) {
    return NextResponse.json(
      { ok: false, error: "cf7_media_type", message: cf7.message },
      { status: 502 },
    );
  }

  if (cf7.status === "mail_sent") {
    return NextResponse.json({
      ok: true,
      message: cf7.message ?? "",
    });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "cf7_rejected",
      status: cf7.status ?? "unknown",
      message: cf7.message ?? "",
      invalid_fields: cf7.invalid_fields,
    },
    { status: 422 },
  );
}
