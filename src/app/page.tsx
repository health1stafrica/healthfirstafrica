"use client";
import React, { useEffect, useState } from "react";
import { ArrowUp, Heart } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/About";
import Mission from "./components/Mission";
import Vision from "./components/Vision";
import CoreValues from "./components/CoreValues";
import WhatWeDo from "./components/What";
import Impact from "./components/Impact";
import Gallery from "./components/Gallery";
import VolunteerWithUs from "./components/Volunteer";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

export default function Home() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-brand-cream text-brand-ink antialiased relative min-h-screen">
      <Navbar />
      
      <main id="main-content">
        <Hero />
        <AboutUs />
        <Mission />
        <Vision />
        <CoreValues />
        <WhatWeDo />
        <Impact />
        <Gallery />
        <VolunteerWithUs />
        <ContactUs />
      </main>

      <Footer />

      {/* Persistent Interface Layers */}
      <AnimatePresence>
        {isVisible && (
          <div className="fixed bottom-6 left-6 right-6 md:left-8 md:right-8 z-50 pointer-events-none flex justify-between items-center pb-[env(safe-area-inset-bottom)]">
            
            {/* Target Accent Donate Action Hook */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto"
            >
              <Link
                href="/donate"
                className="btn-primary pl-4 pr-5 py-3 shadow-xl flex items-center gap-2.5 text-sm"
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                <span>Support Our Mission</span>
              </Link>
            </motion.div>

            {/* Micro Scroll-To-Top Engine Anchor */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="pointer-events-auto p-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-hover text-white shadow-xl shadow-brand-navy/20 transition-all duration-300 active:scale-[0.98]"
              aria-label="Scroll view to top of page"
            >
              <ArrowUp className="h-4 w-4 stroke-[2.5]" />
            </motion.button>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}