// Discovery-call enquiries use a separate budget rule from commercial fit-outs.
export const BUDGET_OPTIONS = [
  "Under ₹1.5 Cr",
  "₹1.5 to ₹3 Cr",
  "₹3 - ₹5 Cr",
  "₹5 - ₹10 Cr",
  "₹10 - ₹20 Cr",
  "₹20 - ₹50 Cr",
  "Above 50 Cr.",
] as const;

export const MINIMUM_BUDGET_LABEL = "₹1.5 Cr";

export function isBudgetEligible(budget: string) {
  return BUDGET_OPTIONS.slice(1).some((option) => option === budget.trim());
}
