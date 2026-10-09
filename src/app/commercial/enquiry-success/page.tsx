import type { Metadata } from "next";
import EnquiryOutcome from "@/components/commercial/EnquiryOutcome";

export const metadata: Metadata = {
  title: "Enquiry Submitted | Decofice Commercial",
  description: "Your commercial interiors enquiry has been submitted successfully.",
};

export default function EnquirySuccessPage() {
  return <EnquiryOutcome outcome="success" />;
}
