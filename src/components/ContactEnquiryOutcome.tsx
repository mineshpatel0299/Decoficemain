import EnquiryOutcome from "./EnquiryOutcome";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MINIMUM_BUDGET_LABEL } from "@/lib/contact-enquiry";

export default function ContactEnquiryOutcome({ outcome }: { outcome: "success" | "rejected" }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative z-30 bg-black pb-8">
        <Navbar />
      </div>
      <EnquiryOutcome
        outcome={outcome}
        projectType="hospitality"
        minimumBudget={MINIMUM_BUDGET_LABEL}
        successFollowUp="Our team will review your hospitality project details and get in touch to discuss your vision. We look forward to working with you."
        returnHref="/"
        returnLabel={outcome === "rejected" ? "Return to Home" : "Back to Home"}
        rejectionContent={{
          heading: "Thank You for Your Enquiry",
          pill: "Beyond Our Current Scope",
          subtext: `We currently take hospitality projects with a minimum budget of ${MINIMUM_BUDGET_LABEL}. Your selected budget is below this threshold, so we are unable to proceed with your enquiry.`,
          body: "We focus on hospitality projects above our minimum budget. We appreciate your interest and would be glad to reconnect if your project budget changes.",
        }}
      />
      <Footer />
    </div>
  );
}
