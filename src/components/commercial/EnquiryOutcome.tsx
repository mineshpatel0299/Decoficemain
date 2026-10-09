"use client";

import { useSyncExternalStore } from "react";
import OutcomeLayout from "../EnquiryOutcome";
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
    <OutcomeLayout
      outcome={outcome}
      projectType="commercial"
      minimumBudget={MINIMUM_BUDGET_LABEL}
      successFollowUp="Our commercial design consultants are reviewing your workspace requirements and will reach out by phone or email within 24 business hours. We look forward to working with you."
      returnHref={returnHref}
      returnLabel="Go Back to Commercial Page"
    />
  );
}
