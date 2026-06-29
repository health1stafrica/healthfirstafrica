"use client";
import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "motion/react";

interface StatItem {
  metric: string;
  label: string;
  title: string;
  description: string;
}

export default function Impact() {
  const impactStats: StatItem[] = [
    {
      metric: "11k+",
      label: "Clients Reached",
      title: "Essential Care across FCT",
      description:
        "Through community outreach, facility-based support, and targeted health interventions, we provided essential health education and services to over 11,000 individuals, improving healthcare access and local outcomes.",
    },
    {
      metric: "700+",
      label: "Providers Trained",
      title: "Upskilling Local Healthcare Professionals",
      description:
        "We equipped over 700 healthcare professionals with specialized skills in maternal, newborn, and child health, HIV prevention, and client-centered care — permanently elevating service quality.",
    },
    {
      metric: "5k+",
      label: "Children Monitored",
      title: "Early Development & Well-being",
      description:
        "Regular field follow-ups, growth monitoring, and efficient medical referrals helped ensure the ongoing well-being and survival of more than 5,000 children across our focus communities.",
    },
    {
      metric: "500+",
      label: "Caregivers Empowered",
      title: "Transforming Domestic Support Systems",
      description:
        "We trained over 500 caregivers in vital nutrition, early childhood development, and disease prevention techniques — helping them better support and protect the children in their direct care.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle through stats every 7 seconds unless interacted with
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % impactStats.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [impactStats.length]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="impact"
      className="bg-[#F9F5EF] py-24 px-6 md:px-12 lg:px-24 "
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Heading & Numeric Selector Grid */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-3">
              <span className="text-[#3C8A4E] text-xs font-bold tracking-widest uppercase block">
                Our Track Record
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
                Our Impact
              </h2>
              <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
              <p className="text-[#1F1F1F]/80 text-base md:text-lg pt-2 max-w-md">
                Measurable change, real lives transformed. Click across our key milestones to see how we&apos;re making a difference.
              </p>
            </div>

            {/* Metric Button Grid */}
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      isActive
                        ? "bg-[#194E6B] border-[#194E6B] text-white shadow-xl shadow-[#194E6B]/15 scale-[1.02]"
                        : "bg-white/60 border-[#194E6B]/10 text-[#1F1F1F] hover:bg-white hover:border-[#194E6B]/30"
                    }`}
                  >
                    <h3
                      className={`text-3xl md:text-4xl font-black tracking-tight ${
                        isActive ? "text-white" : "text-[#3C8A4E]"
                      }`}
                    >
                      {item.metric}
                    </h3>
                    <p
                      className={`text-xs md:text-sm font-medium mt-1 ${
                        isActive ? "text-white/80" : "text-[#1F1F1F]/60"
                      }`}
                    >
                      {item.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Narrative Focus Window */}
          <div className="lg:col-span-6 lg:pt-14 h-full w-full">
            <div className="bg-white rounded-3xl border border-black/[0.02] shadow-xl shadow-black/[0.01] p-8 md:p-10 min-h-[300px] flex flex-col justify-between relative overflow-hidden group">
              {/* Decorative brand watermarking inside card */}
              <div className="absolute right-[-10%] top-[-10%] w-40 h-40 bg-[#3C8A4E]/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-4 my-auto"
                >
                  <span className="text-[#3C8A4E] text-xs font-bold tracking-wider uppercase bg-[#3C8A4E]/10 px-3 py-1 rounded-md inline-block">
                    {impactStats[activeIndex].metric} Total Impact
                  </span>
                  <h4 className="text-2xl font-bold text-[#194E6B] tracking-tight leading-snug">
                    {impactStats[activeIndex].title}
                  </h4>
                  <p className="text-[#1F1F1F] text-base md:text-lg leading-relaxed opacity-95">
                    {impactStats[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicator Track line */}
              <div className="w-full bg-[#194E6B]/10 h-1 absolute bottom-0 left-0 rounded-b-3xl overflow-hidden">
                <motion.div
                  key={activeIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="bg-[#3C8A4E] h-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}