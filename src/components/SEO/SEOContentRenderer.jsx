"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SEOContentRenderer({ article }) {
  const { lang, t } = useLanguage();

  if (!article) return null;

  const content = article.content?.[lang] || article.content?.en || "";
  const title = article.titles?.[lang] || article.titles?.en || "";

  return (
    <div className="prose prose-lg max-w-none">
      <div className="text-[15px] leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="text-3xl md:text-4xl font-bold text-theme mb-6"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-xl md:text-2xl font-semibold text-theme mt-10 mb-4"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-lg md:text-xl font-semibold text-theme mt-8 mb-3"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p
                className="text-theme-secondary leading-relaxed mb-4"
                {...props}
              />
            ),
            strong: ({ node, ...props }) => (
              <strong className="text-theme font-semibold" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="space-y-2 my-4 ml-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="space-y-2 my-4 ml-4" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="flex items-start gap-3 text-theme-secondary">
                <span className="text-purple-400 mt-1">•</span>
                <span {...props} />
              </li>
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-purple-500 pl-4 my-6 italic text-theme-secondary"
                {...props}
              />
            ),
            hr: () => <div className="my-10 border-t border-purple-300" />,
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-8 border border-purple-200">
                <table
                  className="w-full border border-purple-200 rounded-xl overflow-hidden"
                  {...props}
                />
              </div>
            ),
            th: ({ node, ...props }) => (
              <th
                className="border border-purple-200 px-4 py-3 text-left text-theme font-semibold"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td
                className="border border-purple-200 px-4 py-3 text-theme-secondary"
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
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
