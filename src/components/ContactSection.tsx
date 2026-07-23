"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type FormState = {
  fullName: string;
  mobile: string;
  email: string;
  company: string;
  location: string;
  projectType: string;
  serviceNeeded: string;
  landAcquired: string;
  plotArea: string;
  builtUpArea: string;
  budget: string;
  startTimeline: string;
  hearAboutUs: string;
  requirements: string;
};

const REQUIRED_FIELDS: (keyof FormState)[] = [
  "fullName",
  "mobile",
  "email",
  "location",
  "projectType",
  "serviceNeeded",
  "plotArea",
  "builtUpArea",
  "budget",
  "startTimeline",
];

const INITIAL_FORM: FormState = {
  fullName: "",
  mobile: "",
  email: "",
  company: "",
  location: "",
  projectType: "",
  serviceNeeded: "",
  landAcquired: "",
  plotArea: "",
  builtUpArea: "",
  budget: "",
  startTimeline: "",
  hearAboutUs: "",
  requirements: "",
};

const STEPS: { title: string; fields: (keyof FormState)[] }[] = [
  { title: "Contact Details", fields: ["fullName", "mobile", "email", "company"] },
  { title: "Project Details", fields: ["location", "projectType", "serviceNeeded", "landAcquired"] },
  { title: "Project Scope", fields: ["plotArea", "builtUpArea", "budget", "startTimeline"] },
  { title: "Final Touches", fields: ["hearAboutUs", "requirements"] },
];

const PROJECT_TYPES = [
  "Resorts",
  "Hotels",
  "Boutique Hotel",
  "Homestay",
  "Wellness Retreat",
  "Mixed-Use Hospitality Project",
  "Event & Wedding Venue",
  "Other",
];

const DESCRIBES_YOU_OPTIONS = [
  "Landowner",
  "Investor Group / Fund",
  "Business Expansion",
  "Hospitality Brand / Operator",
  "Family-Owned Business",
  "Government Body",
  "Other",
];

const SERVICE_OPTIONS = [
  "Turnkey: Design + Construction",
  "Design + Project Management",
  "Design Consultation Only",
  "Construction Only",
];

const LAND_ACQUIRED_OPTIONS = ["Yes", "No", "In the process of acquiring"];

const START_TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 2-3 Months",
  "Within 6 - 9 Months",
  "After 1Year/Not in near future",
];

const HEAR_ABOUT_US_OPTIONS = [
  "While Googling",
  "Facebook",
  "Instagram",
  "Our Ongoing Site",
  "Social Media Advertisements",
  "Billboards",
  "Referrals",
  "Others",
];

