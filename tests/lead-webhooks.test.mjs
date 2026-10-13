import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { beforeEach, afterEach, test } from "node:test";
import { normalizeLeadPhone, sendLeadToIntegrations } from "../src/lib/lead-webhooks.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const envKeys = ["PRIVYR_WEBHOOK_URL", "GALLABOX_COMMERCIAL_WEBHOOK_URL", "GALLABOX_RESORT_WEBHOOK_URL", "MAIL_TO", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
let originalEnv;
let originalFetch;
let originalConsoleError;
let logs;

beforeEach(() => {
  originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
  originalFetch = globalThis.fetch;
  originalConsoleError = console.error;
  logs = [];
  console.error = (...args) => logs.push(args.join(" "));
  Object.assign(process.env, {
    PRIVYR_WEBHOOK_URL: "https://privyr.example/leads#generic-webhook",
    GALLABOX_COMMERCIAL_WEBHOOK_URL: "https://gallabox.example/commercial",
    GALLABOX_RESORT_WEBHOOK_URL: "https://gallabox.example/resort",
    MAIL_TO: "team@example.com",
    SMTP_HOST: "smtp.example.com",
    SMTP_PORT: "587",
    SMTP_USER: "test",
    SMTP_PASS: "test",
  });
  globalThis.fetch = async () => { throw new Error("Unexpected network request in test"); };
});

afterEach(() => {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
});

const lead = {
  site: "commercial", form: "package-enquiry", status: "eligible",
  name: " Example Lead ", phone: "9876543210", email: " lead@example.com ",
  fields: { budget: " ₹26-50L ", location: " Goa " },
};

function captureFetch(responder = () => new Response(null, { status: 200 })) {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    const call = { url: String(url), ...options, payload: JSON.parse(options.body) };
    calls.push(call);
    return responder(call);
  };
  return calls;
}

test("normalizes Indian and explicitly international phone numbers", () => {
  assert.equal(normalizeLeadPhone("98765 43210"), "919876543210");
  assert.equal(normalizeLeadPhone("+91 98765 43210"), "919876543210");
  assert.equal(normalizeLeadPhone("0044 7700 900123"), "447700900123");
});

test("commercial leads reach Privyr and only the commercial Gallabox webhook", async () => {
  process.env.PRIVYR_WEBHOOK_URL = "https://privyr.example/\nleads#generic-webhook";
  const calls = captureFetch();
  await sendLeadToIntegrations(lead);
  assert.equal(calls.length, 2);
  const privyr = calls.find((call) => call.url.includes("privyr"));
  const gallabox = calls.find((call) => call.url.includes("gallabox"));
  assert.equal(privyr.url, "https://privyr.example/leads");
  assert.equal(gallabox.url, "https://gallabox.example/commercial");
  assert.equal(privyr.payload.phone, "+919876543210");
  assert.equal(privyr.payload.details.budget, "₹26-50L");
  assert.equal(gallabox.payload.name, "Example Lead");
  assert.equal(gallabox.payload.email, "lead@example.com");
  assert.equal(gallabox.payload.phone, "919876543210");
  assert.equal(gallabox.payload.source, "Decofice Commercial Website");
  assert.equal(gallabox.payload.status, "eligible");
  assert.ok(calls.every((call) => call.method === "POST" && call.headers["Content-Type"] === "application/json"));
});

test("resort enquiries and meetings use the resort webhook with distinct metadata", async () => {
  const calls = captureFetch();
  for (const form of ["contact-us", "schedule-visit"]) {
    await sendLeadToIntegrations({ ...lead, site: "resort", form });
  }
  const gallabox = calls.filter((call) => call.url.includes("gallabox"));
  assert.equal(gallabox.length, 2);
  assert.ok(gallabox.every((call) => call.url.endsWith("/resort") && call.payload.source === "Decofice Resort Website"));
  assert.deepEqual(gallabox.map((call) => call.payload.form), ["contact-us", "schedule-visit"]);
});

test("transient HTTP failure retries independently without repeating successful delivery", async () => {
  let failures = 0;
  const calls = captureFetch((call) => new Response(null, {
    status: call.url.includes("privyr") && failures++ === 0 ? 503 : 200,
  }));
  await sendLeadToIntegrations(lead);
  assert.equal(calls.filter((call) => call.url.includes("privyr")).length, 2);
  assert.equal(calls.filter((call) => call.url.includes("gallabox")).length, 1);
});

test("permanent errors do not retry or expose lead details in logs", async () => {
  const calls = captureFetch((call) => new Response(null, { status: call.url.includes("privyr") ? 400 : 200 }));
  await sendLeadToIntegrations(lead);
  assert.equal(calls.length, 2);
  assert.ok(logs.some((line) => line.includes("HTTP 400")));
  assert.ok(logs.every((line) => !line.includes("example.com") && !line.includes("9876543210") && !line.includes("https://")));
});

test("network errors do not retry a possibly saved lead or prevent the other provider", async () => {
  const calls = captureFetch((call) => {
    if (call.url.includes("privyr")) throw new Error("timeout with sensitive endpoint");
    return new Response(null, { status: 200 });
  });
  await sendLeadToIntegrations(lead);
  assert.equal(calls.length, 2);
  assert.ok(logs.some((line) => line.includes("network error or timeout")));
  assert.ok(logs.every((line) => !line.includes("sensitive endpoint")));
});

