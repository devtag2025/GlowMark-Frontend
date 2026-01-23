"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, HelpCircle, BarChart3, Zap, FileText } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const PricingSection = () => {
  const { t } = useLanguage();
  const features = [
    { icon: BarChart3, text: t("pricing.feature1") },
    { icon: Zap, text: t("pricing.feature2") },
    { icon: FileText, text: t("pricing.feature3") },
    { icon: Check, text: t("pricing.feature4") },
  ];

  const points = [
    t("pricing.point1"),
    t("pricing.point2"),
    t("pricing.point3"),
    t("pricing.point4"),
    t("pricing.point5"),
    t("pricing.point6"),
  ];

  return (
    <section className="bg-[#050505] md:py-20 relative overflow-hidden">
      {/* Background Glow */}

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                {t("pricing.title")} <br />
                <span className="text-gradient-purple">
                  {t("pricing.titleHighlight")}{" "}
                </span>
                {t("pricing.titleSuffix")}
              </h2>

              <p className="text-gray-400 text-base sm:text-lg lg:text-xlss leading-relaxed">
                {t("pricing.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((point, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span className="text-sm md:text-base font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md">
              <HelpCircle className="text-purple-400 shrink-0 mt-1" size={20} />
              <p className="text-xs text-gray-500 italic">
                {t("pricing.helpText")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 gradient-purple rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="mb-8">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                  {t("pricing.badge")}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">
                  {t("pricing.subtitle")}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {t("pricing.subtitleDescription")}
                </p>
              </div>

              <div className="mb-8">
                <div className="text-white text-2xl md:text-4xl font-bold">
                  {t("pricing.priceLabel")}
                </div>
              </div>

              <div className="space-y-5 mb-10">
                {features.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-purple-400 border border-white/10">
                      <item.icon size={16} />
                    </div>
                    <span className="text-gray-300 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 rounded-2xl text-white font-bold gradient-purple glow-card transition-all">
                {t("pricing.button")}
              </button>

              <div className="absolute top-[-10%] right-[-10%] opacity-[0.03] rotate-12">
                <BarChart3 size={200} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
