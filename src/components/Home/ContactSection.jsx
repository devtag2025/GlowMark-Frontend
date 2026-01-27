"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const ContactSection = () => {
  const { t } = useLanguage();

  const contacts = [
    {
      icon: Mail,
      label: t("contact.labelEmail"),
      value: "hello@glowmark.agency",
    },
    {
      icon: Phone,
      label: t("contact.labelPhone"),
      value: "+32 3 434 36 35",
    },
    {
      icon: MapPin,
      label: t("contact.labelVisit"),
      value: "Antwerp",
    },
  ];

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-theme tracking-tighter mb-6">
                {t("contact.titleLine1")} <br />
                <span className="text-gradient-purple">
                  {t("contact.titleHighlight")}
                </span>
              </h2>
              <p className="text-theme-muted text-base sm:text-lg lg:text-xl max-w-md leading-relaxed">
                {t("contact.description")}
              </p>
            </div>

            <div className="space-y-6">
              {contacts.map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-purple-400 group-hover:bg-[#6B207A] group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(107,32,122,0)] group-hover:shadow-[0_0_20px_rgba(107,32,122,0.4)]">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-theme-light uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-theme font-medium text-lg">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-color)] p-8 md:p-12 rounded-[3rem] shadow-lg">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-muted ml-1">
                      {t("contact.formFirstName")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("contact.formFirstNamePlaceholder")}
                      className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-6 py-4 text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-theme-muted ml-1">
                      {t("contact.formLastName")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("contact.formLastNamePlaceholder")}
                      className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-6 py-4 text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-theme-muted ml-1">
                    {t("contact.formEmail")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("contact.formEmailPlaceholder")}
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-6 py-4 text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-theme-muted ml-1">
                    {t("contact.formMessage")}
                  </label>
                  <textarea
                    rows="4"
                    placeholder={t("contact.formMessagePlaceholder")}
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-6 py-4 text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-purple-500 transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(107,32,122,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full gradient-purple text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 group transition-all"
                >
                  {t("contact.sendMessage")}
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
