import {
  getOmbFormPublicJsonUrl,
  getOmbFormPublicJsonUrlBySlug,
  isOmbFormIdAllowed,
  isOmbFormSlugAllowed,
} from "@/lib/omb-form-builder";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();
  const slug = searchParams.get("slug")?.trim();

  let url: string | null = null;

  if (id && /^\d+$/.test(id)) {
    if (!isOmbFormIdAllowed(id)) {
      return NextResponse.json({ error: "form_not_allowed" }, { status: 403 });
    }
    url = getOmbFormPublicJsonUrl(id);
  } else if (slug) {
    if (!isOmbFormSlugAllowed(slug)) {
      return NextResponse.json({ error: "form_not_allowed" }, { status: 403 });
    }
    url = getOmbFormPublicJsonUrlBySlug(slug);
  } else {
    return NextResponse.json({ error: "missing_id_or_slug" }, { status: 400 });
  }

  if (!url) {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 });
  }

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    return NextResponse.json(
      { error: "upstream_error", status: res.status },
      { status: 502 },
    );
  }

  const json = await res.json();
  return NextResponse.json(json);
}
