import Image from "next/image";

const stats = [
  { label: "YEARS OF EXPERIENCE", value: "10+" },
  { label: "HAPPY CLIENTS", value: "50+" },
  { label: "ACTIVE LOCATIONS", value: "15+" },
  { label: "CERTIFIED ARCHITECTS", value: "25+" },
];

export default function Stats() {
  return (
    <section className="relative h-[1150px] max-h-screen min-h-[860px] w-full overflow-hidden bg-black">
      <Image src="/stats/aurora.png" alt="Aurora over the mountains" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 z-1 bg-linear-to-b from-[#0F0F0F] from-25% via-transparent via-45% to-[#0F0F0F] to-95%" />

      <div className="absolute inset-x-0 top-[16%] z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-opensans text-[32px] leading-tight font-bold text-white sm:text-[44px] lg:text-[56px]">
          Beyond The <span className="font-serif font-bold text-emerald-500 italic">Blueprint</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          Measured by the spaces we&apos;ve shaped, the partnerships we&apos;ve built, and the trust we&apos;ve
          earned.
        </p>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xs font-semibold tracking-[0.15em] text-white/70 uppercase sm:text-[13px]">
                {stat.label}
              </p>
              <p className="font-serif mt-3 text-[44px] font-bold text-white sm:text-[56px]">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 top-[54%] z-10 mx-auto max-w-3xl px-6 text-center lg:top-[clamp(470px,calc(390px+9.5vw),600px)]">
        <h3 className="font-opensans text-[32px] leading-tight font-bold text-white sm:text-[42px] lg:text-[50px]">
          The <span className="font-serif font-bold text-emerald-400 italic">Company</span> We Keep
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-white/70">
          A reflection of the relationships we&apos;ve built and the trust our partners place in us.
        </p>
      </div>

      <Image
        src="/stats/hills.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-20 object-cover"
      />
    </section>
  );
}
