import type { NextRequest } from "next/server";

/** Values some CDNs use when country is unknown — do not treat as a real ISO code. */
const UNKNOWN_COUNTRY_CODES = new Set(["XX", "T1"]);

function normalizeIsoCountry(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const t = raw.trim().toUpperCase();
  if (t.length < 2) return null;
  const code = t.slice(0, 2);
  if (!/^[A-Z]{2}$/.test(code)) return null;
  if (UNKNOWN_COUNTRY_CODES.has(code)) return null;
  return code;
}

/**
 * ISO 3166-1 alpha-2 country from trusted edge headers (Vercel, Cloudflare, or your Nginx).
 * Configure `NL_REDIRECT_COUNTRY_HEADER` on Ploi if your proxy uses a custom name.
 */
export function getIsoCountryFromRequest(request: NextRequest): string | null {
  const fromEnv = process.env.NL_REDIRECT_COUNTRY_HEADER?.trim();
  if (fromEnv) {
    return normalizeIsoCountry(request.headers.get(fromEnv));
  }

  const headerNames = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-country-code",
    "x-geo-country",
    "geoip-country-code",
  ] as const;

  for (const name of headerNames) {
    const code = normalizeIsoCountry(request.headers.get(name));
    if (code) return code;
  }

  return null;
}
