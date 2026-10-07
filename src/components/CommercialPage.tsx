"use client";

import { useState } from "react";
import CommercialHero from "./CommercialHero";
import ContactModal from "./ContactModal";
import PackageEnquiryForm from "./commercial/PackageEnquiryForm";
import Footer from "./Footer";
import BrandsMarquee from "./commercial/BrandsMarquee";
import WhatWeBuild from "./commercial/WhatWeBuild";
import WorkplacesDelivered from "./commercial/WorkplacesDelivered";
import OneTeam from "./commercial/OneTeam";
import FitOutPackages from "./commercial/FitOutPackages";
import WhyDecofice from "./commercial/WhyDecofice";
import ClientReviews from "./commercial/ClientReviews";
import CommercialFaq from "./commercial/CommercialFaq";

export default function CommercialPage() {
  const [packageEnquiry, setPackageEnquiry] = useState<{ packageName: string } | null>(null);
  const openPackageEnquiry = (packageName = "") => setPackageEnquiry({ packageName });
  const closePackageEnquiry = () => setPackageEnquiry(null);

  return (
    <main className="flex flex-1 flex-col bg-[#0f0f0f]">
      <CommercialHero onEnquire={() => openPackageEnquiry()} />
      <BrandsMarquee />
      <WhatWeBuild onEnquire={openPackageEnquiry} />
      <WorkplacesDelivered />
      <OneTeam />
      <FitOutPackages onEnquire={openPackageEnquiry} />
      <WhyDecofice />
      <ClientReviews />
      <CommercialFaq />
      <Footer />
      <ContactModal open={packageEnquiry !== null} onClose={closePackageEnquiry} label="Get a detailed quotation">
        <PackageEnquiryForm initialPackage={packageEnquiry?.packageName} onClose={closePackageEnquiry} />
      </ContactModal>
    </main>
  );
}
