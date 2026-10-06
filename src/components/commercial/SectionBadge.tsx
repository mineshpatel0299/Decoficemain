export default function SectionBadge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "compact";
}) {
  // "compact" is the Manrope pill used above the brand strip (px 14, 6px dot); "default" is the Open Sans one (px 18, 9px dot)
  const compact = variant === "compact";
  return (
    <span
      className={`inline-flex h-6 items-center justify-center gap-2.5 rounded-full bg-emerald-600 text-xs font-semibold uppercase tracking-[0.12px] text-[#eaeaea] ${
        compact ? "px-3.5 font-manrope" : "px-4.5 font-opensans"
      }`}
    >
      <span
        className={`rounded-full bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.3)] ${compact ? "size-1.5" : "size-[9px] shadow-[0_0_0_2px_rgba(255,255,255,0.3)]"}`}
      />
      {children}
    </span>
  );
}
