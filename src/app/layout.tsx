import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import ScrollToTop from "@/components/scrollToTop";
import { Toaster } from "@/components/ui/sonner";
import { baseUrl, site } from "@/lib/site";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const title = site.displayTitle;
  const description = site.description;

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: title,
    },
  };

  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="container flex min-h-screen flex-col px-8 sm:px-24">
          <Providers>
            <Header />
            <main className="grow pb-10 pt-10">{children}</main>
            <div className="fixed z-50 bottom-10 right-10 flex flex-col gap-2">
              <ScrollToTop />
            </div>
            <Footer />
            <Toaster />
          </Providers>
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
