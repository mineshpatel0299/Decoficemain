"use client";

import Image from "next/image";
import { useState } from "react";
import ProjectGallery, { type GalleryProject } from "./commercial/ProjectGallery";

const eutierraPhotos = [
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791876815/Eutierria_14_xv3edt.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791876815/Eutierria_11_ycobeb.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791876815/Eutierria_13_bt8rkt.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791876815/Eutierria_10_qmmdpp.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791876814/Eutierria_12_yjaujj.jpg",
];

const villaMandarinaPhotos = [
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877670/Villa_Mandarina_17.png_z7hagv.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877669/Villa_Mandarina_12.jpg_txvfmy.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877669/Villa_Mandarina_11.jpg_qail3m.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877667/Villa_Mandarina_10.jpg_pfs3nc.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877859/Villa_Mandarina_9.jpg_cstku9.jpg",
];

const woodenVillaPhotos = [
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877334/Wooden_Villa_5_ltt7jj.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877333/Wooden_Villa_2_yhytut.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877333/Wooden_Villa_16_md9t1a.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877310/Wooden_Villa_14_trfe9v.jpg",
  "https://res.cloudinary.com/de4pazo51/image/upload/v1791877310/Wooden_Villa_1_k9r8du.jpg",
];

const projects = [
  {
    typeBadge: "Nature Retreat",
    name: "Eutierra Wellness Centre",
    tagline: "Architecture . Interiors",
    image: eutierraPhotos[3],
    gallery: eutierraPhotos,
  },
  {
    typeBadge: "Luxury Sanctuary",
    name: "Villa Mandarina",
    tagline: "Architecture . Interiors",
    image: villaMandarinaPhotos[0],
    gallery: villaMandarinaPhotos,
  },
  {
    typeBadge: "Signature Retreat",
    name: "Wooden Villa",
    tagline: "Architecture . Interiors",
    image: woodenVillaPhotos[0],
    gallery: woodenVillaPhotos,
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
  const [activeGallery, setActiveGallery] = useState<GalleryProject | null>(null);

  return (
    <section className="relative bg-[#0F0F0F] pt-20 pb-0 lg:pt-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-12">
        <h2 className="font-opensans text-[32px] leading-tight font-bold text-white sm:text-[44px] lg:text-heading">
          Destinations worth <span className="font-serif font-bold text-emerald-600 italic">Imagining</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          A curated look at resort &amp; retreat styles, from hillside retreats to
          beach villas, and the guest experiences that well-planned architecture and
          interiors make possible.
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
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />

              {/* Gradient + blur overlay covering only the bottom ~40% — from just above button up */}
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', maskImage: 'linear-gradient(to top, black 55%, transparent)', WebkitMaskImage: 'linear-gradient(to top, black 55%, transparent)' }} />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge>{project.typeBadge}</Badge>
              </div>

              {/* Resort name */}
              <div className="absolute bottom-14 left-4">
                <h3 className="font-opensans text-xl font-bold text-white">{project.name}</h3>
              </div>

              {/* Tagline strip — over the image at the very bottom */}
              <div className="absolute inset-x-0 bottom-0 px-4 py-4">
                <p className="font-opensans text-lg font-semibold text-white">{project.tagline}</p>
              </div>

              {project.gallery && (
                <button
                  type="button"
                  onClick={() => setActiveGallery({ title: project.name, location: "", images: project.gallery })}
                  aria-label={`View ${project.gallery.length} photos of ${project.name}`}
                  className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-opensans  font-bold text-white sm:text-2xl">
            Perhaps The Next One Is <span className="font-serif font-bold text-emerald-600 italic">Yours!</span>
          </h3>
        
        </div>
      </div>
      {activeGallery && <ProjectGallery project={activeGallery} onClose={() => setActiveGallery(null)} />}
    </section>
  );
}
