"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";

export default function SEOContentRenderer({ article }) {
  const { lang, t } = useLanguage();

  if (!article) return null;

  const content = article.content?.[lang] || article.content?.en || "";
  const title = article.titles?.[lang] || article.titles?.en || "";

  // Parse content into sections for better rendering
  const renderContent = (text) => {
    if (!text) return null;

    const lines = text.split("\n");
    const elements = [];
    let currentList = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-2 my-4 ml-4">
            {currentList.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-theme-secondary"
              >
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

      const listMatch = trimmedLine.match(
        /^(?:[-•✅✔❌💡🚀💰🎯🔥🔎]|\d+\.)\s*(.+)/,
      );
      if (listMatch && trimmedLine.length < 150) {
        // Check if it's a numbered header vs a list item
        const headerMatch = trimmedLine.match(/^(\d+)\.\s+([A-Z])/);
        if (headerMatch && trimmedLine.length < 80) {
          flushList();
          elements.push(
            <h2
              key={`h2-${index}`}
              className="text-xl md:text-2xl font-semibold text-theme mt-10 mb-4"
            >
              <span className="text-gradient-purple">{headerMatch[1]}.</span>{" "}
              {trimmedLine.slice(headerMatch[1].length + 2)}
            </h2>,
          );
          return;
        }
        currentList.push(listMatch[1] || trimmedLine.slice(2));
        return;
      }

      flushList();

      if (index === 0) {
        elements.push(
          <h1
            key={`title-${index}`}
            className="text-3xl md:text-4xl font-bold text-theme mb-6"
          >
            {trimmedLine}
          </h1>,
        );
        return;
      }

      if (
        trimmedLine.endsWith("?") ||
        (trimmedLine.length < 60 &&
          !trimmedLine.includes(".") &&
          trimmedLine.length > 10)
      ) {
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-lg md:text-xl font-semibold text-theme mt-8 mb-3"
          >
            {trimmedLine}
          </h3>,
        );
        return;
      }

      // Check for quoted text
      if (trimmedLine.startsWith('"') || trimmedLine.startsWith("«")) {
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className="border-l-4 border-purple-500 pl-4 my-6 italic text-theme-secondary"
          >
            {trimmedLine}
          </blockquote>,
        );
        return;
      }

      elements.push(
        <p
          key={`p-${index}`}
          className="text-theme-secondary leading-relaxed mb-4"
        >
          {trimmedLine}
        </p>,
      );
    });

    flushList();
    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none">
      <div className="text-[15px] leading-relaxed">
        {renderContent(content)}
      </div>

      <div className="mt-16 p-8 rounded-3xl glow-card text-center">
        <h3 className="text-2xl font-bold text-theme mb-3">
          {t("seo.ctaTitle")}
        </h3>
        <p className="text-theme-muted mb-6 max-w-lg mx-auto">
          {t("seo.ctaDescription")}
        </p>
        <Link
          href={lang === "en" ? "/#contact" : `/${lang}#contact`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-purple text-white font-medium hover:opacity-90 transition-opacity"
        >
          {t("seo.ctaButton")}
        </Link>
      </div>
    </div>
  );
}
