import EnquiryOutcome from "./EnquiryOutcome";
import { MINIMUM_BUDGET_LABEL } from "@/lib/contact-enquiry";

export default function ContactEnquiryOutcome({ outcome }: { outcome: "success" | "rejected" }) {
  return (
    <EnquiryOutcome
      outcome={outcome}
      projectType="hospitality"
      minimumBudget={MINIMUM_BUDGET_LABEL}
      successFollowUp="Our team will review your hospitality project details and get in touch to discuss your vision. We look forward to working with you."
      returnHref="/"
      returnLabel="Back to Home"
    />
  );
}
