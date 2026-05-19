import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getNavigation } from "@/lib/content";
import { siteMeta } from "@/lib/fallback-content";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoftComp Network of Excellence",
  description: siteMeta.description,
  openGraph: {
    title: "SoftComp Network of Excellence",
    description: siteMeta.description,
    url: "https://eu-softcomp.net/",
    siteName: "SoftComp",
    images: [siteMeta.logoUrl],
    locale: "en_GB",
    type: "website"
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const navigation = await getNavigation();

  return (
    <html lang="en-GB">
      <body>
        <SiteHeader navigation={navigation} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

