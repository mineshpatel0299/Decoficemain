"use client";

import { useState } from "react";

type VisitType = "In-person" | "Virtual Call";
type Step = 1 | 2 | 3;

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<"selectedTime" | keyof FormState, string>>;

const STEPS: { step: Step; title: string; description: string }[] = [
  { step: 1, title: "Pick a format", description: "In-person visit or virtual call" },
  { step: 2, title: "Choose a slot", description: "Date and preferred time" },
  { step: 3, title: "Share contact details", description: "Name, phone and mail" },
];

const FORMAT_OPTIONS: { type: VisitType; title: string; description: string }[] = [
  {
    type: "In-person",
    title: "Visit the office or property site",
    description: "Best for serious conversation through a physical walkthrough and area feel",
  },
  {
    type: "Virtual Call",
    title: "Talk with an advisor online",
    description: "Ideal for remote setting for a guided tour and Q&A on video",
  },
];

const TIME_SLOTS = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "12:30 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

const INITIAL_FORM: FormState = { fullName: "", phone: "", email: "", message: "" };

function upcomingDates() {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      label: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    };
  });
}

function PersonIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 4.2-6 7.5-6s6 2 7.5 6" strokeLinecap="round" />
    </svg>
  );
}

function VideoIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="6" width="12" height="12" rx="2.5" />
      <path d="M15 10.5l6-3v9l-6-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path
        d="M5 4h3.5l1.5 4.5-2 1.5a12 12 0 006 6l1.5-2 4.5 1.5V19a2 2 0 01-2 2c-8 0-14-6-14-14a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5L12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={className}>
      <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FieldInput({
  label,
  icon,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div
      className={`rounded-2xl border px-5 py-3 backdrop-blur-xl transition-all shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)] ${
        error ? "border-rose-400/50 bg-rose-500/10" : "border-white/20 bg-white/5 focus-within:border-white/40 focus-within:bg-white/10"
      }`}
    >
      <label className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-white/40 uppercase">
        {icon} {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none"
      />
      {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export default function ScheduleVisit() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [visitType, setVisitType] = useState<VisitType>("In-person");
  const [dates] = useState(upcomingDates);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep = (step: Step) => {
    const nextErrors: FormErrors = {};
    if (step === 2 && !selectedTime) nextErrors.selectedTime = "Choose a time slot to continue.";
    if (step === 3) {
      if (!form.fullName.trim()) nextErrors.fullName = "Required";
      if (!form.phone.trim()) nextErrors.phone = "Required";
      if (!form.email.trim()) nextErrors.email = "Required";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3) as Step);
  };

  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1) as Step);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setIsSubmitted(true);
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setVisitType("In-person");
    setSelectedDateIndex(0);
    setSelectedTime("");
    setForm(INITIAL_FORM);
    setErrors({});
    setIsSubmitted(false);
  };

  const nextUpText =
    currentStep === 1 ? "Next up: Choose a slot" : currentStep === 2 ? "Next up: Share contact details" : "One final step before submit.";

  return (
    <section className="relative bg-[#0F0F0F] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="text-center lg:text-left">
            <h2 className="font-opensans text-[40px] leading-tight font-bold text-white sm:text-[56px] lg:text-heading">
              Schedule a
              <br />
              <span className="font-serif font-bold text-emerald-600 italic">Meet</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white/70 lg:mx-0">
              Choose an in-person visit or a virtual call, then share a preferred slot and your contact details.
            </p>

            <div className="mt-10 hidden flex-col gap-4 lg:flex">
              {STEPS.map((item) => {
                const isComplete = currentStep > item.step || isSubmitted;
                const isCurrent = currentStep === item.step && !isSubmitted;
                return (
                  <div
                    key={item.step}
                    className={`rounded-2xl border p-5 backdrop-blur-xl transition-all shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)] ${
                      isCurrent
                        ? "border-emerald-500/50 bg-emerald-500/15"
                        : isComplete
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-white/20 bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                          isComplete
                            ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-600"
                            : isCurrent
                              ? "border-white bg-white text-black"
                              : "border-white/25 text-white/60"
                        }`}
                      >
                        {isComplete ? <CheckIcon /> : <span className="text-sm font-semibold">{item.step}</span>}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-white/50">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto flex h-[300px] w-full max-w-[358px] flex-col gap-[14px] overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.02] px-[14px] py-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-3xl sm:p-8 lg:mx-0 lg:h-[551px] lg:max-w-none lg:rounded-[32px] lg:self-end lg:gap-0 lg:p-6 lg:sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-50" />
            <div className="relative flex h-full flex-col">
            <form onSubmit={handleSubmit} className="flex h-full flex-col">
              <div className="mb-4 flex shrink-0 flex-wrap items-center justify-between gap-4 lg:mb-6">
                <div>
                  <h3 className="text-[18px] font-bold text-white lg:text-xl">
                    {isSubmitted
                      ? "Request captured"
                      : currentStep === 1
                        ? "Pick a format"
                        : currentStep === 2
                          ? "Choose a slot"
                          : "Share contact details"}
                  </h3>
                  <p className="mt-1 text-[12px] text-white/70 lg:text-sm lg:text-white/50">
                    {isSubmitted
                      ? "We'll be in touch shortly."
                      : currentStep === 1
                        ? "How would you like to connect?"
                        : currentStep === 2
                          ? "Date and preferred time"
                          : "Name, phone and mail"}
                  </p>
                </div>
                {!isSubmitted && (
                  <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-white/80 lg:px-4 lg:py-2 lg:text-sm lg:text-white/60">
                    Step {currentStep} of 3
                  </span>
                )}
              </div>

              <div className="flex-1 overflow-y-auto pr-1">
              {isSubmitted ? (
                <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)] sm:p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-600">
                    <CheckIcon className="h-7 w-7" />
                  </div>
                  <h4 className="mb-3 text-2xl font-semibold text-white">Request received</h4>
                  <p className="mb-6 leading-relaxed text-white/70">
                    Thank you for sharing your preferred slot. Our team will review the request and confirm shortly.
                  </p>
                  <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-md">
                      <p className="mb-2 text-xs tracking-[0.2em] text-white/40 uppercase">Scheduled For</p>
                      <p className="font-medium text-white">{dates[selectedDateIndex].label}</p>
                      <p className="mt-1 text-sm text-white/60">{selectedTime}</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-md">
                      <p className="mb-2 text-xs tracking-[0.2em] text-white/40 uppercase">Client</p>
                      <p className="font-medium text-white">{form.fullName}</p>
                      <p className="mt-1 text-sm text-white/60">{form.phone}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={resetFlow}
                    className="rounded-full bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-white/90"
                  >
                    Book Another Visit
                  </button>
                </div>
              ) : (
                <>
                  {currentStep === 1 && (
                    <div className="flex flex-col gap-[14px]">
                      {FORMAT_OPTIONS.map((option) => {
                        const active = visitType === option.type;
                        return (
                          <button
                            key={option.type}
                            type="button"
                            onClick={() => setVisitType(option.type)}
                            className={`w-full h-[72px] rounded-lg border px-[12px] py-[10px] text-left backdrop-blur-xl transition-all shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)] lg:h-auto lg:rounded-2xl lg:p-5 lg:sm:p-6 ${
                              active
                                ? "border-emerald-500/50 bg-emerald-500/15"
                                : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"
                            }`}
                          >
                            <div className="flex h-full items-center gap-1 overflow-hidden lg:items-start lg:gap-4">
                              <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                                  active ? "bg-white text-black" : "border border-white/20 text-white"
                                }`}
                              >
                                {option.type === "In-person" ? <PersonIcon /> : <VideoIcon />}
                              </div>
                              <div className="flex flex-col justify-center">
                                <p className="text-[14px] font-semibold leading-tight text-white lg:text-lg">{option.type}</p>
                                <p className="text-[11px] leading-tight text-white/70 lg:text-sm lg:text-white/50">{option.title}</p>
                                <p className="mt-0.5 text-[9px] leading-tight text-white/50 lg:mt-2 lg:text-sm lg:text-white/60">{option.description}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div>
                      <p className="mb-3 text-sm text-white/60">Choose a date</p>
                      <div className="mb-8 flex gap-3 overflow-x-auto pb-1">
                        {dates.map((d, i) => (
                          <button
                            key={d.label}
                            type="button"
                            onClick={() => setSelectedDateIndex(i)}
                            className={`flex min-w-16 shrink-0 flex-col items-center rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)] ${
                              selectedDateIndex === i
                                ? "border-emerald-500/50 bg-emerald-500/15 text-white"
                                : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/30"
                            }`}
                          >
                            <span className="text-xs tracking-wide uppercase">{d.weekday}</span>
                            <span className="mt-1 text-lg font-semibold">{d.day}</span>
                          </button>
                        ))}
                      </div>

                      <p className="mb-3 text-sm text-white/60">Available time slots</p>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => {
                              setSelectedTime(time);
                              setErrors((prev) => ({ ...prev, selectedTime: undefined }));
                            }}
                            className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)] ${
                              selectedTime === time
                                ? "border-white bg-white text-black shadow-white/20"
                                : "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.selectedTime && <p className="mt-3 text-sm text-rose-400">{errors.selectedTime}</p>}
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <FieldInput
                          label="Full name"
                          icon={<PersonIcon className="h-3.5 w-3.5" />}
                          value={form.fullName}
                          onChange={(v) => updateField("fullName", v)}
                          error={errors.fullName}
                        />
                        <FieldInput
                          label="Phone number"
                          icon={<PhoneIcon />}
                          value={form.phone}
                          onChange={(v) => updateField("phone", v)}
                          error={errors.phone}
                          type="tel"
                        />
                      </div>
                      <FieldInput
                        label="Email address"
                        icon={<MailIcon />}
                        value={form.email}
                        onChange={(v) => updateField("email", v)}
                        error={errors.email}
                        type="email"
                      />
                      <div className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 backdrop-blur-xl transition-all shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)] focus-within:border-white/40 focus-within:bg-white/10">
                        <label className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-white/40 uppercase">
                          <MailIcon /> Message (optional)
                        </label>
                        <textarea
                          rows={2}
                          value={form.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          className="w-full resize-none bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              </div>

              {!isSubmitted && (
                <div className="mt-auto flex shrink-0 flex-row items-center justify-between border-t border-white/10 pt-3 lg:mt-6 lg:pt-6">
                  <p className="text-[10px] text-white/50 lg:text-sm lg:text-white/45">{nextUpText}</p>
                  <div className="flex gap-2 lg:gap-3">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="flex h-[24px] min-w-[64px] items-center justify-center rounded-lg border border-white/15 px-[10px] py-[2px] text-[10px] font-medium leading-none text-white transition-colors hover:bg-white/10 lg:h-auto lg:rounded-full lg:px-6 lg:py-3 lg:text-base"
                      >
                        Back
                      </button>
                    )}
                    {currentStep < 3 ? (
                      <button
                        key="continue"
                        type="button"
                        onClick={goNext}
                        className="flex h-[24px] w-[64px] items-center justify-center rounded-lg bg-white px-[10px] py-[2px] text-[10px] font-semibold leading-none text-black transition-colors hover:bg-white/90 lg:h-auto lg:w-auto lg:rounded-full lg:px-8 lg:py-3 lg:text-base"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        key="submit"
                        type="submit"
                        className="flex h-[24px] items-center justify-center rounded-lg bg-white px-[10px] py-[2px] text-[10px] font-semibold leading-none text-black transition-colors hover:bg-white/90 lg:h-auto lg:rounded-full lg:px-8 lg:py-3 lg:text-base"
                      >
                        Submit Request
                      </button>
                    )}
                  </div>
                </div>
              )}
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
