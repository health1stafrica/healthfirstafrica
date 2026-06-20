"use client";
import { useState, JSX } from "react";
import {
  Stethoscope,
  ShieldCheck,
  Baby,
  Users,
  Coins,
  BookOpen,
  Building2,
  Handshake,
  Scale,
  BarChart4,
  ArrowRight
} from "lucide-react";
import { motion, Variants, AnimatePresence } from "motion/react";

type CategoryItem = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
};

const categories: Record<string, CategoryItem[]> = {
  "Health Access": [
    {
      id: "h-1",
      icon: <Stethoscope className="w-6 h-6 text-[#3C8A4E]" />,
      title: "Expanding Access to Healthcare",
      description: "We provide people-centered health services, ensuring even the most remote communities are not left behind.",
    },
    {
      id: "h-2",
      icon: <ShieldCheck className="w-6 h-6 text-[#194E6B]" />,
      title: "Combating HIV/AIDS",
      description: "From testing to treatment and psychosocial support, we tackle HIV with compassion and science.",
    },
    {
      id: "h-3",
      icon: <Baby className="w-6 h-6 text-[#3C8A4E]" />,
      title: "Promoting RMNCH",
      description: "We deliver essential care from reproductive health to newborn services—building stronger families.",
    },
  ],
  "Empowerment & Education": [
    {
      id: "e-1",
      icon: <Users className="w-6 h-6 text-[#194E6B]" />,
      title: "Empowering Youth",
      description: "We train and equip adolescents with life skills, leadership tools, and sexual health education.",
    },
    {
      id: "e-2",
      icon: <Coins className="w-6 h-6 text-[#3C8A4E]" />,
      title: "Economic Resilience",
      description: "We enable women and youth to break cycles of poverty through vocational and income-generating programs.",
    },
    {
      id: "e-3",
      icon: <BookOpen className="w-6 h-6 text-[#194E6B]" />,
      title: "Advancing Health Education",
      description: "We run evidence-based campaigns that empower people to make informed, life-saving health choices.",
    },
  ],
  "Sustainability & Justice": [
    {
      id: "s-1",
      icon: <Building2 className="w-6 h-6 text-[#3C8A4E]" />,
      title: "Community-Driven Solutions",
      description: "Our programs are co-created with local communities for culturally relevant and sustainable impact.",
    },
    {
      id: "s-2",
      icon: <Handshake className="w-6 h-6 text-[#194E6B]" />,
      title: "Strategic Partnerships",
      description: "We work with governments, NGOs, and donors to expand reach and create lasting health systems change.",
    },
    {
      id: "s-3",
      icon: <Scale className="w-6 h-6 text-[#3C8A4E]" />,
      title: "Tackling Health Inequities",
      description: "We fight social injustices in health by advocating for inclusion, access, and systemic reform.",
    },
    {
      id: "s-4",
      icon: <BarChart4 className="w-6 h-6 text-[#194E6B]" />,
      title: "Ensuring Long-Term Impact",
      description: "Our work is data-driven, adaptive, and accountable—ensuring lasting change where it `&#39;`s needed most.",
    },
  ],
};

export default function WhatWeDo() {
  const categoryKeys = Object.keys(categories);
  const [activeCategory, setActiveCategory] = useState<string>(categoryKeys[0]);

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
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="services" 
      className="bg-[#F9F5EF] py-24 px-6 md:px-12 lg:px-24 "
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-16"
        >
          {/* Header Block */}
          <div className="space-y-4 max-w-6xl">
            <span className="text-[#3C8A4E] text-xs font-bold tracking-widest uppercase block">
              Our Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
              What We Do
            </h2>
            <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
            <p className="text-lg md:text-xl font-medium leading-relaxed pt-2 text-[#194E6B]/90">
              At Health First Africa, our mission is a call to action. As a dedicated health NGO in Abuja, Nigeria, we design community-driven solutions for local health challenges through equity and empowerment.
            </p>
          </div>

          {/* Interactive Core Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-[#194E6B]/10">
            
            {/* Left Nav Menu Selector */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {categoryKeys.map((key) => {
                const isActive = key === activeCategory;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`group flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#194E6B] border-[#194E6B] text-white shadow-xl shadow-[#194E6B]/15"
                        : "bg-white/60 border-[#194E6B]/10 text-[#1F1F1F] hover:bg-white hover:border-[#194E6B]/30"
                    }`}
                  >
                    <span className={`font-bold text-base md:text-lg ${isActive ? "text-white" : "text-[#194E6B]"}`}>
                      {key}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? "text-[#3C8A4E] translate-x-1" : "text-[#194E6B]/40 group-hover:translate-x-0.5"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right Display Grid Window */}
            <div className="lg:col-span-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {categories[activeCategory].map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-6 border border-black/[0.02] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="p-3 bg-[#194E6B]/5 rounded-xl inline-block mb-4">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-[#194E6B] tracking-tight mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[#1F1F1F]/80 text-sm md:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}