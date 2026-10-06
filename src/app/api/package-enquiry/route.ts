import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type PackageEnquiryPayload = {
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^\d{10}$/;

const FIELDS: (keyof PackageEnquiryPayload)[] = [
  "fullName",
  "mobile",
  "email",
  "builtUpArea",
  "location",
  "scope",
  "startTimeline",
  "property",
  "packageName",
  "budget",
];

function isPayload(body: unknown): body is PackageEnquiryPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  for (const field of FIELDS) {
    if (typeof b[field] !== "string" || (b[field] as string).trim().length === 0) return false;
  }

  return EMAIL_RE.test((b.email as string).trim()) && MOBILE_RE.test((b.mobile as string).trim());
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

  if (!isPayload(body)) {
    return NextResponse.json({ error: "Missing or invalid required fields." }, { status: 400 });
  }

  const mailTo = process.env.MAIL_TO;
  if (!mailTo) {
    console.error("package-enquiry: MAIL_TO is not configured.");
    return NextResponse.json({ error: "The enquiry form is temporarily unavailable. Please try again later." }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["Name", body.fullName],
    ["Phone", body.mobile],
    ["Email", body.email],
    ["Built-up area", `${body.builtUpArea} sq ft`],
    ["Project location", body.location],
    ["Scope of work", body.scope],
    ["Start", body.startTimeline],
    ["Property", body.property],
    ["Package", body.packageName],
    ["Project budget", body.budget],
  ];

  try {
    await getTransporter().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: mailTo,
      replyTo: body.email,
      subject: `New fit-out enquiry (${body.packageName}) from ${body.fullName}`,
      text: rows.map(([label, value]) => `${label}: ${value.trim()}`).join("\n"),
      html: `<h2>New commercial fit-out enquiry</h2>${rows
        .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value.trim())}</p>`)
        .join("")}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("package-enquiry: failed to send email:", error);
    return NextResponse.json({ error: "Failed to send your enquiry. Please try again later." }, { status: 500 });
  }
}
