"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { buildBlogUrl } from "@/utils/paths";

export default function BlogCard({ blog, index, locale = "en" }) {
  const { t } = useLanguage();

  const blogLink = buildBlogUrl(locale, blog);

  const title = blog.titles?.[locale] || blog.title;
  const excerpt = blog.excerpts?.[locale] || blog.excerpt;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 24px 60px rgba(124, 58, 237, 0.15), 0 0 0 1px rgba(124, 58, 237, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      className="group bg-[var(--card-bg-solid)] backdrop-blur-xl border border-[var(--border-color)]
                 shadow-lg rounded-2xl overflow-hidden
                 transition-all duration-300 h-full flex flex-col
                 hover:border-purple-400/60"
    >
      <Link
        href={blogLink}
        className="relative w-full h-56 overflow-hidden rounded-b-none cursor-pointer group/image"
      >
        <motion.div
          initial={{ y: "-40%", scale: 1.12, opacity: 0 }}
          whileInView={{ y: "0%", scale: 1, opacity: 1 }}
          transition={{
            y: {
              duration: 1.8,
              ease: [0.22, 0.08, 0.25, 1],
            },
            opacity: {
              duration: 0.7,
              delay: 0.15,
              ease: "easeOut",
            },
            scale: {
              duration: 0.8,
              delay: 1.8,
              ease: [0.25, 0.1, 0.25, 1],
            },
          }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={blog.image}
            alt={title}
            fill
            className="object-cover transition-all duration-300 group-hover/image:scale-110 group-hover/image:soft-blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10">
            <span className="text-white font-semibold text-lg px-4 py-2 bg-black/40 backdrop-blur-sm rounded-lg">
              {t("blogCard.viewPost")}
            </span>
          </div>
        </motion.div>
      </Link>

      <div className="px-6 pt-4 pb-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-theme-muted mb-3">
          <span className="px-3 py-1 rounded-full bg-[var(--background-secondary)] text-theme font-medium">
            {blog.category}
          </span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-theme-muted" />
            <span className="text-theme-muted">{blog.date}</span>
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
}
