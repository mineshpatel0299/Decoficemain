"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BUDGET_OPTIONS, isBudgetEligible, MINIMUM_BUDGET_LABEL, PACKAGE_PRICE_RANGES } from "@/lib/package-enquiry";

type FormState = {
  fullName: string;
  mobile: string;
  email: string;
  builtUpArea: string;
  location: string;
  scope: string;
  startTimeline: string;
  property: string;
  packageName: string;
  budget: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export const PACKAGE_OPTIONS = [
  { value: "Basic", label: "Basic · ₹1,600 – ₹1,800 per sq ft" },
  { value: "Enhanced", label: "Enhanced · ₹1,900 – ₹2,200 per sq ft" },
  { value: "Professional", label: "Professional · ₹2,500+ per sq ft" },
  { value: "Premium", label: "Premium · ₹3,000+ per sq ft" },
  { value: "Extra Premium", label: "Extra Premium · ₹4,000+ per sq ft" },
];

const SCOPE_OPTIONS = ["Interiors only", "Construction + interiors"];
const START_OPTIONS = ["Immediately", "Within 1 month", "1–3 months", "3+ months"];
const PROPERTY_OPTIONS = ["Leased / rented", "Owned"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "h-12 w-full rounded-xl border bg-white/[0.02] px-4 text-base text-white placeholder:text-white/35 transition-colors focus:bg-white/[0.04] focus:outline-none sm:h-11 sm:rounded-full sm:bg-white/[0.02] sm:pl-3 sm:pr-5 sm:text-sm";

const fieldBorder = (error?: string) =>
  error ? "border-rose-400/60 focus:border-rose-400" : "border-white/15 focus:border-emerald-600/60";

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/50 sm:right-5"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-white/80 sm:mb-1 sm:text-sm">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-rose-400">{error}</p>}
    </div>
  );
}

function SelectGroup({
  label,
  options,
  value,
  error,
  onChange,
  placeholder = "Select an option",
}: {
  label: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label} error={error}>
      <div className="relative">
        <select
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${fieldBorder(error)} appearance-none ${value ? "" : "text-white/35"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>
        <ChevronIcon />
      </div>
    </Field>
  );
}

