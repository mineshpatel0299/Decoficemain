"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MINIMUM_BUDGET_LABEL } from "@/lib/package-enquiry";

export default function EnquiryOutcome({ outcome }: { outcome: "success" | "rejected" }) {
  const isSuccess = outcome === "success";
  const [returnHref, setReturnHref] = useState("https://commercial.decofice.com");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hostname.startsWith("commercial.")) {
        setReturnHref("/");
      } else if (!window.location.hostname.includes("decofice.com")) {
        setReturnHref("/commercial");
      }
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fcfdfc] bg-[radial-gradient(#e8eee9_0.8px,transparent_0.8px)] [background-size:22px_22px] px-4 py-8 sm:px-8 sm:py-12">
      <section className="w-full max-w-[740px] rounded-[28px] bg-white px-6 py-12 text-center shadow-[0_24px_80px_rgba(26,61,43,0.08)] sm:rounded-[36px] sm:px-12 sm:py-16 lg:px-20 lg:py-[72px]">
        <div
          className={`mx-auto mb-6 flex size-20 items-center justify-center rounded-full border p-2 shadow-[0_4px_18px_rgba(18,89,62,0.08)] ${
            isSuccess
              ? "border-emerald-900/10 bg-[#f3f8f5]"
              : "border-red-700/10 bg-[#fff5f5] shadow-[0_4px_18px_rgba(190,46,46,0.1)]"
          }`}
        >
          <div className={`flex size-full items-center justify-center rounded-full text-white shadow-inner ${isSuccess ? "bg-[#155d43]" : "bg-[#e34338]"}`}>
            {isSuccess ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
                <path d="m5.5 12.5 4.2 4.2L18.5 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
                <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </div>

        <p className="font-manrope text-[11px] font-bold tracking-[0.3em] text-[#648775] uppercase sm:text-xs">
          {isSuccess ? "Submission successful" : "Lead status"}
        </p>
        <h1 className="mx-auto mt-5 max-w-[570px] font-opensans text-[34px] leading-[1.12] font-bold text-[#171717] sm:text-5xl">
          {isSuccess ? (
            <>
              Thank You For Your
              <span className="mt-1 block font-serif font-normal text-[#155d43] italic">Enquiry</span>
            </>
          ) : (
            <>
              Your Enquiry Has Been
              <span className="mt-1 block font-serif font-normal text-[#e34338] italic">Rejected</span>
            </>
          )}
        </h1>

        <div className="mt-8 rounded-2xl border border-[#e4eee8] bg-[#f8fbf9] px-5 py-6 sm:mt-10 sm:px-9 sm:py-8">
          <p className="font-opensans text-base leading-7 text-[#333] sm:text-lg">
            {isSuccess ? (
              "Thank you for submitting your commercial enquiry. Our team will get in touch with you shortly."
            ) : (
              <>
                We currently take commercial projects with a minimum budget of{" "}
                <span className="font-semibold text-[#b63842]">{MINIMUM_BUDGET_LABEL}</span>. Your selected budget is
                below this threshold, so we are unable to proceed with your enquiry.
              </>
            )}
          </p>
        </div>

        <p className="mx-auto mt-8 max-w-[500px] font-opensans text-sm leading-6 text-[#969696] sm:mt-10 sm:text-[15px] sm:leading-7">
          {isSuccess
            ? "Our commercial design consultants are reviewing your workspace requirements and will reach out by phone or email within 24 business hours. We look forward to working with you."
            : "We focus on commercial projects above our minimum budget. We appreciate your interest and would be glad to reconnect if your project budget changes."}
        </p>

        <Link
          href={returnHref}
          className="mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#155d43] px-8 py-4 font-opensans text-sm font-semibold text-white shadow-[0_10px_24px_rgba(21,93,67,0.2)] transition-colors hover:bg-[#104b36] sm:mt-11 sm:min-w-[272px] sm:text-base"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
            <path d="M19 12H5m0 0 6 6m-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Go Back to Commercial Page
        </Link>
      </section>
    </main>
  );
}
