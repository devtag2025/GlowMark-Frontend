"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const FAQSection = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(null);

  const faqs = [
    {
      id: "1",
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      id: "2",
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      id: "3",
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      id: "4",
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
    {
      id: "5",
      question: t("faq.q5"),
      answer: t("faq.a5"),
    },
    {
      id: "6",
      question: t("faq.q6"),
      answer: t("faq.a6"),
    },
    {
      id: "7",
      question: t("faq.q7"),
      answer: t("faq.a7"),
    },
  ];

  const toggleFaq = (id) => setActiveId(activeId === id ? null : id);

  return (
    <section id="faq" className="py-24">
      <div className="px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            {t("faq.title")}{" "}
            <span className="text-gradient-purple">
              {t("faq.titleHighlight")}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-center">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = activeId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Number(faq.id) * 0.05 }}
                className={`max-w-3xl mx-auto overflow-hidden rounded-2xl border transition-all duration-300 hover:bg-purple-200 ${
                  isOpen
                    ? "border-purple-200 bg-purple-200 shadow-md shadow-purple-300"
                    : "border-slate-300 bg-white"
                }`}
              >
                <motion.button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span
                    className={`text-sm md:text-base lg:text-lg font-bold transition-colors ${
                      isOpen ? "text-purple-800" : "text-slate-700"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    className={`text-sm md:text-base lg:text-lg p-2 rounded-full transition-all ${
                      isOpen
                        ? "bg-[#6B207A] text-white rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium text-sm md:text-base lg:text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
