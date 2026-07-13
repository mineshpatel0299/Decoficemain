import Image from "next/image";

const concerns = [
  {
    label: "Common Concern 1:",
    quote: "I just want to know what's happening with my project",
    headingWhite: "You'll Always Know",
    headingGreen: "What's Next.",
    body: "Clear milestones and regular updates keep your project moving with complete confidence.",
  },
  {
    label: "Common Concern 2:",
    quote: "I'm tired of coordinating multiple consultants and contractors",
    headingWhite: "One Team.",
    headingGreen: "One Responsibility.",
    body: "One integrated team manages every discipline, giving you a single point of accountability.",
  },
  {
    label: "Common Concern 3:",
    quote: "I'm worried costs will spiral out of control",
    headingWhite: "One Price.",
    headingGreen: "No Surprises.",
    body: "Transparent, fixed-scope pricing agreed upfront, with zero hidden costs along the way.",
  },
  {
    label: "Common Concern 4:",
    quote: "I don't know if my vision will actually get built the way I imagined",
    headingWhite: "Your Vision,",
    headingGreen: "Exactly Realized.",
    body: "From concept to handover, every detail is executed exactly as designed.",
  },
];

function ConcernCard({ concern }: { concern: (typeof concerns)[number] }) {
  return (
    <div
      className="font-opensans relative w-123.75 shrink-0 overflow-hidden rounded-3xl border border-white/15 bg-white/5 px-6 py-3.5 text-center backdrop-blur-md"
      style={{ height: "380.03192138671875px" }}
    >
      <Image
        src="/grids.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="495px"
        className="scale-150 object-cover opacity-70 blur-xl"
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="mt-14 flex flex-col gap-4">
          <p className="text-base leading-none font-bold text-[#25975B]">{concern.label}</p>
          <p className="text-base leading-none text-white/60 italic">&ldquo;{concern.quote}&rdquo;</p>
        </div>

        <div className="mb-14 flex flex-col gap-4">
          <p className="text-2xl leading-none font-bold">
            <span className="text-[#25975B]">{concern.headingWhite}</span>
            <br />
            <span className="text-[#25975B]">{concern.headingGreen}</span>
          </p>
          <p className="text-base leading-5 text-white/60">{concern.body}</p>
        </div>
      </div>
    </div>
  );
}

export default function DifferenceMarquee() {
  const track = [...concerns, ...concerns];

  return (
    <section className="relative overflow-hidden bg-[#0F0F0F] py-24">
      <Image
        src="/grids.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none object-cover mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-opensans text-[32px] leading-tight font-bold text-white sm:text-[40px]">
          The <span className="font-serif font-bold text-emerald-600 italic">Difference</span>{" "}
          You&apos;ll Feel
        </h2>
        <p className="mt-4 text-white/60">
          The right partner doesn&apos;t just build better. They make every stage of the journey better.
        </p>
      </div>

      <div className="relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-6">
          {track.map((concern, i) => (
            <ConcernCard key={`${concern.label}-${i}`} concern={concern} />
          ))}
        </div>
      </div>

      <div className="relative mt-14 flex justify-center px-6">
        <a
          href="#feel-the-difference"
          className="font-opensans inline-flex h-11 items-center justify-center rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
        >
          Feel The Difference Yourself
        </a>
      </div>
    </section>
  );
}
