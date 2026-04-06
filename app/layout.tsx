import type { ReactNode } from "react";

/**
 * Root layout passes through to `[locale]` (see next-intl App Router setup).
 * `<html>` / `<body>` live in `app/[locale]/layout.tsx`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
