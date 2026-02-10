"use client";

import { motion } from "framer-motion";

export default function BlogHeader({ locale = "en" }) {
  const titles = {
    en: {
      prefix: "Our",
      highlight: "Blogs",
      desc: "Discover insights, tips, and strategies to grow your online presence",
    },
    fr: {
      prefix: "Nos",
      highlight: "Blogs",
      desc: "Découvrez des insights, des conseils et des stratégies pour développer votre présence en ligne",
    },
    nl: {
      prefix: "Onze",
      highlight: "Blogs",
      desc: "Ontdek inzichten, tips en strategieën om uw online aanwezigheid te laten groeien",
    },
  };

  const t = titles[locale] || titles.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-theme mb-4">
        <span className="font-bold">{t.prefix}</span>{" "}
        <span className="font-serif italic text-gradient-purple">
          {t.highlight}
        </span>
      </h1>
      <p className="text-lg md:text-xl text-theme-muted max-w-2xl mx-auto">
        {t.desc}
      </p>
    </motion.div>
  );
}
