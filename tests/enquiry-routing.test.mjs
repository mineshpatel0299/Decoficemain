import assert from "node:assert/strict";
import test from "node:test";
import { get as httpGet } from "node:http";
import { get as httpsGet } from "node:https";

// Run against a local Next.js server; these checks never submit an enquiry.
const baseUrl = process.env.ENQUIRY_TEST_BASE_URL || "http://localhost:3001";

function getPage(path, host) {
  const url = new URL(path, baseUrl);
  const get = url.protocol === "https:" ? httpsGet : httpGet;
  // Use the HTTP client so the simulated Host header is preserved.
  return new Promise((resolve, reject) => {
    const request = get(url, { headers: { Host: host } }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("error", reject);
      response.on("end", () => resolve({ status: response.statusCode, location: response.headers.location, body }));
    });
    request.on("error", reject);
    request.setTimeout(30_000, () => request.destroy(new Error("Timed out reading the outcome page")));
  });
}

for (const site of [
  { host: "resort.decofice.com", type: "hospitality", budget: "₹1.5 Cr", back: "Back to Home" },
  { host: "commercial.decofice.com", type: "commercial", budget: "₹30L", back: "Go Back to Commercial Page" },
]) {
  for (const outcome of ["success", "rejected"]) {
    test(`${site.host}/enquiry-${outcome} serves the ${site.type} outcome`, async () => {
      const response = await getPage(`/enquiry-${outcome}`, site.host);
      assert.equal(response.status, 200);
      assert.equal(response.location, undefined);

      const html = response.body;
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
      assert.ok(main, "The response must contain a rendered outcome page");
      const text = main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      assert.ok(text.includes(site.type), `Expected ${site.type} wording`);
      assert.ok(text.includes(site.back), "Expected the correct return button");
      assert.ok(!text.includes(site.type === "commercial" ? "hospitality" : "commercial"));
      if (outcome === "rejected") {
        assert.ok(text.includes("Rejected"));
        assert.ok(text.includes(site.budget), "Expected the correct budget minimum");
        assert.ok(!text.includes(site.type === "commercial" ? "₹1.5 Cr" : "₹30L"));
      } else {
        assert.ok(text.includes("Submission successful"));
        assert.ok(!text.includes("Rejected"));
      }
    });
  }
}
