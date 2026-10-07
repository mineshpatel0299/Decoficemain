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
        className={`mt-6 font-opensans text-[30px] font-bold leading-[1.125] text-[#eaeaea] sm:mt-8 sm:text-5xl lg:text-(length:--text-heading) ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 font-opensans text-sm leading-6 text-[#eaeaea] sm:mt-8 sm:text-xl sm:leading-7 ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic leading-[0] text-emerald-600">{children}</span>;
}
