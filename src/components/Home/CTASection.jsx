"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

const CTASection = () => {
  const { t, lang } = useLanguage();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef(null);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="relative py-10  px-4 md:px-6 overflow-hidden bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="
            group relative
            rounded-3xl
            border border-purple-500/20
            bg-gradient-to-br from-[#6B207A] to-purple-500
            p-8 md:p-20
            overflow-hidden
            shadow-2xl shadow-purple-900/30
          "
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(255,255,255,0.15),
                  transparent 80%
                )
              `,
            }}
          />

          <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[24px_24px]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-10">
              <Sparkles className="w-4 h-4 mr-2" />
              {t("cta.badge")}
            </div>

            <h2 className="text-3xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              {t("cta.title")}
              <br />
              <span className="text-purple-400">{t("cta.titleHighlight")}</span>
            </h2>

            <Link
              href={lang === "en" ? "/request" : `/${lang}/request`}
              className="
                  px-10 py-4
                  bg-white text-purple-900
                  rounded-full
                  font-bold text-sm md:text-lg
                  transition-all
                  hover:scale-105
                  active:scale-95
                  shadow-xl shadow-purple-900/30
                "
            >
              {t("common.bookDemo")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
