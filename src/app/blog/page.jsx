"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BlogCard from "@/components/Blog/BlogCard";
import SmoothScroll from "@/components/SmoothScroll";
import { blogs } from "@/data/blogs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";

function BlogPageContent() {
  const wrapperRef = useRef(null);
  const { t, lang } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  // Title gently moves up as we scroll
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="min-h-screen bg-[var(--background)]">
          {/* Spacer for header */}
          <div className="h-24" />

          <section
            ref={wrapperRef}
            className="min-h-screen max-w-7xl mx-auto px-6 py-16 md:py-24"
          >
            {/* Title block that moves slightly upward on scroll */}
            <motion.div
              style={{ y: titleY }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
                <span className="font-bold">{t("blogPage.titlePrefix")}</span>{" "}
                <span
                  className="font-serif italic text-gradient-purple"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {t("blogPage.titleHighlight")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                {t("blogPage.description")}
              </p>
            </motion.div>

            {/* Static grid of cards below the title */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} locale={lang} />
              ))}
            </div>
          </section>
        </main>
      </SmoothScroll>
      <Footer />
    </>
  );
}

export default function BlogPage() {
  return (
    <LanguageProvider initialLang="en">
      <BlogPageContent />
    </LanguageProvider>
  );
}
