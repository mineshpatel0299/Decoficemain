import type { Metadata } from "next";
import CommercialPage from "@/components/CommercialPage";

export const metadata: Metadata = {
  title: "Commercial Interiors & Fit-Outs | Decofice",
  description:
    "Decofice designs and builds workplaces and stores. Design, 3D, construction, MEP, HVAC, structural and vastu consultancy with one team, under one contract.",
};

export default function Page() {
  return <CommercialPage />;
}
