import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Decofice",
  description: "Tell us about your project and our team will get in touch to discuss your vision.",
};

export default function ContactUsPage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col justify-center bg-black">
      <ContactSection />
    </main>
  );
}
