"use client";
import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion, Variants } from "motion/react";

export default function ContactUs() {
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

  const socials = [
    {
      href: "https://www.linkedin.com/company/health-first-africa-ltd-gte/",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      href: "https://www.facebook.com/profile.php?id=61575137017478&mibextid=LQQJ4d",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      href: "https://www.instagram.com/health_first_africa_ltd_gte/profilecard/?igsh=Y2J4MW00czk4MHg4",
      icon: <Instagram className="w-5 h-5" />,
    },
  ];

  return (
    <section 
      id="contact" 
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
          {/* Section Header */}
          <div className="space-y-3 max-w-2xl">
            <span className="text-[#3C8A4E] text-xs font-bold tracking-widest uppercase block">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#194E6B] tracking-tight">
              Contact Us
            </h2>
            <div className="h-1 w-16 bg-[#3C8A4E] rounded-full mt-4" />
            <p className="text-[#1F1F1F]/80 text-base md:text-lg pt-2">
              We’d love to hear from you. Whether it's structural inquiries, global partnerships, or project collaborations—reach out to our team.
            </p>
          </div>

          {/* Core Layout Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 border-t border-[#194E6B]/10 items-stretch">
            
            {/* Left Column: Direct Inquiries & Networks */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-[#194E6B] tracking-tight">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {/* Email Channel */}
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-[#194E6B]/5 border border-[#194E6B]/5 rounded-xl text-[#194E6B] transition-colors group-hover:bg-[#194E6B] group-hover:text-white duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-wider text-[#1F1F1F]/50 uppercase">Email</h4>
                      <a href="mailto:Info@health1stafrica.org" className="text-base md:text-lg font-bold text-[#194E6B] hover:underline break-all">
                        Info@health1stafrica.org
                      </a>
                    </div>
                  </div>

                  {/* Phone Connection */}
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-[#3C8A4E]/5 border border-[#3C8A4E]/5 rounded-xl text-[#3C8A4E] transition-colors group-hover:bg-[#3C8A4E] group-hover:text-white duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-wider text-[#1F1F1F]/50 uppercase">WhatsApp</h4>
                      <a href="https://wa.me/2349060789816" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-bold text-[#194E6B] hover:underline">
                        +234 906 078 9816
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Footprint */}
              <div className="space-y-4 pt-6 ">
                <h4 className="text-xs font-bold tracking-wider text-[#1F1F1F]/50 uppercase">Connect with Us Online</h4>
                <div className="flex gap-3">
                  {socials.map((social, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 bg-white border border-[#194E6B]/10 rounded-xl text-[#194E6B] hover:bg-[#194E6B] hover:text-white transition-colors duration-300 shadow-sm"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Mapping Viewframe */}
            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-7 flex flex-col justify-between"
            >
              <div className="w-full h-72 lg:h-full min-h-[300px] rounded-2xl overflow-hidden border border-black/[0.04] shadow-sm bg-neutral-200 relative">
                <iframe
                  title="Abuja Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126822.79671517841!2d7.349996687401709!3d9.057850219752678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b51f1708a8f%3A0xdd24bc3a0baff378!2sAbuja!5e0!3m2!1sen!2sng!4v1718603096321!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="brightness-[0.96] contrast-[1.02]"
                />
              </div>
            </motion.div>

          </div>

          {/* Footer Regional Domicile Footer Block */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-[#194E6B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm"
          >
            <div className="space-y-1">
              <h5 className="font-bold text-[#194E6B]">Regional Hub &amp; Headquarters</h5>
              <p className="text-[#1F1F1F]/80 max-w-xl">
                Wing C, House 6, Gold City Estate 2, Airport Road, FCT-Abuja, Nigeria
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}