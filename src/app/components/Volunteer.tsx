"use client";
import Link from "next/link";
import { motion, Variants } from "motion/react";

export default function VolunteerWithUs() {
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
      id="volunteer" 
      className="bg-[#F9F5EF] py-24 px-6 md:px-12 lg:px-24 "
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-3">
            <span className="text-[#3C8A4E] text-xs font-bold tracking-widest uppercase block">
              Get Involved
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
              Volunteer With Us
            </h2>
            <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
          </motion.div>

          {/* Main Call to Action Statement */}
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#194E6B]/90">
              Join our mission to create healthier communities! As a volunteer, you’ll play a vital role in supporting our programs, from health education and outreach to community mobilization and empowerment.
            </p>
          </motion.div>

          {/* Supporting Text Block */}
          <motion.div 
            variants={itemVariants} 
            className="pt-4 border-t border-[#194E6B]/10 text-[#1F1F1F] text-base md:text-lg leading-relaxed max-w-3xl"
          >
            <p>
              Whether you have a few hours a week or want to contribute your specialized skills on a project basis, your time and passion can make a real difference. Together, we can build a stronger, healthier future for all.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6">
            <Link href="/#contact" className="btn-primary">
              Get in Touch
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}