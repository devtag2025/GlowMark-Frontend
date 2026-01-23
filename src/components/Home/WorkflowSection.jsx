"use client";

import {
  CircleArrowRight,
  CircleCheck,
  Eye,
  Flag,
  SquareCheck,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

const WorkflowSection = () => {
  const { t } = useLanguage();
  const steps = [
    {
      no: "1",
      title: t("workflow.step1Title"),
      sub: t("workflow.step1Sub"),
      icon: CircleCheck,
    },
    {
      no: "2",
      title: t("workflow.step2Title"),
      sub: t("workflow.step2Sub"),
      icon: Flag,
    },
    {
      no: "3",
      title: t("workflow.step3Title"),
      sub: t("workflow.step3Sub"),
      icon: Eye,
    },
    {
      no: "4",
      title: t("workflow.step4Title"),
      sub: t("workflow.step4Sub"),
      icon: CircleArrowRight,
    },
    {
      no: "5",
      title: t("workflow.step5Title"),
      sub: t("workflow.step5Sub"),
      icon: SquareCheck,
    },
    {
      no: "6",
      title: t("workflow.step6Title"),
      sub: t("workflow.step6Sub"),
      icon: Star,
    },
  ];

  return (
    <section className="py-20 overflow-hidden">
      <div className="flex flex-col gap-5 justify-center max-w-5xl mx-auto px-6">
        {/* Badge */}
        <div className="bg-[#6B207A]/20 border border-[#6B207A]/50 inline-flex w-fit text-purple-400 font-semibold px-4 py-1 rounded-full text-sm mx-auto backdrop-blur-sm">
          {t("workflow.badge")}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center mt-2">
            {t("workflow.title")}{" "}
            <span className="text-gradient-purple">
              {t("workflow.titleHighlight")}
            </span>{" "}
            {t("workflow.titleSuffix")}
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-center mt-4 max-w-5xl">
            {t("workflow.description")}
          </p>
        </div>

        {/* Icons Row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-colors duration-500">
                <step.icon className="text-purple-500 w-6 h-6" />
              </div>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
                {step.title}
              </p>
            </div>
          ))}
        </div>

        <div className="relative h-[250px] w-full mt-2 flex justify-center">
          <svg
            className="w-full max-w-4xl h-full"
            viewBox="0 0 1000 250"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter
                id="darkPurpleGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {steps.map((_, i) => {
              const startX = (1000 / 11) * (2 * i + 1);
              const endX = 500;
              const pathData = `M ${startX} 0 C ${startX} 150, ${endX} 150, ${endX} 240`;

              // Calculate specific length for smoothness
              const distance = Math.abs(startX - endX);
              const calculatedLength = 280 + distance * 0.4;

              return (
                <g key={i}>
                  <path
                    d={pathData}
                    stroke="rgba(255,255,255,0.05)" // Subtle dark lines
                    strokeWidth="2"
                    fill="none"
                  />
                  <motion.path
                    d={pathData}
                    stroke="#A855F7" // Vibrant purple
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#darkPurpleGlow)"
                    strokeDasharray={calculatedLength}
                    initial={{ strokeDashoffset: calculatedLength }}
                    animate={{ strokeDashoffset: -calculatedLength }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.5,
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-6">
        {steps.map((step) => (
          <motion.div
            key={step.no}
            whileHover={{ y: -5 }}
            className="group flex items-start gap-5 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.08] transition-all duration-500 shadow-2xl"
          >
            <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#6B207A] to-purple-500 text-white font-black text-xl shadow-lg shadow-purple-900/20">
              {step.no}
            </span>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-lg leading-none">
                {step.title}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">
                {step.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowSection;
