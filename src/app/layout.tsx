import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import Scripts from "@/components/scripts";
import ScrollToTop from "@/components/scrollToTop";
import { Toaster } from "@/components/ui/toaster";
import { validateEnvVars } from "@/lib/utils";
import getPublication from "@/server/get-publication";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import "./globals.css";
const Subscribe = dynamic(() => import("@/components/subscribe"), { ssr: false });

const isProd = process.env.NEXT_PUBLIC_MODE === "production";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const title = "Syed Muhammad Yaseen";
  const description = "Helping people Demystify Technology";

  const metadata: Metadata = {
    metadataBase: new URL(isProd ? "https://smy-smyaseens-projects.vercel.app" : "http://localhost:3000"),
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  validateEnvVars();
  const publication = await getPublication();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container flex min-h-screen flex-col pt-2 md:px-24">
          <Providers>
            <Scripts />
            <Header />
            <main className="flex-grow pb-4 pt-12">{children}</main>
            <div className="fixed z-50 bottom-10 right-10 flex flex-col gap-2">
              <Subscribe publication={publication} />
              <ScrollToTop />
            </div>
            <Footer />
          </Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