test("missing or insecure configuration still allows the other provider", async () => {
  const calls = captureFetch();
  delete process.env.PRIVYR_WEBHOOK_URL;
  await sendLeadToIntegrations(lead);
  process.env.PRIVYR_WEBHOOK_URL = "http://privyr.example/leads";
  await sendLeadToIntegrations(lead);
  assert.equal(calls.length, 2);
  assert.ok(calls.every((call) => call.url.includes("gallabox")));
});

// Execute the real route logic with mocked Next.js lifecycle, SMTP, and webhooks.
// Compilation is in memory; no test data can reach the configured live services.
function loadRoute(path, { failEmail = false } = {}) {
  const pending = [];
  const deliveries = [];
  const emails = [];
  const cache = new Map();
  const mocks = {
    "next/server": { NextResponse: Response, after: (callback) => pending.push(callback) },
    nodemailer: { createTransport: () => ({ sendMail: async (mail) => {
      if (failEmail) throw new Error("Mock email failure");
      emails.push(mail);
    } }) },
    "@/lib/lead-webhooks": { sendLeadToIntegrations: async (value) => deliveries.push(value) },
  };
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const code = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText;
    const exports = {};
    cache.set(file, exports);
    const mockRequire = (name) => {
      if (mocks[name]) return mocks[name];
      if (name.startsWith("@/lib/")) return load(`../src/lib/${name.slice("@/lib/".length)}.ts`);
      throw new Error(`Unmocked dependency: ${name}`);
    };
    new Function("require", "exports", code)(mockRequire, exports);
    return exports;
  }
  const route = load(`../src/app/api/${path}/route.ts`);
  return { ...route, deliveries, emails, flush: async () => Promise.all(pending.map((callback) => callback())) };
}

const commercial = {
  fullName: "Example Lead", mobile: "9876543210", email: "lead@example.com",
  builtUpArea: "5000", location: "Goa", scope: "Interiors only", startTimeline: "Immediately",
  property: "Owned", packageName: "Basic", budget: "₹26-50L",
};
const resort = {
  fullName: "Example Lead", mobile: "9876543210", email: "lead@example.com",
  location: "Goa", projectType: "Resorts", serviceNeeded: "Turnkey: Design + Construction",
  plotArea: "10000", builtUpArea: "5000", budget: "₹1.5 to ₹3 Cr", startTimeline: "Immediately",
};
const meeting = {
  fullName: "Example Lead", phone: "9876543210", email: "lead@example.com",
  visitType: "Virtual Call", date: "20 Oct 2026", time: "10:00 AM", message: "Project discussion",
};
function request(body) {
  return new Request("http://localhost/api/enquiry", { method: "POST", body: JSON.stringify(body) });
}

for (const { path, payload, site } of [
  { path: "package-enquiry", payload: commercial, site: "commercial" },
  { path: "contact-us", payload: resort, site: "resort" },
  { path: "schedule-visit", payload: meeting, site: "resort" },
]) {
  test(`${path}: valid submissions schedule the matching integration delivery and email`, async () => {
    const route = loadRoute(path);
    const response = await route.POST(request(payload));
    assert.equal(response.status, 200);
    assert.equal(route.deliveries.length, 0, "Delivery must wait until after the response");
    await route.flush();
    assert.equal(route.deliveries.length, 1);
    assert.equal(route.deliveries[0].site, site);
    assert.equal(route.deliveries[0].form, path);
    assert.equal(route.emails.length, 1);
  });

  test(`${path}: SMTP failure does not drop the CRM lead`, async () => {
    const route = loadRoute(path, { failEmail: true });
    assert.equal((await route.POST(request(payload))).status, 500);
    await route.flush();
    assert.equal(route.deliveries.length, 1);
  });

  test(`${path}: missing mail configuration does not drop the CRM lead`, async () => {
    delete process.env.MAIL_TO;
    const route = loadRoute(path);
    assert.equal((await route.POST(request(payload))).status, 500);
    await route.flush();
    assert.equal(route.deliveries.length, 1);
  });

  test(`${path}: invalid contact details are never forwarded`, async () => {
    const route = loadRoute(path);
    assert.equal((await route.POST(request({ ...payload, email: "invalid" }))).status, 400);
    await route.flush();
    assert.equal(route.deliveries.length, 0);
    assert.equal(route.emails.length, 0);
  });
}

for (const [path, payload, budget] of [
  ["package-enquiry", commercial, "Under ₹25 Lakhs"],
  ["contact-us", resort, "Under ₹1.5 Cr"],
]) {
  test(`${path}: below-budget submissions reach CRMs but keep rejection and skip email`, async () => {
    const route = loadRoute(path);
    const response = await route.POST(request({ ...payload, budget }));
    assert.equal(response.status, 422);
    assert.equal((await response.json()).code, "budget_below_minimum");
    await route.flush();
    assert.equal(route.deliveries.length, 1);
    assert.equal(route.deliveries[0].status, "below_minimum");
    assert.equal(route.deliveries[0].fields.budget, budget);
    assert.equal(route.emails.length, 0);
  });

  test(`${path}: unknown budgets cannot be forwarded as eligible leads`, async () => {
    const route = loadRoute(path);
    assert.equal((await route.POST(request({ ...payload, budget: "made-up budget" }))).status, 400);
    await route.flush();
    assert.equal(route.deliveries.length, 0);
  });
}

test("resort: object values in optional fields are rejected before forwarding", async () => {
  const route = loadRoute("contact-us");
  assert.equal((await route.POST(request({ ...resort, requirements: { injected: true } }))).status, 400);
  await route.flush();
  assert.equal(route.deliveries.length, 0);
});
