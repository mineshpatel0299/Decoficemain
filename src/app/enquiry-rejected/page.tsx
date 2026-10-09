import type { Metadata } from "next";
import ContactEnquiryOutcome from "@/components/ContactEnquiryOutcome";

export const metadata: Metadata = {
  title: "Discovery Call Enquiry | Decofice",
  description: "Information about Decofice’s minimum hospitality project budget.",
  robots: { index: false, follow: false },
};

export default function ContactRejectedPage() {
  return <ContactEnquiryOutcome outcome="rejected" />;
}
