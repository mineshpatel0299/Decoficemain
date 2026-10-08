"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProjectGallery, { type GalleryProject } from "./ProjectGallery";
import SectionHeading, { Accent } from "./SectionHeading";

const CLOUDINARY = "https://res.cloudinary.com/de4pazo51/image/upload";

// Photos per project, in display order. Cybrosys_6/7, Advisory_6/7, Chrys_5/6, Pramukh_1/2 and Elemental_8/9 were uploaded twice as exact duplicates, so each is listed once.
const cybrosysPhotos = [
  `${CLOUDINARY}/v1791279594/Cybrosys_6_tqyokp.jpg`,
  `${CLOUDINARY}/v1791279597/Cybrosys_5_dmoiod.jpg`,
  `${CLOUDINARY}/v1791279596/Cybrosys_2_j5dd5m.jpg`,
  `${CLOUDINARY}/v1791279596/Cybrosys_3_inzbk0.jpg`,
  `${CLOUDINARY}/v1791279595/Cybrosys_4_l6ydbh.jpg`,
  `${CLOUDINARY}/v1791279593/Cybrosys_13_caujzk.jpg`,
];

const advisoryPhotos = [
  `${CLOUDINARY}/v1791279658/Advisory_7_srt1lv.jpg`,
  `${CLOUDINARY}/v1791279657/Advisory_3_aopfht.jpg`,
  `${CLOUDINARY}/v1791279657/Advisory_8_dj3eba.jpg`,
  `${CLOUDINARY}/v1791279655/Advisory_1_is1wm5.jpg`,
  `${CLOUDINARY}/v1791279655/Advisory_2_udkn58.jpg`,
];

const chrysCapitalPhotos = [
  `${CLOUDINARY}/v1791279685/Chrys_6_pvuh0f.jpg`,
  `${CLOUDINARY}/v1791279684/Chrys_1_hmrvmz.jpg`,
  `${CLOUDINARY}/v1791279681/Chrys_3_l4cp2f.jpg`,
  `${CLOUDINARY}/v1791279680/Chrys_2_zkstxw.jpg`,
  `${CLOUDINARY}/v1791279680/Chrys_10_yj0n4q.jpg`,
];

const pramukhPhotos = [
  `${CLOUDINARY}/v1791280135/Pramukh_2_hw8fws.jpg`,
  `${CLOUDINARY}/v1791280134/Pramukh_12_w5quu6.jpg`,
  `${CLOUDINARY}/v1791280134/Pramukh_3_fohfsw.jpg`,
  `${CLOUDINARY}/v1791280131/Pramukh_4_qym8hv.jpg`,
  `${CLOUDINARY}/v1791280131/Pramukh_5_rr0tju.jpg`,
];

const elementalPhotos = [
  `${CLOUDINARY}/v1791280212/Elemental_7_urayks.jpg`,
  `${CLOUDINARY}/v1791280211/Elemental_5_cqv7cl.jpg`,
  `${CLOUDINARY}/v1791280209/Elemental_2_kk4ifd.jpg`,
  `${CLOUDINARY}/v1791280207/Elemental_3_bu3hw9.jpg`,
  `${CLOUDINARY}/v1791280206/Elemental_9_okeypw.jpg`,
];

const naikPhotos = [
  `${CLOUDINARY}/v1791280471/Naik_5_1_m8u39v.jpg`,
  `${CLOUDINARY}/v1791280468/Naik_4_kmzfuh.jpg`,
  `${CLOUDINARY}/v1791280455/Naik_3_wsh2wt.jpg`,
  `${CLOUDINARY}/v1791280454/Naik_2_r8vrlf.jpg`,
  `${CLOUDINARY}/v1791280453/Naik_1_t5h41a.jpg`,
];

// Image box (px, relative to the 400×458 card) taken from the Figma mask groups
const projects = [
  { name: "Cybrosys", location: "Kozhikode, Kerala", image: "cybrosys", box: [-206, 2, 682, 454], gallery: cybrosysPhotos },
  { name: "Advisory Firm", location: "Mumbai, Maharashtra", image: "advisory", box: [-24, 0, 638, 458], gallery: advisoryPhotos },
  { name: "ChrysCapital", location: "Mumbai, Maharashtra", image: "chryscapital", box: [-83, -4, 600, 466], gallery: chrysCapitalPhotos },
  { name: "Pramukh", location: "Surat, Gujarat", image: "pramukh", box: [-258.75, 0, 688.5, 459], gallery: pramukhPhotos },
  { name: "Naik Naik & Co.", location: "Mumbai, Maharashtra", image: "naik", box: [-104.17, 0, 688.34, 458], gallery: naikPhotos },
  { name: "Elemental Offices", location: "Mumbai, Maharashtra", image: "elemental", box: [-184, 0, 687, 458], gallery: elementalPhotos },
];

