import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /** Inlined at build time (same as `env` in older Next docs). Adjust CF7 IDs here when you add forms. */
  env: {
    NEXT_PUBLIC_SITE_URL: "https://omb-psi.vercel.app",
    CONTACT_FORM_7_ALLOWED_IDS: "177",
    CONTACT_FORM_7_DEFAULT_ID: "177",
    NEXT_PUBLIC_SOCIAL_FACEBOOK: "https://www.facebook.com/Onlinemarketingbakery/",
    NEXT_PUBLIC_SOCIAL_INSTAGRAM: "https://www.instagram.com/onlinemarketingbakery/",
    NEXT_PUBLIC_SOCIAL_LINKEDIN: "https://nl.linkedin.com/company/online-marketing-bakery",
    NEXT_PUBLIC_SOCIAL_LINKEDIN_RUBIN:
      "https://www.linkedin.com/in/rubinkoot",
  },
  images: {
    /** In dev, avoid long-lived `/_next/image` cache so replaced files in `/public` show up after refresh. */
    ...(process.env.NODE_ENV === "development"
      ? { minimumCacheTTL: 0 }
      : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.onlinemarketingbakery.nl",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
