"use client";

import Image from "next/image";
import { motion } from "motion/react";
import PageShell from "@/app/components/PageShell";

const galleryItems = [
  { type: "image", src: "/assets/img (1).jpg", alt: "Community health outreach" },
  { type: "image", src: "/assets/img (2).jpg", alt: "Medical training session" },
  { type: "image", src: "/assets/img (3).jpg", alt: "Child health monitoring" },
  { type: "image", src: "/assets/img (4).jpg", alt: "Community engagement" },
  { type: "image", src: "/assets/img (5).jpg", alt: "Health education programme" },
  { type: "image", src: "/assets/img (6).jpg", alt: "Outreach team in the field" },
  { type: "image", src: "/assets/img (7).jpg", alt: "Medical supplies distribution" },
  { type: "image", src: "/assets/img (8).jpg", alt: "Community wellness event" },
  { type: "image", src: "/assets/img (9).jpg", alt: "Volunteer health workers" },
  { type: "image", src: "/assets/img (10).jpg", alt: "Maternal health support" },
  { type: "image", src: "/assets/img (12).jpg", alt: "Rural clinic outreach" },
  { type: "image", src: "/assets/img (13).jpg", alt: "Health awareness campaign" },
  { type: "image", src: "/assets/img (14).jpg", alt: "Community health screening" },
  { type: "image", src: "/assets/img (15).jpg", alt: "Youth health programme" },
  { type: "image", src: "/assets/img (16).jpg", alt: "Medical outreach team" },
  { type: "image", src: "/assets/img (17).jpg", alt: "Healthcare access initiative" },
  { type: "image", src: "/assets/img (18).jpg", alt: "Community health workers" },
  { type: "image", src: "/assets/img (19).jpg", alt: "Field health programme" },
  { type: "image", src: "/assets/img (20).jpg", alt: "Patient support services" },
  { type: "image", src: "/assets/img (21).jpg", alt: "Health NGO community work" },
  { type: "video", src: "/assets/vid (1).mp4", alt: "Outreach programme video 1" },
  { type: "video", src: "/assets/vid (2).mp4", alt: "Outreach programme video 2" },
  { type: "video", src: "/assets/vid (3).mp4", alt: "Outreach programme video 3" },
];

export default function GalleryPage() {
  const photos = galleryItems.filter((item) => item.type === "image");
  const videos = galleryItems.filter((item) => item.type === "video");

  return (
    <PageShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <span className="section-eyebrow">Visual Stories</span>
        <h1 className="section-title mt-3">Gallery</h1>
        <div className="section-accent mx-auto" />
        <p className="text-brand-ink/80 max-w-2xl mx-auto text-base md:text-lg mt-6">
          Moments from our health outreaches, community drives, and impactful
          programmes across Nigeria.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-brand-green mb-6">Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-md border border-brand-navy/5"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-brand-green mb-6">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((item) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-lg border border-brand-navy/5 bg-black"
            >
              <video
                src={item.src}
                controls
                aria-label={item.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </PageShell>
  );
}
