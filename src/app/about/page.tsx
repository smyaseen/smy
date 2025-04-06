import AboutPage from "@/features/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMY - About",
  description: "Explore the professional journey, academic achievements, publications, and interests of Syed Muhammad Yaseen.",
  openGraph: {
    title: "SMY - About",
    description: "Explore the professional journey, academic achievements, publications, and interests of Syed Muhammad Yaseen.",
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
    description: "Explore the professional journey, academic achievements, publications, and interests of Syed Muhammad Yaseen.",
    images: ["/profile-pic.png"],
  },
};

export default async function Home() {
  return <AboutPage />;
}
