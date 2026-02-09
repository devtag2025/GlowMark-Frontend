"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Zap } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";

const SerpixaSection = () => {
  const { t } = useLanguage();
  const features = [
    t("serpixa.feat1"),
    t("serpixa.feat2"),
    t("serpixa.feat3"),
    t("serpixa.feat4"),
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 lg:gap-16 gap-10 items-center">
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6B207A]/20 border border-[#6B207A]/50 rounded-full text-purple-900 text-xs font-bold  tracking-widest shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t("serpixa.badge")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[0.95] tracking-tight"
            >
              {t("serpixa.title")}
              <br />
              <span className="text-gradient-purple">
                {t("serpixa.titleHighlight")}
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 max-w-xl"
            >
              <p className="text-slate-600 text-base md:text-xl font-medium leading-relaxed">
                {t("serpixa.descriptionPrefix")}
                <span className="text-purple-900 font-bold tracking-tight">
                  {t("serpixa.descriptionHighlight")}
                </span>{" "}
                {t("serpixa.descriptionSuffix")}
              </p>
              <p className="text-slate-900 text-base md:text-lg font-semibold">
                {t("serpixa.description")}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href=""
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
              >
                <span className="relative z-10">{t("serpixa.btnText")}</span>

                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-white/70 backdrop-blur-xl rounded-[3rem] lg:p-10 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-purple-600 rounded-xl md:rounded-2xl text-white shadow-lg shadow-purple-200">
                  <Zap className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" />
                </div>
                <h3 className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tighter">
                  {t("serpixa.featureTitle")}
                </h3>
              </div>

              <ul className="space-y-6">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-purple-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-slate-700 text-sm md:text-lg font-semibold group-hover:text-purple-600 transition-colors">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {t("serpixa.live")}
                </span>
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest animate-pulse">
                  {t("serpixa.workframe")}
                </span>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SerpixaSection;
