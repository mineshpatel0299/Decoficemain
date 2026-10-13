"use client";

import { useSyncExternalStore } from "react";
import OutcomeLayout, { ENQUIRY_REJECTION_CONTENT } from "../EnquiryOutcome";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { MINIMUM_BUDGET_LABEL } from "@/lib/package-enquiry";

// Hostname stays fixed for the lifetime of this page; a host change reloads it.
const subscribe = () => () => {};
const getServerReturnHref = () => "https://commercial.decofice.com";

function getReturnHref() {
  const hostname = window.location.hostname;
  if (hostname === "commercial.decofice.com") return "/";
  if (hostname === "decofice.com" || hostname === "www.decofice.com") {
    return "https://commercial.decofice.com";
  }
  return "/commercial";
}

export default function EnquiryOutcome({ outcome }: { outcome: "success" | "rejected" }) {
  const returnHref = useSyncExternalStore(subscribe, getReturnHref, getServerReturnHref);

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative z-30 bg-[#0f0f0f] pb-4">
        <Navbar
          className="px-6 pt-4 lg:px-24"
          contactClassName="bg-[#eaeaea] text-[#0f0f0f] hover:bg-[#eaeaea]/90"
        />
      </div>
      <OutcomeLayout
        outcome={outcome}
        projectType="commercial"
        minimumBudget={MINIMUM_BUDGET_LABEL}
        successFollowUp="Our commercial design consultants are reviewing your workspace requirements and will reach out by phone or email within 24 business hours. We look forward to working with you."
        returnHref={returnHref}
        returnLabel={outcome === "rejected" ? "Return to Home" : "Go Back to Commercial Page"}
        rejectionContent={ENQUIRY_REJECTION_CONTENT}
      />
      <Footer />
    </div>
  );
}
