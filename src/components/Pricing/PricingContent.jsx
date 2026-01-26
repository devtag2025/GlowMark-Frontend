"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pricing } from "@/data/pricing";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PricingContent = () => {
  const { t, lang } = useLanguage();

  const content =
    pricing?.[0]?.content?.[lang] || pricing?.[0]?.content?.en || null;

  const renderContent = (text) => {
    if (!text) return null;

    const lines = text.split("\n");
    const elements = [];
    let currentList = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-2 my-4">
            {currentList.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <span className="text-purple-400 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>,
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        flushList();
        return;
      }

      // ✅ Section headers (1. Title)
      const headerMatch = trimmedLine.match(/^(\d+)\.\s*(.+)/);
      if (headerMatch) {
        flushList();
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4"
          >
            <span className="text-gradient-purple">{headerMatch[1]}.</span>{" "}
            {headerMatch[2]}
          </h2>,
        );
        return;
      }

      // ✅ List items
      const listMatch = trimmedLine.match(/^(?:[-•✅✔❌💡🚀💰🎯🔥🔎])\s*(.+)/);
      if (listMatch) {
        currentList.push(listMatch[1]);
        return;
      }

      flushList();

      // ✅ Sub headings / questions
      if (
        trimmedLine.endsWith("?") ||
        (trimmedLine.length < 60 && !trimmedLine.includes("."))
      ) {
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-lg md:text-xl font-semibold text-white mt-8 mb-3"
          >
            {trimmedLine}
          </h3>,
        );
        return;
      }

      // ✅ Paragraph
      elements.push(
        <p key={`p-${index}`} className="text-gray-300 leading-relaxed mb-4">
          {trimmedLine}
        </p>,
      );
    });

    flushList();
    return elements;
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      <div className="h-24" />

      <article className="max-w-5xl mx-auto px-6 pb-24 pt-6">
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span className="text-lg">&#8592;</span>
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-10 mb-12">
          <div className="relative w-full h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
            <Image
              src="/pricing.png"
              alt="Pricing"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* ✅ SINGLE H1 (SEO correct) */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                {t("pricing_page.title")}{" "}
                <span className="text-gradient-purple">
                  {t("pricing_page.titleHighlight")}
                </span>
              </h1>
            </div>
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-6 pb-24 pt-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              {content && (
                <div className="text-[15px] leading-relaxed">
                  {renderContent(content)}
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 p-8 rounded-3xl glow-card text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                {t("blogPost.bottomCtaTitle")}
              </h3>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                {t("blogPost.bottomCtaDescription")}
              </p>
              <Link
                href={`/${lang}#contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-purple text-white font-medium hover:opacity-90 transition-opacity"
              >
                {t("blogPost.bottomCtaButton")}
              </Link>
            </motion.div>
          </motion.section>
        </section>
      </article>
    </main>
  );
};

export default PricingContent;
