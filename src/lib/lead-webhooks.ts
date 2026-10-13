export type LeadSubmission = {
  site: "commercial" | "resort";
  form: "package-enquiry" | "contact-us" | "schedule-visit";
  status: "eligible" | "below_minimum" | "meeting_requested";
  name: string;
  phone: string;
  email: string;
  fields: Record<string, string>;
};

const WEBHOOK_TIMEOUT_MS = 8_000;
const MAX_ATTEMPTS = 3;

export function normalizeLeadPhone(phone: string) {
  const digits = phone.trim().replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits.startsWith("00") ? digits.slice(2) : digits;
}

async function postWebhook(provider: string, rawUrl: string | undefined, payload: unknown) {
  if (!rawUrl?.trim()) {
    console.error(`lead-webhooks: ${provider} webhook is not configured.`);
    return;
  }

  let url: URL;
  try {
    // URLs copied from integration instructions can include line breaks or anchors.
    url = new URL(rawUrl.replace(/\s/g, ""));
    url.hash = "";
    if (url.protocol !== "https:") throw new Error("HTTPS is required");
  } catch {
    console.error(`lead-webhooks: ${provider} webhook URL is invalid.`);
    return;
  }

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      });
      await response.body?.cancel();
      if (response.ok) return;

      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt === MAX_ATTEMPTS) {
        console.error(`lead-webhooks: ${provider} delivery failed (HTTP ${response.status}).`);
        return;
      }
    } catch {
      // A timeout can happen after the receiver saved the lead. Avoid sending a duplicate.
      console.error(`lead-webhooks: ${provider} delivery failed (network error or timeout).`);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, attempt * 500));
  }
}

export async function sendLeadToIntegrations(lead: LeadSubmission) {
  const phone = normalizeLeadPhone(lead.phone);
  const source = lead.site === "commercial" ? "Decofice Commercial Website" : "Decofice Resort Website";
  const fields = Object.fromEntries(
    Object.entries(lead.fields).map(([key, value]) => [key, value.trim()]),
  );
  const metadata = { site: lead.site, form: lead.form, status: lead.status };
  const contact = { name: lead.name.trim(), phone, email: lead.email.trim(), source };

  // Each receiver runs independently; one failure must not prevent the other delivery.
  await Promise.allSettled([
    postWebhook("Privyr", process.env.PRIVYR_WEBHOOK_URL, {
      ...contact,
      phone: `+${phone}`,
      details: { ...fields, ...metadata },
    }),
    postWebhook(
      `Gallabox ${lead.site}`,
      lead.site === "commercial"
        ? process.env.GALLABOX_COMMERCIAL_WEBHOOK_URL
        : process.env.GALLABOX_RESORT_WEBHOOK_URL,
      { ...fields, ...contact, ...metadata },
    ),
  ]);
}
