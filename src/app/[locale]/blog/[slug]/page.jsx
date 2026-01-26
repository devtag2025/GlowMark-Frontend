"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Folder } from "lucide-react";
import { blogs } from "@/data/blogs";
import { useLanguage } from "@/i18n/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";

export default function BlogPostPage() {
  const params = useParams();
  const { t, lang } = useLanguage();
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  // Get content for current language, fallback to English
  const content = blog.content?.[lang] || blog.content?.en || null;

  // Parse content into sections for better rendering
  const renderContent = (text) => {
    if (!text) return null;

    const lines = text.split("\n");
    const elements = [];
    let currentList = [];
    let listType = null;

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
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        flushList();
        return;
      }

      // Check for list items (various formats)
      const listMatch = trimmedLine.match(
        /^(?:[-•✅✔❌💡🚀💰🎯🔥🔎]|\d+\.)\s*(.+)/,
      );
      if (listMatch) {
        currentList.push(listMatch[1] || trimmedLine.slice(2));
        return;
      }

      flushList();

      // Check for main title (first line, usually)
      if (index === 0 && trimmedLine.length > 20) {
        elements.push(
          <h1
            key={`title-${index}`}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            {trimmedLine}
          </h1>,
        );
        return;
      }

      // Check for section headers (numbered or short lines followed by content)
      const headerMatch = trimmedLine.match(/^(\d+)\.\s*(.+)/);
      if (headerMatch && trimmedLine.length < 80) {
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

      // Check for subheaders (questions or short impactful lines)
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

      // Regular paragraph
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
    <SmoothScroll>
      <main className="min-h-screen bg-[var(--background)] text-white">
        {/* Spacer for global header */}
        <div className="h-24" />

        <article className="max-w-6xl mx-auto px-6 pb-24 pt-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{t("blogPost.backToBlogs")}</span>
            </Link>
          </motion.div>

          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-10 mb-12"
          >
            {/* Hero Image */}
            <div className="relative w-full h-72 sm:h-80 lg:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Category pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-4"
              >
                <span className="px-4 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-sm font-medium text-purple-300 uppercase tracking-wide">
                  {blog.category}
                </span>
              </motion.div>

              {/* Title overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                  <span className="text-gradient-purple">{blog.title}</span>
                </h1>
              </div>
            </div>

            {/* Meta + quick info */}
            <div className="flex flex-col gap-6">
              {/* Overview card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glow-card rounded-3xl p-6"
              >
                <h2 className="text-sm font-semibold text-purple-400 tracking-wide mb-4 uppercase flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  {t("blogPost.overview")}
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {blog.excerpt}
                </p>
              </motion.div>

              {/* Meta info card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glow-card rounded-3xl p-6 grid grid-cols-2 gap-5 text-sm"
              >
                <div>
                  <p className="text-gray-500 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {t("blogPost.published")}
                  </p>
                  <p className="font-medium text-white">{blog.date}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {t("blogPost.readTime")}
                  </p>
                  <p className="font-medium text-white">{blog.readTime}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    {t("blogPost.tags")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:border-purple-500/50 hover:text-purple-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glow-card rounded-3xl p-6 bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20"
              >
                <p className="text-sm text-gray-300 mb-4">
                  {t("blogPost.ctaText")}
                </p>
                <Link
                  href={`/${lang}#contact`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-purple text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  {t("blogPost.ctaButton")}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Body content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              {content ? (
                <div className="text-[15px] leading-relaxed">
                  {renderContent(content)}
                </div>
              ) : (
                <div className="text-gray-300 space-y-6">
                  <p>
                    {t("blogPost.fallbackIntro").replace("{title}", blog.title)}
                  </p>
                  <p>{t("blogPost.fallbackBody")}</p>
                  <p>{t("blogPost.fallbackOutro")}</p>
                </div>
              )}
            </div>

            {/* Bottom CTA */}
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
        </article>
      </main>
    </SmoothScroll>
  );
}
