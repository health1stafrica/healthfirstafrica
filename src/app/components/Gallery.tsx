"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";

const featuredImages = [
  { 
    src: "/assets/img (1).jpg", 
    tag: "Outreach",
    title: "Community Access",
    description: "Delivering essential health services to remote communities across FCT."
  },
  { 
    src: "/assets/img (2).jpg", 
    tag: "Training",
    title: "Provider Upskilling",
    description: "Equipping local professionals with critical maternal and newborn care skills."
  },
  { 
    src: "/assets/img (3).jpg", 
    tag: "Monitoring",
    title: "Child Well-being",
    description: "Growth monitoring and healthcare tracking for infants and children."
  },
];

export default function Gallery() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="gallery" 
      className="bg-[#F9F5EF] py-24 px-6 md:px-12 lg:px-24 border-t border-[#194E6B]/5"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-14"
        >
          {/* Header & CTA */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[#3C8A4E] text-xs font-bold tracking-widest uppercase block">
                Visual Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
                Our Work in Action
              </h2>
              <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
              <p className="text-[#1F1F1F]/80 text-base md:text-lg pt-2">
                Glimpses of our impact — from grassroots community outreach to medical training campaigns across underserved locations.
              </p>
            </div>

            <motion.div variants={itemVariants} className="shrink-0">
              <Link
                href="/gallery"
                className="btn-secondary shrink-0"
              >
                View Full Gallery
              </Link>
            </motion.div>
          </div>

          {/* Balanced 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredImages.map((img, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-black/[0.02] bg-neutral-200 shadow-sm group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-w-6xl) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Fixed gradient shading for base text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300" />

                {/* Animated Info Panel */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-white">
                  <span className="text-[#52be6c] text-[10px] font-black tracking-widest uppercase mb-1">
                    {img.tag}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight mb-1">
                    {img.title}
                  </h3>
                  
                  {/* Smooth reveal description on desktop hover */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden ease-in-out">
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed pt-1">
                      {img.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}