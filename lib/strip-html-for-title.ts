/**
 * Strip HTML to plain text (no truncation). Use for reading-time estimates, subtitles, etc.
 */
export function stripHtmlToText(html: string | undefined | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    )
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Strip HTML from WordPress `title.rendered` (or similar) for safe use in `<title>`.
 */
export function stripHtmlForTitle(
  html: string | undefined | null,
  maxLen = 80,
): string {
  const text = stripHtmlToText(html);
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1)}…`;
}
