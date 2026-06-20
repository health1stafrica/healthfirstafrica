"use client";
import { motion, Variants } from "motion/react";

export default function Vision() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="vision" 
      className="bg-[#F9F5EF] py-24 px-6 md:px-12 lg:px-24 "
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-10"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-3">
            <span className="text-[#3C8A4E] text-xs font-bold tracking-widest uppercase block">
              Our Future
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
              Our Vision
            </h2>
            <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
          </motion.div>

          {/* Core Vision Statement */}
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#194E6B]/90">
              To foster healthy and socially empowered communities through access to quality health and social services for structurally underserved populations.
            </p>
          </motion.div>

          {/* Supporting Core Pillars Split */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#194E6B]/10 text-[#1F1F1F] text-base md:text-lg leading-relaxed">
            <div>
              <p className="font-semibold text-[#194E6B] mb-1">Health Equity First</p>
              <p className="text-sm md:text-base opacity-90">
                We envision a society where geographic location, economic status, or social standing no longer dictate an individual `&#39;`s quality of care or life expectancy.
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-[#3C8A4E] mb-1">Social Empowerment</p>
              <p className="text-sm md:text-base opacity-90">
                By bridging the gap between healthcare access and systemic development, we look forward to building self-sustaining, resilient local communities.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}