export default function PackageEnquiryForm({
  initialPackage = "",
  onClose,
}: {
  initialPackage?: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    mobile: "",
    email: "",
    builtUpArea: "",
    location: "",
    scope: "",
    startTimeline: "",
    property: "",
    packageName: initialPackage,
    budget: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next: FormErrors = {};
    (Object.keys(form) as (keyof FormState)[]).forEach((field) => {
      if (!form[field].trim()) next[field] = "Required";
    });
    if (!next.mobile && form.mobile.length !== 10) next.mobile = "Enter a 10-digit mobile number";
    if (!next.email && !EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    // Below the minimum budget: decline right away, nothing is sent
    if (!isBudgetEligible(form.budget)) {
      setIsDeclined(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/package-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.code === "budget_below_minimum") {
          setIsDeclined(true);
          return;
        }
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
    <section className="py-2 sm:py-4">
      <div className="mx-auto max-w-295 px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0B] shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:grid-cols-[518px_1fr] lg:gap-8.25 lg:p-4">
          {/* Left: image panel */}
          <div className="relative isolate hidden overflow-hidden lg:block lg:h-full lg:rounded-2xl">
            <Image src="/client/Elemental 9.jpg" alt="" fill sizes="518px" className="object-cover" />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/10 to-black/55" />
            <div className="relative z-10 flex h-full flex-col justify-start p-9">
              <p className="mb-4 font-mono text-xs tracking-[0.2em] text-emerald-500 uppercase">Enquiry form</p>
              <h2 className="font-opensans text-[48px] leading-[1.15] font-bold text-white">
                Get a <span className="font-serif font-bold text-white italic">detailed</span>
                <br />
                quotation
              </h2>
              <p className="mt-5 max-w-xs text-white/70">
                Share a few details and our projects team will contact you.
              </p>
            </div>
          </div>

          {/* Mobile banner */}
          <div className="relative isolate block h-32 overflow-hidden sm:h-36 lg:hidden">
            <Image src="/client/Elemental 9.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_30%]" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-black/20" />
            <div className="relative z-10 flex h-full flex-col justify-center p-5 sm:p-6">
              <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-emerald-400 uppercase sm:hidden">Enquiry form</p>
              <h2 className="max-w-[280px] font-opensans text-[23px] leading-[1.15] font-bold text-white sm:max-w-none sm:text-2xl sm:leading-tight">
                Get a <span className="font-serif font-bold text-white italic">detailed</span> quotation
              </h2>
            </div>
          </div>

          {/* Right: form panel */}
          <div className="flex flex-col p-5 sm:p-9 lg:p-0">
            {isDeclined ? (
              <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-amber-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-7 w-7">
                    <path d="M12 8v5m0 3.5v.01" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-white">We can&apos;t take this one forward</h3>
                <p className="max-w-sm text-white/60">
                  Thank you, {form.fullName.trim() || "there"}. Our commercial fit-outs start at a project budget of{" "}
                  {MINIMUM_BUDGET_LABEL}, so we aren&apos;t able to take this enquiry forward right now. If your
                  budget changes, we&apos;d be glad to hear from you again.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 rounded-full bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-white/90"
                >
                  Close
                </button>
              </div>
            ) : isSubmitted ? (
              <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-600/15 text-emerald-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-7 w-7">
                    <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-white">Enquiry received</h3>
                <p className="max-w-sm text-white/60">
                  Thank you, {form.fullName.trim() || "there"}. Our projects team will contact you with a detailed
                  quotation for the {form.packageName} package (
                  {PACKAGE_PRICE_RANGES[form.packageName as keyof typeof PACKAGE_PRICE_RANGES]}).
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 rounded-full bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-white/90"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 border-b border-white/10 pb-4 text-left sm:mb-3 sm:pb-3 sm:text-center">
                  <h2 className="font-opensans text-xl font-bold text-white sm:text-2xl">Enter Your Details Here</h2>
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:gap-2.5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2.5">
                    <Field label="Your Name*" error={errors.fullName}>
                      <input
                        ref={nameRef}
                        type="text"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Full name"
                        className={`${inputClass} ${fieldBorder(errors.fullName)}`}
                      />
                    </Field>
                    <Field label="Phone Number*" error={errors.mobile}>
                      <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={form.mobile}
                        onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit mobile"
                        className={`${inputClass} ${fieldBorder(errors.mobile)}`}
                      />
                    </Field>
                  </div>

                  <Field label="Email ID*" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="name@company.com"
                      className={`${inputClass} ${fieldBorder(errors.email)}`}
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2.5">
                    <Field label="Estimated Built-up Area*" error={errors.builtUpArea}>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={form.builtUpArea}
                          onChange={(e) => update("builtUpArea", e.target.value.replace(/[^\d,.]/g, ""))}
                          placeholder="e.g. 3000"
                          className={`${inputClass} pr-14! ${fieldBorder(errors.builtUpArea)}`}
                        />
                        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-mono text-sm text-white/50 sm:right-5">
                          sq ft
                        </span>
                      </div>
                    </Field>
                    <Field label="Project Location*" error={errors.location}>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="Area and city"
                        className={`${inputClass} ${fieldBorder(errors.location)}`}
                      />
                    </Field>
                  </div>

                  <SelectGroup
                    label="Scope of Work*"
                    options={SCOPE_OPTIONS}
                    value={form.scope}
                    error={errors.scope}
                    onChange={(v) => update("scope", v)}
                    placeholder="Select scope of work"
                  />
                  <SelectGroup
                    label="When do you want to start?*"
                    options={START_OPTIONS}
                    value={form.startTimeline}
                    error={errors.startTimeline}
                    onChange={(v) => update("startTimeline", v)}
                    placeholder="Select a timeline"
                  />
                  <SelectGroup
                    label="Is the property leased or owned?*"
                    options={PROPERTY_OPTIONS}
                    value={form.property}
                    error={errors.property}
                    onChange={(v) => update("property", v)}
                    placeholder="Select property status"
                  />

                  <Field label="Which package are you interested in?*" error={errors.packageName}>
                    <div className="relative">
                      <select
                        value={form.packageName}
                        onChange={(e) => update("packageName", e.target.value)}
                        className={`${inputClass} ${fieldBorder(errors.packageName)} appearance-none ${
                          form.packageName ? "" : "text-white/35"
                        }`}
                      >
                        <option value="" disabled>
                          Select a package
                        </option>
                        {PACKAGE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value} className="text-black">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronIcon />
                    </div>
                  </Field>

                  <SelectGroup
                    label="Project Budget*"
                    options={[...BUDGET_OPTIONS]}
                    value={form.budget}
                    error={errors.budget}
                    onChange={(v) => update("budget", v)}
                    placeholder="Select a budget range"
                  />
                  {form.budget && !isBudgetEligible(form.budget) && (
                    <p role="status" className="-mt-1 text-sm text-amber-300">
                      We currently take projects with a budget of {MINIMUM_BUDGET_LABEL} and above.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-7 py-3 font-opensans text-base font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-lg"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Submit Enquiry
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
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
