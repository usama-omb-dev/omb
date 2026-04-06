/**
 * Social profile URLs from `next.config.ts` → `env` (`NEXT_PUBLIC_SOCIAL_*`).
 * Client- and server-safe (inlined at build).
 */
export const envSocialUrls = {
  facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM?.trim() ?? "",
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN?.trim() ?? "",
  /** Rubin’s LinkedIn (contact page, blog sidebar). Falls back to `linkedin` if unset. */
  linkedinRubin:
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_RUBIN?.trim() ??
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN?.trim() ??
    "",
} as const;

export function socialHref(url: string): {
  href: string;
  target?: string;
  rel?: string;
} {
  const h = url.trim() || "#";
  if (/^https?:\/\//i.test(h)) {
    return { href: h, target: "_blank", rel: "noopener noreferrer" };
  }
  return { href: h };
}
