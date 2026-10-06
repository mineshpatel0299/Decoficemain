import Image from "next/image";
import SectionBadge from "./SectionBadge";

const brands = [1, 2, 3, 4, 5, 6, 7, 8];

export default function BrandsMarquee() {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-[66px] pr-[66px]"
    >
      {brands.map((n) => (
        <li key={n} className="relative size-35.25 shrink-0">
          <Image src={`/commercial/brands/${n}.png`} alt="" fill sizes="141px" className="object-cover" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="bg-[#0f0f0f] pt-[90px]">
      <div className="flex justify-center">
        <SectionBadge variant="compact">Brands we&apos;ve built for</SectionBadge>
      </div>
      <div className="mt-[9px] overflow-hidden">
        <div className="-ml-[75px] flex w-max animate-[commercial-marquee_40s_linear_infinite]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