const BUDGET_OPTIONS = [
  "Under ₹1.5 Cr",
  "₹1.5 to ₹3 Cr",
  "₹3 - ₹5 Cr",
  "₹5 - ₹10 Cr",
  "₹10 - ₹20 Cr",
  "₹20 - ₹50 Cr",
  "Above 50 Cr.",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = Partial<Record<keyof FormState, string>>;

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={className}>
      <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-white/90 sm:mb-0.5">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-full border bg-white/[0.02] px-4 text-sm text-white placeholder:text-white/35 transition-colors focus:outline-none sm:h-6.5 sm:pl-3 sm:pr-5 sm:text-xs";

function fieldBorder(hasError?: string) {
  return hasError ? "border-rose-400/60 focus:border-rose-400" : "border-white/15 focus:border-emerald-600/60";
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const isLastStep = step === STEPS.length - 1;

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateFields = (fields: (keyof FormState)[]) => {
    const nextErrors: FormErrors = { ...errors };
    let ok = true;
    for (const field of fields) {
      if (REQUIRED_FIELDS.includes(field) && !form[field].trim()) {
        nextErrors[field] = "Required";
        ok = false;
      } else {
        delete nextErrors[field];
      }
      if (field === "email" && form.email.trim() && !EMAIL_RE.test(form.email.trim())) {
        nextErrors.email = "Enter a valid email";
        ok = false;
      }
    }
    setErrors(nextErrors);
    return ok;
  };

  const validate = () => validateFields(REQUIRED_FIELDS);

  const goNext = () => {
    if (validateFields(STEPS[step].fields)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setIsSubmitted(false);
    setSubmitError(null);
    setStep(0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black py-4">
      <div className="mx-auto max-w-295 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0B] shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:grid-cols-[518px_1fr] lg:gap-8.25 lg:p-4">
          {/* Left: image panel */}
          <div className="relative isolate hidden overflow-hidden lg:block lg:h-full lg:rounded-2xl">
            <Image src="/contact.png" alt="" fill priority sizes="40vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/0 to-black/20" />
            <div className="relative z-10 flex h-full flex-col justify-start p-9">
              <h2 className="font-opensans text-[48px] leading-[1.15] font-bold text-white">
                Let&apos;s Discuss <span className="font-serif font-bold text-white italic">Your</span>
                <br />
                Project
              </h2>
              <p className="mt-5 max-w-xs text-white/70">Let&apos;s Discuss Your Project</p>
            </div>
          </div>

          {/* Mobile compact banner: shrinks after step 1 on phones to keep every wizard step scroll-free */}
          <div className={`relative isolate overflow-hidden lg:hidden ${step === 0 ? "block h-36" : "hidden sm:block sm:h-36"}`}>
            <Image src="/contact.png" alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-black/20" />
            <div className="relative z-10 flex h-full flex-col justify-center p-6">
              <h2 className="font-opensans text-2xl leading-tight font-bold text-white">
                Let&apos;s Discuss <span className="font-serif font-bold text-white italic">Your</span> Project
              </h2>
            </div>
          </div>

          {/* Right: form panel */}
          <div className="flex flex-col p-6 sm:p-9 lg:p-0">
            {isSubmitted ? (
              <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-600/15 text-emerald-600">
                  <CheckIcon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-white">Query received</h3>
                <p className="max-w-sm text-white/60">
                  Thank you, {form.fullName || "there"}. Our team will review your project details and reach out shortly.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-white/90"
                  >
                    Submit Another Query
                  </button>
                  <Link
                    href="/"
                    className="rounded-full border border-white/20 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-3 border-b border-white/10 pb-3 text-center">
                  <h2 className="font-opensans text-[20px] font-bold text-white sm:text-2xl">Enter Your Details Here</h2>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-emerald-600 sm:hidden">
                    Step {step + 1} of {STEPS.length} · {STEPS[step].title}
                  </p>
                  <div className="mt-2.5 flex items-center justify-center gap-1.5 sm:hidden">
                    {STEPS.map((s, i) => (
                      <span
                        key={s.title}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === step ? "w-6 bg-emerald-600" : i < step ? "w-3 bg-emerald-600/50" : "w-3 bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-2.5">
                  <div className={`${step === 0 ? "grid" : "hidden"} grid-cols-1 gap-3.5 sm:grid sm:grid-cols-2 sm:gap-2.5`}>
                    <Field label="Full Name*" error={errors.fullName}>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Rohan Gupta"
                        className={`${inputClass} ${fieldBorder(errors.fullName)}`}
                      />
                    </Field>
                    <Field label="Mobile Number*" error={errors.mobile}>
                      <input
                        type="tel"
                        value={form.mobile}
                        onChange={(e) => updateField("mobile", e.target.value)}
                        placeholder="+91 123 4567 890"
                        className={`${inputClass} ${fieldBorder(errors.mobile)}`}
                      />
                    </Field>
                  </div>

                  <div className={`${step === 0 ? "grid" : "hidden"} grid-cols-1 gap-3.5 sm:grid sm:grid-cols-2 sm:gap-2.5`}>
                    <Field label="Email Address*" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="mail@gmail.com"
                        className={`${inputClass} ${fieldBorder(errors.email)}`}
                      />
                    </Field>
                    <Field label="Who best describes you?">
                      <div className="relative">
                        <select
                          value={form.company}
                          onChange={(e) => updateField("company", e.target.value)}
                          className={`${inputClass} ${fieldBorder()} appearance-none ${form.company ? "" : "text-white/35"}`}
                        >
                          <option value="" disabled>
                            Select the option that best describes you
                          </option>
                          {DESCRIBES_YOU_OPTIONS.map((option) => (
                            <option key={option} value={option} className="text-black">
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/50 sm:right-5" />
                      </div>
                    </Field>
                  </div>

                  <div className={`${step === 1 ? "flex" : "hidden"} flex-col gap-3.5 sm:flex sm:gap-2.5`}>
                    <Field label="Project Location*" error={errors.location}>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        placeholder="Dehradun, Uttrakhand"
                        className={`${inputClass} ${fieldBorder(errors.location)}`}
                      />
                    </Field>

                    <Field label="Project Type*" error={errors.projectType}>
                      <div className="relative">
                        <select
                          value={form.projectType}
                          onChange={(e) => updateField("projectType", e.target.value)}
                          className={`${inputClass} ${fieldBorder(errors.projectType)} appearance-none ${form.projectType ? "" : "text-white/35"}`}
                        >
                          <option value="" disabled>
                            Mention your Project Type
                          </option>
                          {PROJECT_TYPES.map((type) => (
                            <option key={type} value={type} className="text-black">
                              {type}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/50 sm:right-5" />
                      </div>
                    </Field>

                    <Field label="What specific service do you need from decofice?*" error={errors.serviceNeeded}>
                      <div className="relative">
                        <select
                          value={form.serviceNeeded}
                          onChange={(e) => updateField("serviceNeeded", e.target.value)}
                          className={`${inputClass} ${fieldBorder(errors.serviceNeeded)} appearance-none ${form.serviceNeeded ? "" : "text-white/35"}`}
                        >
                          <option value="" disabled>
                            Select the service needed
                          </option>
                          {SERVICE_OPTIONS.map((service) => (
                            <option key={service} value={service} className="text-black">
                              {service}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/50 sm:right-5" />
                      </div>
                    </Field>

                    <Field label="Have you already acquired the Land?">
                      <div className="relative">
                        <select
                          value={form.landAcquired}
                          onChange={(e) => updateField("landAcquired", e.target.value)}
                          className={`${inputClass} ${fieldBorder()} appearance-none ${form.landAcquired ? "" : "text-white/35"}`}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {LAND_ACQUIRED_OPTIONS.map((option) => (
                            <option key={option} value={option} className="text-black">
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/50 sm:right-5" />
                      </div>
                    </Field>
                  </div>

                  <div className={`${step === 2 ? "grid" : "hidden"} grid-cols-1 gap-3.5 sm:grid sm:grid-cols-2 sm:gap-2.5`}>
                    <Field label="Plot Area*" error={errors.plotArea}>
                      <input
                        type="text"
                        value={form.plotArea}
                        onChange={(e) => updateField("plotArea", e.target.value)}
                        placeholder="4 Acres"
                        className={`${inputClass} ${fieldBorder(errors.plotArea)}`}
                      />
                    </Field>
                    <Field label="Estimated Built-up area*" error={errors.builtUpArea}>
                      <input
                        type="text"
                        value={form.builtUpArea}
                        onChange={(e) => updateField("builtUpArea", e.target.value)}
                        placeholder="50000 sqft"
                        className={`${inputClass} ${fieldBorder(errors.builtUpArea)}`}
                      />
                    </Field>
                  </div>

                  <div className={`${step === 2 ? "grid" : "hidden"} grid-cols-1 gap-3.5 sm:grid sm:grid-cols-2 sm:gap-2.5`}>
                    <Field label="Estimated Budget*" error={errors.budget}>
                      <div className="relative">
                        <select
                          value={form.budget}
                          onChange={(e) => updateField("budget", e.target.value)}
                          className={`${inputClass} ${fieldBorder(errors.budget)} appearance-none ${form.budget ? "" : "text-white/35"}`}
                        >
                          <option value="" disabled>
                            ₹5 Cr
                          </option>
                          {BUDGET_OPTIONS.map((option) => (
                            <option key={option} value={option} className="text-black">
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/50 sm:right-5" />
                      </div>
                    </Field>
                    <Field label="How soon you want to start the project*" error={errors.startTimeline}>
                      <div className="relative">
                        <select
                          value={form.startTimeline}
                          onChange={(e) => updateField("startTimeline", e.target.value)}
                          className={`${inputClass} ${fieldBorder(errors.startTimeline)} appearance-none ${form.startTimeline ? "" : "text-white/35"}`}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {START_TIMELINE_OPTIONS.map((option) => (
                            <option key={option} value={option} className="text-black">
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/50 sm:right-5" />
                      </div>
                    </Field>
                  </div>

                  <div className={`${step === 3 ? "block" : "hidden"} sm:block`}>
                    <Field label="How did you know about us?">
                      <div className="relative">
                        <select
                          value={form.hearAboutUs}
                          onChange={(e) => updateField("hearAboutUs", e.target.value)}
                          className={`${inputClass} ${fieldBorder()} appearance-none ${form.hearAboutUs ? "" : "text-white/35"}`}
                        >
                          <option value="" disabled>
                            Select How you heard about us?
                          </option>
                          {HEAR_ABOUT_US_OPTIONS.map((option) => (
                            <option key={option} value={option} className="text-black">
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/50 sm:right-5" />
                      </div>
                    </Field>
                  </div>

                  <div className={`${step === 3 ? "block" : "hidden"} sm:block`}>
                    <Field label="What do you want us to know about your project?">
                      <div className="flex h-11 items-center rounded-3xl border border-white/15 bg-white/2 px-4 transition-colors focus-within:border-emerald-600/60 sm:h-6.5 sm:pl-3 sm:pr-5">
                        <textarea
                          rows={1}
                          value={form.requirements}
                          onChange={(e) => updateField("requirements", e.target.value)}
                          placeholder="Tell us more about your dream project!"
                          className="w-full resize-none bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none sm:text-xs"
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Mobile wizard nav: Back/Next walk through steps without the whole form ever needing to scroll */}
                  <div className="mt-2 flex items-center gap-3 sm:hidden">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="flex h-12 flex-1 items-center justify-center rounded-lg border border-white/20 font-opensans font-semibold text-white transition-colors hover:bg-white/10"
                      >
                        Back
                      </button>
                    )}
                    {isLastStep ? (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-lg bg-emerald-600 px-7 font-opensans font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? "Sending..." : "Submit Your Query"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={goNext}
                        className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-lg bg-emerald-600 px-7 font-opensans font-semibold text-white transition-colors hover:bg-emerald-500"
                      >
                        Next
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 hidden h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-emerald-600 px-7 py-3 font-opensans font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 sm:flex"
                  >
                    {isSubmitting ? "Sending..." : "Submit Your Query"}
                  </button>
                  {submitError && <p className="text-center text-sm text-rose-400">{submitError}</p>}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
