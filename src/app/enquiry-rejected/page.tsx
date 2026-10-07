import type { Metadata } from "next";
import EnquiryOutcome from "@/components/commercial/EnquiryOutcome";

export const metadata: Metadata = {
  title: "Commercial Enquiry | Decofice",
  description: "Information about Decofice's minimum commercial project budget.",
};

export default function EnquiryRejectedPage() {
  return <EnquiryOutcome outcome="rejected" />;
}
