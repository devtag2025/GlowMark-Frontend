"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ChartNoAxesCombined } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-28 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="bg-[#6B207A]/20 border border-[#6B207A]/50 inline-flex w-fit text-purple-900 font-semibold px-4 py-1 rounded-full text-sm mx-auto backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm md:text-base font-semibold">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            {t("hero.titlePrefix")}{" "}
            <span className="text-gradient-purple">
              {t("hero.titleHighlight")}
            </span>{" "}
            {t("hero.titleSuffix")}
            <br />
          </h1>

          <p className="text-lg md:text-xl text-theme-muted leading-relaxed max-w-xl">
            {t("hero.description")}
          </p>

          <Link href="/request">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="gradient-purple text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all"
            >
              {t("common.bookADemo")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative px-4 md:px-0"
        >
          <div className="relative z-50">
            <Image
              src="/graph.png"
              alt="graph"
              width={600}
              height={700}
              className="w-full h-full rounded-xl transition-all duration-700 object-cover"
            />

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-2 md:bottom-10 -left-8 bg-[var(--card-bg-solid)] backdrop-blur-xl border border-[var(--border-color)] p-2 md:p-5 rounded-2xl shadow-lg"
            >
              <div className="text-purple-600 font-black text-lg md:text-2xl">
                99%
              </div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-theme-secondary">
                {t("hero.statLabel")}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute top-5 md:top-10 -right-6 bg-[var(--card-bg-solid)] backdrop-blur-xl border border-[var(--border-color)] p-2 md:p-4 rounded md:rounded-2xl"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                <ChartNoAxesCombined className="text-white h-5 w-5 md:w-6 md:h-6" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
