import AboutPage from "@/features/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMY - About",
  description: "The work, background and writing of Syed Muhammad Yaseen, Senior Software Engineer working on AI backends and scalable APIs.",
  openGraph: {
    title: "SMY - About",
    description: "The work, background and writing of Syed Muhammad Yaseen, Senior Software Engineer working on AI backends and scalable APIs.",
    url: "https://sm-y.dev/about",
    type: "website",
    images: [
      {
        url: "/profile-pic.png",
        width: 1200,
        height: 630,
        alt: "Syed Muhammad Yaseen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMY - About",
    description: "The work, background and writing of Syed Muhammad Yaseen, Senior Software Engineer working on AI backends and scalable APIs.",
    images: ["/profile-pic.png"],
  },
};

export default async function Home() {
  return <AboutPage />;
}
