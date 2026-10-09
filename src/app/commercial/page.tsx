import type { Metadata } from "next";
import CommercialPage from "@/components/CommercialPage";

export const metadata: Metadata = {
  metadataBase: new URL("https://commercial.decofice.com"),
  title: "Commercial Interiors & Fit-Outs | Decofice",
  description:
    "Decofice designs and builds workplaces and stores. Design, 3D, construction, MEP, HVAC, structural and vastu consultancy with one team, under one contract.",
  openGraph: {
    title: "Commercial Interiors & Fit-Outs | Decofice",
    description:
      "Decofice designs and builds workplaces and stores. Design, 3D, construction, MEP, HVAC, structural and vastu consultancy with one team, under one contract.",
    url: "https://commercial.decofice.com",
    siteName: "Decofice Commercial",
    images: [
      {
        url: "/commercial/og-image.jpg",
        width: 1024,
        height: 701,
        alt: "Decofice Commercial Interiors & Fit-Outs",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Interiors & Fit-Outs | Decofice",
    description:
      "Decofice designs and builds workplaces and stores. Design, 3D, construction, MEP, HVAC, structural and vastu consultancy with one team, under one contract.",
    images: ["/commercial/og-image.jpg"],
  },
};

export default function Page() {
  return <CommercialPage />;
}
