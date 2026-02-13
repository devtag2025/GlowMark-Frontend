"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { privacyPolicies } from "@/data/privacy-policies";

const PrivacyPoliciesContent = () => {
  const { t, lang } = useLanguage();

  const content =
    privacyPolicies?.[0]?.content?.[lang] ||
    privacyPolicies?.[0]?.content?.en ||
    null;

  return (
    <main className="min-h-screen bg-[var(--background)] text-theme">
      <div className="h-24" />

      <article className="max-w-5xl mx-auto px-6 pb-24 pt-6">
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link
            href={lang === "en" ? "/" : `/${lang}`}
            className="inline-flex items-center gap-2 text-theme-secondary hover:text-theme transition-colors"
          >
            <span className="text-lg">&#8592;</span>
            <span>{t("common.backToHome")}</span>
          </Link>
        </div>

        <section className="max-w-6xl mx-auto px-6 pt-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              {content && (
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
                        <strong
                          className="text-theme font-semibold"
                          {...props}
                        />
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
                      hr: () => (
                        <div className="my-10 border-t border-purple-300" />
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </motion.section>
        </section>
      </article>
    </main>
  );
};

export default PrivacyPoliciesContent;
