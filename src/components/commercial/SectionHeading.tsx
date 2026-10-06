import SectionBadge from "./SectionBadge";

export default function SectionHeading({
  badge,
  title,
  subtitle,
  titleClassName = "max-w-5xl",
  subtitleClassName = "max-w-[980px]",
}: {
  badge: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <SectionBadge>{badge}</SectionBadge>
      <h2
        className={`mt-8 font-opensans text-4xl font-bold leading-[1.125] text-[#eaeaea] sm:text-5xl lg:text-(length:--text-heading) ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-8 font-opensans text-base leading-7 text-[#eaeaea] sm:text-xl ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic leading-[0] text-emerald-600">{children}</span>;
}
