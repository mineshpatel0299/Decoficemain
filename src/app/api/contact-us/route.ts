import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  fullName: string;
  mobile: string;
  email: string;
  company?: string;
  location: string;
  projectType: string;
  projectStage: string;
  plotArea: string;
  builtUpArea: string;
  budget: string;
  startDate: string;
  requirements?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isContactPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  const requiredStrings: (keyof ContactPayload)[] = [
    "fullName",
    "mobile",
    "email",
    "location",
    "projectType",
    "projectStage",
    "plotArea",
    "builtUpArea",
    "budget",
    "startDate",
  ];

  for (const field of requiredStrings) {
    if (typeof b[field] !== "string" || (b[field] as string).trim().length === 0) return false;
  }

  return (
    EMAIL_RE.test((b.email as string).trim()) &&
    (b.company === undefined || typeof b.company === "string") &&
    (b.requirements === undefined || typeof b.requirements === "string")
  );
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

  const mailTo = process.env.MAIL_TO;
  if (!mailTo) {
    console.error("contact-us: MAIL_TO is not configured.");
    return NextResponse.json({ error: "Contact form is temporarily unavailable. Please try again later." }, { status: 500 });
  }

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
        `Project stage: ${body.projectStage}`,
        `Plot area: ${body.plotArea}`,
        `Built-up area: ${body.builtUpArea}`,
        `Estimated budget: ${body.budget}`,
        `Estimated start date: ${body.startDate}`,
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
        <p><strong>Project stage:</strong> ${escapeHtml(body.projectStage)}</p>
        <p><strong>Plot area:</strong> ${escapeHtml(body.plotArea)}</p>
        <p><strong>Built-up area:</strong> ${escapeHtml(body.builtUpArea)}</p>
        <p><strong>Estimated budget:</strong> ${escapeHtml(body.budget)}</p>
        <p><strong>Estimated start date:</strong> ${escapeHtml(body.startDate)}</p>
        <p><strong>Additional requirements:</strong> ${escapeHtml(body.requirements?.trim() || "-")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact-us: failed to send email:", error);
    return NextResponse.json({ error: "Failed to send your request. Please try again later." }, { status: 500 });
  }
}
