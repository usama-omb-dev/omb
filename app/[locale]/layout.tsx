import type { Metadata } from "next";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Quicksand } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const quicksand = Quicksand({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default as {
    Metadata?: { title?: string; description?: string };
  };
  const siteTitle = messages.Metadata?.title ?? "OMB";
  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: messages.Metadata?.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={quicksand.variable}>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
