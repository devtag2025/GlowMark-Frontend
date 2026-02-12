"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Calendar, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function CalendlySection() {
  const { t } = useLanguage();
  const features = [
    {
      icon: Calendar,
      title: t("calendly.feature1Title"),
      description: t("calendly.feature1Desc"),
    },
    {
      icon: Phone,
      title: t("calendly.feature2Title"),
      description: t("calendly.feature2Desc"),
    },
    {
      icon: CheckCircle,
      title: t("calendly.feature3Title"),
      description: t("calendly.feature3Desc"),
    },
  ];

  return (
    <section id="phone-appointment" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="bg-[#6B207A]/20 border border-[#6B207A]/50 inline-flex w-fit text-purple-900 font-semibold px-4 py-1 rounded-full text-sm mx-auto backdrop-blur-sm mb-6">
            <Phone className="w-4 h-4 mr-2" />
            {t("calendly.badge")}
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            {t("calendly.titlePrefix")}{" "}
            <span className="text-gradient-purple">
              {t("calendly.titleHighlight")}
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-theme-muted leading-relaxed max-w-3xl mx-auto">
            {t("calendly.description")}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-purple-500/30 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-theme mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-theme-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Schedule Call Button - opens Calendly directly for better performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <a
            href="https://calendly.com/glowmarkagency-sales/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            {t("calendly.buttonLabel")}
          </a>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-2xl mx-auto text-center"
        >
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <h4 className="font-bold text-theme mb-2">
              {t("calendly.infoTitle")}
            </h4>
            <p className="text-sm text-theme-secondary">
              {t("calendly.infoDesc")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
