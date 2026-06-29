"use client";
import { motion, Variants } from "motion/react";

export default function Mission() {
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
      id="mission" 
      className="bg-white py-24 px-6 md:px-12 lg:px-24 border-t border-brand-navy/5"
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
              Our Foundations
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
              Our Mission
            </h2>
            <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
          </motion.div>

          {/* Core Statement */}
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#194E6B]/90">
              <span className="font-bold text-[#3C8A4E]">Health First Africa</span> is dedicated to improving the quality of life for vulnerable and underserved populations in Nigeria through the delivery of inclusive, high-impact health and social interventions.
            </p>
          </motion.div>

          {/* Detailed Paragraphs */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#194E6B]/10 text-[#1F1F1F] text-base md:text-lg leading-relaxed">
            <div className="space-y-4">
              <p>
                We focus on combating HIV/AIDS, enhancing Reproductive, Maternal, Newborn, and Child Health (RMNCH), and promoting youth empowerment and economic resilience as pillars of lasting community transformation.
              </p>
              <p>
                Our mission is driven by a commitment to expanding access to comprehensive, people-centered healthcare services, advancing health education, and addressing health disparities through community-based and culturally relevant approaches.
              </p>
            </div>
            
            <div className="space-y-4">
              <p>
                We empower individuals—especially women, adolescents, and young people—with the tools, knowledge, and opportunities to lead healthy and productive lives.
              </p>
              <p>
                Through strategic partnerships, programming, and capacity building, we work to strengthen health systems, reduce stigma, and foster economic independence. At our core is the belief that sustainable development begins with health equity, empowerment, and dignity for all.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}