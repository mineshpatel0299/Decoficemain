// Shared by the quotation form (client) and /api/package-enquiry (server) so both enforce the same rule.

export const BUDGET_OPTIONS = ["Under ₹30L", "₹30–50L", "₹50L–1Cr", "₹1–3Cr", "₹3–5Cr", "₹5Cr+"] as const;

export const PACKAGE_PRICE_RANGES = {
  Basic: "₹1,600–₹1,800 per sq ft",
  Enhanced: "₹1,900–₹2,200 per sq ft",
  Professional: "₹2,500+ per sq ft",
  Premium: "₹3,000+ per sq ft",
  "Extra Premium": "₹4,000+ per sq ft",
} as const;

// Enquiries with a budget below ₹30L are declined; ₹30L and above are accepted.
const BELOW_MINIMUM_BUDGETS: readonly string[] = ["Under ₹30L"];

export const MINIMUM_BUDGET_LABEL = "₹30L";

export function isBudgetEligible(budget: string) {
  return !BELOW_MINIMUM_BUDGETS.includes(budget.trim());
}