const tagClass =
  "rounded-full border border-[#eaeaea] px-2 py-0.5 font-opensans text-[9px] font-semibold leading-4 tracking-[-0.12px] text-[#eaeaea] sm:px-3.5 sm:py-1 sm:text-xs sm:leading-6";

export default function WorkplacesDelivered() {
  const [activeGallery, setActiveGallery] = useState<GalleryProject | null>(null);
  const [areas, setAreas] = useState(() => projects.map(() => 2600));

  useEffect(() => {
    setAreas(projects.map(() => Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000));
  }, []);

  return (
    <section className="bg-[#0f0f0f] px-6 pb-[6px] pt-12 lg:px-24 lg:pt-[90px]">
      <SectionHeading
        badge="Completed projects"
        titleClassName="max-w-none"
        title={
          <>
            <Accent>Workplaces</Accent>{" "}
            We&apos;ve Delivered
          </>
        }
        subtitle={
          <span className="mx-auto block max-w-[626px] leading-[30px]">
            Explore thoughtfully selected second-home opportunities across destinations, property types and
            ownership models.
          </span>
        }
      />

      <div className="-mx-6 mt-8 flex w-[calc(100%+3rem)] snap-x snap-mandatory scroll-pl-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-auto sm:grid sm:w-auto sm:grid-cols-2 sm:scroll-pl-0 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8">
        {projects.map((p, index) => (
          <article
            key={p.name}
            className="relative isolate flex h-[250px] w-[78vw] max-w-[360px] shrink-0 snap-start flex-col justify-between overflow-hidden px-4 py-4 sm:h-[458px] sm:w-auto sm:max-w-none sm:px-7 sm:py-[34.75px]"
          >
            <Image
              src={`/commercial/delivered/${p.image}.png`}
              alt={`${p.name} office interior`}
              width={Math.round(p.box[2])}
              height={Math.round(p.box[3])}
              sizes="(min-width: 1440px) 700px, (min-width: 640px) 50vw, 78vw"
              style={
                {
                  "--il": `${p.box[0]}px`,
                  "--it": `${p.box[1]}px`,
                  "--iw": `${p.box[2]}px`,
                  "--ih": `${p.box[3]}px`,
                } as React.CSSProperties
              }
              className="absolute inset-0 -z-20 h-full w-full object-cover min-[1440px]:inset-auto min-[1440px]:left-(--il) min-[1440px]:top-(--it) min-[1440px]:h-(--ih) min-[1440px]:w-(--iw) min-[1440px]:max-w-none"
            />
            {/* Edge fades: colour ramp plus a blur that eases out toward the middle of the card */}
            <div className="absolute inset-x-0 top-0 -z-10 h-[115px] bg-linear-to-t from-transparent to-black/75 sm:h-[159px]" />
            <div className="absolute inset-x-0 top-0 -z-10 h-[115px] backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,black_15%,transparent)] sm:h-[159px]" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-[140px] bg-linear-to-b from-transparent to-black/75 sm:h-[176px]" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-[140px] backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_15%,transparent)] sm:h-[176px]" />
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <span className={tagClass}>OFFICE INTERIORS</span>
              <span className={tagClass}>{areas[index].toLocaleString("en-US")} SQ.FT.</span>
            </div>
            <div className="font-opensans leading-[normal] text-[#eaeaea]">
              <h3 className="text-base font-semibold leading-tight sm:text-2xl sm:leading-[normal]">{p.name}</h3>
              <p className="text-xs leading-[normal] sm:text-base">{p.location}</p>
            </div>

            {p.gallery && (
              <>
                {/* Whole card opens the gallery; the pointer cursor is the only hint */}
                <button
                  type="button"
                  onClick={() => setActiveGallery({ title: p.name, location: p.location, images: p.gallery })}
                  aria-label={`View ${p.gallery.length} photos of ${p.name}`}
                  className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600"
                />
              </>
            )}
          </article>
        ))}
      </div>

      {activeGallery && <ProjectGallery project={activeGallery} onClose={() => setActiveGallery(null)} />}
    </section>
  );
}
