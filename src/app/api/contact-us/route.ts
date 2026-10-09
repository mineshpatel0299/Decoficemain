import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BUDGET_OPTIONS, isBudgetEligible, MINIMUM_BUDGET_LABEL } from "@/lib/contact-enquiry";

type ContactPayload = {
  fullName: string;
  mobile: string;
  email: string;
  company?: string;
  location: string;
  projectType: string;
  serviceNeeded?: string;
  projectStage?: string;
  landAcquired?: string;
  plotArea: string;
  builtUpArea: string;
  budget: string;
  startTimeline?: string;
  startDate?: string;
  hearAboutUs?: string;
  requirements?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isContactPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  const requiredFields = [
    "fullName",
    "mobile",
    "email",
    "location",
    "projectType",
    "plotArea",
    "builtUpArea",
    "budget",
  ];

  for (const field of requiredFields) {
    if (typeof b[field] !== "string" || (b[field] as string).trim().length === 0) return false;
  }

  // Support both serviceNeeded (sent by form) and projectStage
  const service = typeof b.serviceNeeded === "string" ? b.serviceNeeded : typeof b.projectStage === "string" ? b.projectStage : "";
  if (!service.trim()) return false;

  // Support both startTimeline (sent by form) and startDate
  const start = typeof b.startTimeline === "string" ? b.startTimeline : typeof b.startDate === "string" ? b.startDate : "";
  if (!start.trim()) return false;

  return EMAIL_RE.test((b.email as string).trim());
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO in the environment.");
  }

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return cachedTransporter;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isContactPayload(body)) {
    return NextResponse.json({ error: "Missing or invalid required fields." }, { status: 400 });
  }

  if (!BUDGET_OPTIONS.some((option) => option === body.budget.trim())) {
    return NextResponse.json({ error: "Select a valid project budget." }, { status: 400 });
  }

  if (!isBudgetEligible(body.budget)) {
    return NextResponse.json(
      {
        error: `We currently take hospitality projects with a budget of ${MINIMUM_BUDGET_LABEL} and above.`,
        code: "budget_below_minimum",
      },
      { status: 422 }
    );
  }

  const mailTo = process.env.MAIL_TO;
  if (!mailTo) {
    console.error("contact-us: MAIL_TO is not configured.");
    return NextResponse.json({ error: "Contact form is temporarily unavailable. Please try again later." }, { status: 500 });
  }

  const service = body.serviceNeeded?.trim() || body.projectStage?.trim() || "-";
  const start = body.startTimeline?.trim() || body.startDate?.trim() || "-";
  const land = body.landAcquired?.trim() || "-";
  const hear = body.hearAboutUs?.trim() || "-";

  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: mailTo,
      replyTo: body.email,
      subject: `New project enquiry from ${body.fullName}`,
      text: [
        `Name: ${body.fullName}`,
        `Mobile: ${body.mobile}`,
        `Email: ${body.email}`,
        `Company: ${body.company?.trim() || "-"}`,
        `Project location: ${body.location}`,
        `Project type: ${body.projectType}`,
        `Service needed / Stage: ${service}`,
        `Land acquired: ${land}`,
        `Plot area: ${body.plotArea}`,
        `Built-up area: ${body.builtUpArea}`,
        `Estimated budget: ${body.budget}`,
        `Estimated start date / timeline: ${start}`,
        `How did you hear about us: ${hear}`,
        `Additional requirements: ${body.requirements?.trim() || "-"}`,
      ].join("\n"),
      html: `
        <h2>New "Discuss Your Vision" enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(body.fullName)}</p>
        <p><strong>Mobile:</strong> ${escapeHtml(body.mobile)}</p>
        <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(body.company?.trim() || "-")}</p>
        <p><strong>Project location:</strong> ${escapeHtml(body.location)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(body.projectType)}</p>
        <p><strong>Service needed / Stage:</strong> ${escapeHtml(service)}</p>
        <p><strong>Land acquired:</strong> ${escapeHtml(land)}</p>
        <p><strong>Plot area:</strong> ${escapeHtml(body.plotArea)}</p>
        <p><strong>Built-up area:</strong> ${escapeHtml(body.builtUpArea)}</p>
        <p><strong>Estimated budget:</strong> ${escapeHtml(body.budget)}</p>
        <p><strong>Estimated start date / timeline:</strong> ${escapeHtml(start)}</p>
        <p><strong>How did you hear about us:</strong> ${escapeHtml(hear)}</p>
        <p><strong>Additional requirements:</strong> ${escapeHtml(body.requirements?.trim() || "-")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact-us: failed to send email:", error);
    return NextResponse.json({ error: "Failed to send your request. Please try again later." }, { status: 500 });
  }
}
