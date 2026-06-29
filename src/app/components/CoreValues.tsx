"use client";
import { motion, Variants } from "motion/react";

export default function CoreValues() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
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

  const values = [
    {
      title: "Equity",
      content:
        "We believe that everyone, regardless of background, status, or circumstance, deserves equal access to quality healthcare and opportunities. Our programs are designed to remove barriers and promote fairness in every community we serve.",
    },
    {
      title: "Dignity",
      content:
        "We treat every individual with respect, compassion, and empathy. Upholding human dignity is at the heart of our work, ensuring that clients, staff, and partners are valued and heard.",
    },
    {
      title: "Partnerships",
      content:
        "We thrive on collaboration. By building strong partnerships with communities, governments, and organizations, we amplify impact and co-create sustainable solutions for health and development.",
    },
    {
      title: "Accountability",
      content:
        "We are committed to transparency, integrity, and excellence. We take responsibility for our actions and continuously measure our performance to ensure we deliver on our promises.",
    },
  ];

  return (
    <section 
      id="values" 
      className="bg-[#F9F5EF] py-24 px-6 md:px-12 lg:px-24 "
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-3">
            <span className="text-[#3C8A4E] text-xs font-bold tracking-widest uppercase block">
              Our Principles
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
              Our Core Values
            </h2>
            <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
          </motion.div>

          {/* Intro Statement */}
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#194E6B]/90">
              At the heart of Health First Africa are values that guide everything we do—from strategic planning to the smallest acts of service.
            </p>
          </motion.div>

          {/* Grid Layout Container */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-6 border-t border-[#194E6B]/10"
          >
            {values.map((value, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-bold text-[#3C8A4E] tracking-tight">
                  {value.title}
                </h3>
                <p className="text-brand-ink text-base md:text-lg leading-relaxed opacity-95">
                  {value.content}
                </p>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}