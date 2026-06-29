"use client";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion, Variants } from "motion/react";

export default function Footer() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const socials = [
    {
      href: "https://www.linkedin.com/company/health-first-africa-ltd-gte/",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      href: "https://www.facebook.com/profile.php?id=61575137017478&mibextid=LQQJ4d",
      icon: <Facebook className="w-4 h-4" />,
    },
    {
      href: "https://www.instagram.com/health_first_africa_ltd_gte/profilecard/?igsh=Y2J4MW00czk4MHg4",
      icon: <Instagram className="w-4 h-4" />,
    },
  ];

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#F9F5EF] pb-16 pt-8 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto border-t border-[#194E6B]/10 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Brand Identifier */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/assets/logo-plain.png"
                alt="Health First Africa corporate seal"
                width={36}
                height={36}
                className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-extrabold tracking-tight text-[#194E6B]">
                Health First Africa
              </span>
            </Link>
            <p className="text-[#1F1F1F]/70 text-sm leading-relaxed max-w-sm">
              Empowering lives through targeted healthcare education, community health access delivery, and sustainable regional systems transformation.
            </p>
          </div>

          {/* Column 2: Structural Navigation Matrix */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/40">
              Platform Indexes
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm font-semibold text-[#194E6B]/90">
              <li>
                <Link href="/" className="hover:text-[#3C8A4E] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#3C8A4E] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#3C8A4E] transition-colors">What We Do</Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-[#3C8A4E] transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#3C8A4E] transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/donate" className="text-[#3C8A4E] hover:underline transition-all">Donate Now</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Network Hooks */}
          <div className="md:col-span-3 space-y-4 md:text-right md:flex md:flex-col md:items-end">
            <div className="space-y-4 w-full">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/40">
                Digital Footprint
              </h4>
              <div className="flex gap-2.5 md:justify-end">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white border border-[#194E6B]/10 text-[#194E6B] rounded-lg hover:bg-[#194E6B] hover:text-white transition-all duration-200 shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Global System Disclaimer / Attributions */}
        <div className="mt-16 pt-6  flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#1F1F1F]/40">
          <p>Registered Healthcare NGO &bull; Abuja, Nigeria.</p>
          <p>&copy; {new Date().getFullYear()} Health First Africa. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}