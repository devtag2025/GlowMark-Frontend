"use client";

import { Lightbulb, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const WhoWeAre = () => {
  const { t } = useLanguage();
  const features = [
    {
      title: t("whoWeAre.feature1Title"),
      subtitle: t("whoWeAre.feature1Subtitle"),
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: t("whoWeAre.feature2Title"),
      subtitle: t("whoWeAre.feature2Subtitle"),
      icon: <Lightbulb className="w-8 h-8" />,
    },
    {
      title: t("whoWeAre.feature3Title"),
      subtitle: t("whoWeAre.feature3Subtitle"),
      icon: <BookOpen className="w-8 h-8" />,
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4"
      >
        <div className="bg-[#6B207A]/20 border border-[#6B207A]/50 inline-flex w-fit text-purple-400 font-semibold px-4 py-1 rounded-full text-sm mx-auto backdrop-blur-sm">
          {t("whoWeAre.badge")}
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-center">
          <span className="text-gradient-purple">{t("whoWeAre.title")}</span>{" "}
          {t("whoWeAre.titleSuffix")}
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-center max-w-5xl">
          {t("whoWeAre.intro")}
        </p>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              className="flex flex-col items-center text-center p-6 rounded-xl transition duration-300 gradient-block"
            >
              <span className="w-10 h-10 mb-2">{feature.icon}</span>
              <h4 className="font-semibold text-lg ">{feature.title}</h4>
              <p className="text-sm md:text-base  mt-1">{feature.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-center max-w-5xl mt-6">
          {t("whoWeAre.outro")}
        </p>
      </motion.div>
    </section>
  );
};

export default WhoWeAre;
