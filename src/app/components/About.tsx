"use client";
import Image from "next/image";
import { motion, Variants } from "motion/react";

export default function AboutUs() {
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
      id="about" 
      className="relative bg-[#F9F5EF] py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Subtle, non-intrusive background brand element */}
      <div className="absolute right-[-2%] bottom-[-2%] w-80 h-80 pointer-events-none opacity-[0.04] select-none">
        <Image
          src="/assets/logo.png"
          alt="Health First Africa"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
              About Us
            </h2>
            <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
          </motion.div>

          {/* Core Statement */}
          <motion.div variants={itemVariants}>
            <p className="text-[] text-xl md:text-2xl font-medium leading-relaxed text-[#194E6B]/90">
              <span className="font-bold text-[#3C8A4E]">Health First Africa</span> is a registered non-profit health NGO in Abuja, Nigeria, dedicated to improving health outcomes and promoting equitable healthcare access for underserved populations.
            </p>
          </motion.div>

          {/* Detailed Paragraphs Split */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#194E6B]/10 text-[#1F1F1F] text-base md:text-lg leading-relaxed">
            <div>
              <p>
                As one of the premier healthcare NGOs in Nigeria, we commit to ensuring complete transparency, strict accountability, and the absolute highest standards of service delivery across all of our community health programs.
              </p>
            </div>
            
            <div>
              <p>
                Through calculated resource distribution and verified field interventions, we work alongside local stakeholders to maximize the long-term operational impact of our medical and structural healthcare initiatives.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}