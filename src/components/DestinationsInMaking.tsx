import Image from "next/image";

// Placeholder photos — swap each `image` for the real construction-stage
// photo once it's dropped into /public.
const projects = [
  {
    typeBadge: "Nature Retreat",
    stageBadge: "Final Handover",
    name: "Alpine Meadow",
    location: "Goa",
    tagline: "Architecture . Interiors",
    image: "/dim/1.png",
  },
  {
    typeBadge: "Luxury Sanctuary",
    stageBadge: "Interior Execution",
    name: "Aurelia Grove Resort",
    location: "Punjab",
    tagline: "Architecture . Interiors",
    image: "/dim/2.png",
  },
  {
    typeBadge: "Signature Retreat",
    stageBadge: "Under Development",
    name: "Celestia Valley",
    location: "Nainital, Uttarakhand",
    tagline: "Architecture . Interiors",
    image: "/dim/3.png",
  },
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
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-12">
        <h2 className="font-opensans text-[32px] leading-tight font-bold text-white sm:text-[44px] lg:text-heading">
          Destinations In The <span className="font-serif font-bold text-emerald-600 italic">Making</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          The strongest proof isn&apos;t always found in what&apos;s been completed- it&apos;s found in what&apos;s
          actively taking shape.
        </p>


        <div className="mt-14 grid grid-cols-1 justify-items-center gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={project.typeBadge}
              className={`relative w-full max-w-[400px] overflow-hidden rounded-2xl ${i === projects.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={{ aspectRatio: "400/458" }}
            >
              {/* Image fills the full card */}
              <Image
                src={project.image}
                alt={project.typeBadge}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />

              {/* Gradient + blur overlay covering only the bottom ~40% — from just above button up */}
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', maskImage: 'linear-gradient(to top, black 55%, transparent)', WebkitMaskImage: 'linear-gradient(to top, black 55%, transparent)' }} />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge>{project.typeBadge}</Badge>
                <Badge>{project.stageBadge}</Badge>
              </div>

              {/* Resort name & location */}
              <div className="absolute bottom-14 left-4">
                <h3 className="font-opensans text-xl font-bold text-white">{project.name}</h3>
                <p className="text-sm text-white/70">{project.location}</p>
              </div>

              {/* Tagline strip — over the image at the very bottom */}
              <div className="absolute inset-x-0 bottom-0 px-4 py-4">
                <p className="font-opensans text-lg font-semibold text-white">{project.tagline}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-opensans  font-bold text-white sm:text-2xl">
            Perhaps The Next One Is <span className="font-serif font-bold text-emerald-600 italic">Yours!</span>
          </h3>
        
        </div>
      </div>
    </section>
  );
}
