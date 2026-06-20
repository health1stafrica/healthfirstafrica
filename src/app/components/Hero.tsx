"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";

const images = [
  "/assets/img (1).jpg",
  "/assets/img (2).jpg",
  "/assets/img (3).jpg",
  "/assets/img (4).jpg",
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="relative h-screen 2xl:h-[900px] w-full 2xl:w-[1440px] mx-auto overflow-hidden bg-[#0a0f1d]">
      {/* Background Images Layer */}
      <div className="absolute inset-0 z-0">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-45 md:opacity-55" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Health First Africa outreach slide"
              fill
              priority={index === 0}
              className="object-cover object-center scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
            />
          </div>
        ))}
      </div>

      {/* Premium Directional Gradient Overlay */}
      {/* Darker on the left to shield the text, transparent on the right to preserve the photo */}
      <div className="absolute inset-0 z-15 bg-gradient-to-r from-black via-black/80 to-transparent md:from-[#0a0f1d]/95 md:via-[#0a0f1d]/75 md:to-transparent" />
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Structural Layout Container */}
      <div className="relative z-20 mx-auto max-w-7xl h-full px-6 md:px-12 lg:px-16 flex flex-col justify-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8 max-w-3xl"
        >
          {/* Tagline Badge (Fixed the unreadable green text) */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 bg-[#3C8A4E]/20 border border-[#3C8A4E]/40 px-3.5 py-1.5 rounded-full text-[#52be6c] text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3C8A4E] animate-pulse" />
              Abuja, Nigeria
            </span>
          </motion.div>

          {/* Premium Typography Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
          >
            Health First.<br />
            <span className="text-[#F9F5EF] font-light italic opacity-85">Hope Always.</span>
          </motion.h1>

          {/* Clean Description */}
          <motion.p
            variants={itemVariants}
            className="text-[#F9F5EF]/90 text-md sm:text-lg md:text-xl leading-relaxed font-normal max-w-2xl"
          >
            Every mother. Every child. Every community. As one of the leading health NGOs in Nigeria, we bridge gaps in healthcare access with compassion, data, and local partnerships.
          </motion.p>

          {/* Actions Row */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/donate"
              className="inline-block bg-[#3C8A4E] hover:bg-[#347844] text-white px-8 py-3.5 rounded-xl text-base font-bold tracking-wide shadow-xl shadow-[#3C8A4E]/20 hover:shadow-none transition-all duration-300"
            >
              Donate Now
            </Link>
            <Link
              href="/gallery"
              className="inline-block bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-xl text-base font-semibold backdrop-blur-md hover:bg-white hover:text-[#194E6B] transition-all duration-300"
            >
              Explore Our Work
            </Link>
          </motion.div>
        </motion.div>

        {/* Flat Modern Pagination Indicators */}
        <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 lg:left-16 lg:right-16 2xl:left-0 2xl:right-0 z-30 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className="h-1 flex-1 bg-white/15 rounded-full overflow-hidden relative cursor-pointer"
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentImageIndex && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7.5, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-[#3C8A4E]"
                />
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}