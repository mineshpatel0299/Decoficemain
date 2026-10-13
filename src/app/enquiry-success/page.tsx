import type { Metadata } from "next";
import ContactEnquiryOutcome from "@/components/ContactEnquiryOutcome";

export const metadata: Metadata = {
  title: "Resort Enquiry - Success | decofice",
  description: "Your hospitality project enquiry has been submitted successfully.",
  robots: { index: false, follow: false },
};

export default function ContactSuccessPage() {
  return <ContactEnquiryOutcome outcome="success" />;
}
