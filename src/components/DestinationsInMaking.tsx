import Image from "next/image";

// Placeholder photos — swap each `image` for the real construction-stage
// photo once it's dropped into /public.
const projects = [
  { typeBadge: "Boho Villa", stageBadge: "Designing Stage", image: "/temp/1.png" },
  { typeBadge: "Modern Resort", stageBadge: "Interior Stage", image: "/temp/3.png" },
  { typeBadge: "Boutique Resort", stageBadge: "Under Construction", image: "/temp/5.png" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/40 bg-black/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
      {children}
    </span>
  );
}

export default function DestinationsInMaking() {
  return (
    <section className="relative bg-[#0F0F0F] py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-opensans text-[32px] leading-tight font-bold text-white sm:text-[44px] lg:text-[52px]">
          Destinations In The <span className="font-serif font-bold text-emerald-600 italic">Making</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          The strongest proof isn&apos;t always found in what&apos;s been completed- it&apos;s found in what&apos;s
          actively taking shape.
        </p>

        <div className="mt-14 grid grid-cols-1 justify-items-center gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.typeBadge}
              className="flex w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-black"
              style={{ aspectRatio: "400/458" }}
            >
              <div className="relative flex-1">
                <Image
                  src={project.image}
                  alt={project.typeBadge}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge>{project.typeBadge}</Badge>
                  <Badge>{project.stageBadge}</Badge>
                </div>

                <div className="absolute bottom-4 left-4">
                  <h3 className="font-opensans text-xl font-bold text-white">Riverstone Resort</h3>
                  <p className="text-sm text-white/70">Rishikesh, Uttarakhand</p>
                </div>
              </div>

              <div className="bg-black px-1 py-4">
                <p className="font-opensans text-lg font-semibold text-white">Master Planning • Architecture</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-opensans text-2xl font-bold text-white sm:text-3xl">
            Perhaps The Next One Is <span className="font-serif font-bold text-emerald-600 italic">Yours!</span>
          </h3>
          <a
            href="#bring-your-vision"
            className="font-opensans mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-emerald-600 px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Bring Your Vision To The Table
          </a>
        </div>
      </div>
    </section>
  );
}
