import { stripHtmlToText } from "@/lib/strip-html-for-title";

const WORDS_PER_MINUTE = 200;

/** Rough reading time from HTML body (WordPress post content). */
export function estimateReadingTimeMinutes(html: string): number {
  const plain = stripHtmlToText(html);
  const words = plain.split(/\s+/).filter(Boolean).length;
  if (words === 0) return 1;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
