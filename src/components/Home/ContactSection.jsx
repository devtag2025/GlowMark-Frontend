"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section className="relative bg-[#050505] py-24 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#6B207A]/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
                Let’s build your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500">
                  Digital Authority.
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                Ready to dominate search results? Reach out and let’s start your
                free audit.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email us",
                  value: "hello@glowmark.agency",
                },
                { icon: Phone, label: "Call us", value: "+1 (555) 000-GLOW" },
                {
                  icon: MapPin,
                  label: "Visit us",
                  value: "Digital Nomad HQ, Web 3.0",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-[#6B207A] group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(107,32,122,0)] group-hover:shadow-[0_0_20px_rgba(107,32,122,0.4)]">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-white font-medium text-lg">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-6">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glass Card Form */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">
                    Subject
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500 transition-all appearance-none">
                    <option className="bg-[#050505]">Free SEO Audit</option>
                    <option className="bg-[#050505]">Campaign Inquiry</option>
                    <option className="bg-[#050505]">General Question</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="How can we help?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500 transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(107,32,122,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#6B207A] to-[#FF1A1A] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 group transition-all"
                >
                  Send Message
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </motion.button>
              </form>
            </div>

            {/* Small decorative glass element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-red-500 rounded-3xl -z-10 blur-2xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
