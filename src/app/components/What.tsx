"use client";
import { JSX } from "react";
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
  HeartPulse,
  GraduationCap,
  Sprout,
} from "lucide-react";
import { motion, Variants } from "motion/react";

type CategoryItem = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
};

type Pillar = {
  key: string;
  label: string;
  lead: JSX.Element;
  accent: string;
  items: CategoryItem[];
};

const pillars: Pillar[] = [
  {
    key: "health-access",
    label: "Health Access",
    lead: <HeartPulse className="w-6 h-6" />,
    accent: "from-[#3C8A4E] to-[#2e6b3c]",
    items: [
      {
        id: "h-1",
        icon: <Stethoscope className="w-5 h-5" />,
        title: "Expanding Access to Healthcare",
        description:
          "People-centered health services, ensuring even the most remote communities are not left behind.",
      },
      {
        id: "h-2",
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "Combating HIV/AIDS",
        description:
          "From testing to treatment and psychosocial support, we tackle HIV with compassion and science.",
      },
      {
        id: "h-3",
        icon: <Baby className="w-5 h-5" />,
        title: "Promoting RMNCH",
        description:
          "Essential care from reproductive health to newborn services—building stronger families.",
      },
    ],
  },
  {
    key: "empowerment-education",
    label: "Empowerment & Education",
    lead: <GraduationCap className="w-6 h-6" />,
    accent: "from-[#194E6B] to-[#123b52]",
    items: [
      {
        id: "e-1",
        icon: <Users className="w-5 h-5" />,
        title: "Empowering Youth",
        description:
          "We equip adolescents with life skills, leadership tools, and sexual health education.",
      },
      {
        id: "e-2",
        icon: <Coins className="w-5 h-5" />,
        title: "Economic Resilience",
        description:
          "Helping women and youth break cycles of poverty through vocational and income programs.",
      },
      {
        id: "e-3",
        icon: <BookOpen className="w-5 h-5" />,
        title: "Advancing Health Education",
        description:
          "Evidence-based campaigns that empower people to make informed, life-saving choices.",
      },
    ],
  },
  {
    key: "sustainability-justice",
    label: "Sustainability & Justice",
    lead: <Sprout className="w-6 h-6" />,
    accent: "from-[#3C8A4E] to-[#194E6B]",
    items: [
      {
        id: "s-1",
        icon: <Building2 className="w-5 h-5" />,
        title: "Community-Driven Solutions",
        description:
          "Programs co-created with local communities for culturally relevant, sustainable impact.",
      },
      {
        id: "s-2",
        icon: <Handshake className="w-5 h-5" />,
        title: "Strategic Partnerships",
        description:
          "Working with governments, NGOs, and donors to drive lasting health systems change.",
      },
      {
        id: "s-3",
        icon: <Scale className="w-5 h-5" />,
        title: "Tackling Health Inequities",
        description:
          "Advocating for inclusion, access, and systemic reform to fight injustice in health.",
      },
      {
        id: "s-4",
        icon: <BarChart4 className="w-5 h-5" />,
        title: "Ensuring Long-Term Impact",
        description:
          "Data-driven, adaptive, and accountable work—ensuring change lasts where it's needed.",
      },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function WhatWeDo() {
  return (
    <section id="services" className="bg-[#F9F5EF] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4 max-w-3xl"
        >
          <span className="text-[#3C8A4E] text-xs font-bold tracking-widest uppercase block">
            Our Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
            What We Do
          </h2>
          <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
          <p className="text-lg md:text-xl font-medium leading-relaxed pt-2 text-[#194E6B]/90">
            At Health First Africa, our mission is a call to action. As a
            dedicated health NGO in Abuja, Nigeria, we design community-driven
            solutions for local health challenges through equity and empowerment.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.key}
              variants={cardVariants}
              className="bg-white rounded-3xl border border-[#194E6B]/[0.06] shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Gradient header */}
              <div
                className={`bg-gradient-to-br ${pillar.accent} p-6 flex items-center gap-4`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white ring-1 ring-white/20">
                  {pillar.lead}
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight leading-tight">
                  {pillar.label}
                </h3>
              </div>

              {/* Program list */}
              <div className="p-6 flex flex-col divide-y divide-[#194E6B]/[0.07]">
                {pillar.items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="shrink-0 w-9 h-9 rounded-xl bg-[#3C8A4E]/10 text-[#3C8A4E] flex items-center justify-center group-hover:bg-[#3C8A4E] group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#194E6B] tracking-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[#1F1F1F]/70 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
