import type { Metadata } from "next";
import ContactEnquiryOutcome from "@/components/ContactEnquiryOutcome";

export const metadata: Metadata = {
  title: "Discovery Call Enquiry Submitted | Decofice",
  description: "Your hospitality project enquiry has been submitted successfully.",
  robots: { index: false, follow: false },
};

export default function ContactSuccessPage() {
  return <ContactEnquiryOutcome outcome="success" />;
}
