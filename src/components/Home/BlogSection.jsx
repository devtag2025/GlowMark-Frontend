"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { ArrowRight, Clock } from "lucide-react";
import { buildBlogUrl } from "@/utils/paths";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const BlogSection = () => {
  const { t, lang } = useLanguage();
  const locale = lang || "en";

  return (
    <section className="relative py-10 overflow-hidden max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6"
      >
        <div className="bg-[#6B207A]/20 border border-[#6B207A]/50 inline-flex w-fit text-purple-900 font-semibold px-4 py-1 rounded-full text-sm mx-auto backdrop-blur-sm">
          {t("blog.badge")}
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-center">
          {t("blog.title")}{" "}
          <span className="text-gradient-purple">
            {t("blog.titleHighlight")}
          </span>{" "}
          {t("blog.titleSuffix")}
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-theme-muted leading-relaxed text-center max-w-5xl">
          {t("blog.description")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => {
            const blogLink = buildBlogUrl(locale, blog);

            const title = blog.titles?.[locale] || blog.title;
            const excerpt = blog.excerpts?.[locale] || blog.excerpt;

            return (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 24px 60px rgba(124, 58, 237, 0.15), 0 0 0 1px rgba(124, 58, 237, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="group bg-[var(--card-bg-solid)] backdrop-blur-xl border border-[var(--border-color)] shadow-lg rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:border-purple-400/60"
              >
                <Link
                  href={blogLink}
                  className="relative w-full h-56 overflow-hidden cursor-pointer group/image"
                >
                  <Image
                    src={blog.image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 *:group-hover/image:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-slate-900 shadow-sm">
                    {blog.date}
                  </div>
                </Link>

                <div className="px-6 pt-4 pb-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-theme-muted mb-3">
                    <span className="px-3 py-1 rounded-full bg-[var(--background-secondary)] text-theme font-medium">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-theme mb-1 leading-snug line-clamp-2 group-hover:text-gradient-purple transition-colors">
                    {title}
                  </h3>

                  <p className="text-sm text-theme-secondary leading-relaxed line-clamp-2 flex-grow">
                    {excerpt}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <Link href={lang === "en" ? "/blog" : `/${lang}/blog`}>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="gradient-purple text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all cursor-pointer"
          >
            {t("common.readMore")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default BlogSection;
