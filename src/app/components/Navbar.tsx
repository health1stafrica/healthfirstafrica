"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Contact", href: "/#contact" },
  { name: "Donate", href: "/donate", isAction: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F9F5EF]/95 backdrop-blur-md shadow-sm border-b border-[#194E6B]/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      {/* Container aligned perfectly to the max-w-6xl core page structure */}
      <div className="max-w-6xl mx-auto px-6 xl:px-0">
        <div className="flex justify-between items-center">
          
          {/* Logo Brand Identifier */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/assets/logo-plain.png"
              alt="Health First Africa corporate seal"
              width={38}
              height={38}
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span 
              className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-[#194E6B]" : "text-white"
              }`}
            >
              Health First Africa
            </span>
          </Link>

          {/* Desktop Navigation Link Elements */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-all duration-200 ${
                  link.isAction
                    ? "bg-[#194E6B] hover:bg-[#123b52] text-white px-5 py-2 rounded-xl shadow-md shadow-[#194E6B]/10 ml-2"
                    : isScrolled
                      ? "text-[#194E6B] hover:text-[#3C8A4E]"
                      : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Interface Engine Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-1.5 rounded-lg transition-colors focus:outline-none ${
              isScrolled 
                ? "text-[#194E6B] hover:bg-[#194E6B]/5" 
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle navigation interface map"
          >
            {isOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Sheet Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 md:hidden bg-[#F9F5EF] border-b border-[#194E6B]/10 shadow-lg px-6 py-6 space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-bold tracking-wide transition-colors ${
                  link.isAction
                    ? "bg-[#194E6B] text-white text-center py-3 rounded-xl shadow-md"
                    : "text-[#194E6B] hover:text-[#3C8A4E] py-1.5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}