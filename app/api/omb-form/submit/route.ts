import {
  getOmbFormSubmitSecret,
  getOmbFormSubmitUrl,
  isOmbFormIdAllowed,
} from "@/lib/omb-form-builder";
import { NextResponse } from "next/server";

type SubmitBody = {
  formId?: string;
  cfb?: Record<string, unknown>;
  cfb_visible_fields?: string[] | string;
  cfb_post_id?: number;
};

export async function POST(request: Request) {
  const secret = getOmbFormSubmitSecret();
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "submit_not_configured" },
      { status: 503 },
    );
  }

  let body: SubmitBody;
  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, {
      status: 400,
    });
  }

  const formId = body.formId?.trim();
  if (!formId || !/^\d+$/.test(formId)) {
    return NextResponse.json({ ok: false, error: "invalid_form_id" }, {
      status: 400,
    });
  }

  if (!isOmbFormIdAllowed(formId)) {
    return NextResponse.json({ ok: false, error: "form_not_allowed" }, {
      status: 403,
    });
  }

  const url = getOmbFormSubmitUrl(formId);
  if (!url) {
    return NextResponse.json({ ok: false, error: "invalid_form_id" }, {
      status: 400,
    });
  }

  const payload: Record<string, unknown> = {
    cfb: body.cfb && typeof body.cfb === "object" ? body.cfb : {},
  };
  if (body.cfb_visible_fields !== undefined) {
    payload.cfb_visible_fields = body.cfb_visible_fields;
  }
  if (body.cfb_post_id != null) {
    payload.cfb_post_id = body.cfb_post_id;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    return NextResponse.json(
      { ok: false, error: "upstream_invalid_json", message: text.slice(0, 200) },
      { status: 502 },
    );
  }

  const obj = json as {
    ok?: boolean;
    message?: string;
    redirect_url?: string;
    code?: string;
    data?: { status?: number; message?: string };
  };

  if (!res.ok) {
    const msg =
      obj?.message ||
      (typeof obj?.data?.message === "string" ? obj.data.message : undefined) ||
      "Submission failed";
    const statusFromBody =
      typeof obj?.data?.status === "number" ? obj.data.status : null;
    const status =
      statusFromBody && statusFromBody >= 400 && statusFromBody < 600
        ? statusFromBody
        : res.status >= 400 && res.status < 600
          ? res.status
          : 502;
    return NextResponse.json(
      { ok: false, error: "upstream_error", message: msg, code: obj?.code },
      { status },
    );
  }

  return NextResponse.json({
    ok: true,
    message: obj?.message,
    redirect_url: obj?.redirect_url,
  });
}
