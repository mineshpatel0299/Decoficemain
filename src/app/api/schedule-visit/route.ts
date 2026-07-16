import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type VisitType = "In-person" | "Virtual Call";

type SchedulePayload = {
  visitType: VisitType;
  date: string;
  time: string;
  fullName: string;
  phone: string;
  email: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isSchedulePayload(body: unknown): body is SchedulePayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  return (
    (b.visitType === "In-person" || b.visitType === "Virtual Call") &&
    typeof b.date === "string" &&
    b.date.trim().length > 0 &&
    typeof b.time === "string" &&
    b.time.trim().length > 0 &&
    typeof b.fullName === "string" &&
    b.fullName.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.email === "string" &&
    EMAIL_RE.test(b.email.trim()) &&
    (b.message === undefined || typeof b.message === "string")
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

  if (!isSchedulePayload(body)) {
    return NextResponse.json({ error: "Missing or invalid required fields." }, { status: 400 });
  }

  const mailTo = process.env.MAIL_TO;
  if (!mailTo) {
    console.error("schedule-visit: MAIL_TO is not configured.");
    return NextResponse.json({ error: "Scheduling is temporarily unavailable. Please try again later." }, { status: 500 });
  }

  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: mailTo,
      replyTo: body.email,
      subject: `New visit request from ${body.fullName}`,
      text: [
        `Visit type: ${body.visitType}`,
        `Preferred date: ${body.date}`,
        `Preferred time: ${body.time}`,
        `Name: ${body.fullName}`,
        `Phone: ${body.phone}`,
        `Email: ${body.email}`,
        `Message: ${body.message?.trim() || "-"}`,
      ].join("\n"),
      html: `
        <h2>New "Schedule a Visit" request</h2>
        <p><strong>Visit type:</strong> ${escapeHtml(body.visitType)}</p>
        <p><strong>Preferred date:</strong> ${escapeHtml(body.date)}</p>
        <p><strong>Preferred time:</strong> ${escapeHtml(body.time)}</p>
        <p><strong>Name:</strong> ${escapeHtml(body.fullName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Message:</strong> ${escapeHtml(body.message?.trim() || "-")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("schedule-visit: failed to send email:", error);
    return NextResponse.json({ error: "Failed to send your request. Please try again later." }, { status: 500 });
  }
}
