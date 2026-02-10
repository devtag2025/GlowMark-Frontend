"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function BlogCard({ blog, index, locale = "en" }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[var(--card-bg-solid)] backdrop-blur-xl border border-[var(--border-color)]
                 shadow-lg rounded-2xl overflow-hidden h-full flex flex-col
                 hover:border-purple-400/60 transition-all duration-300"
    >
      <Link
        href={`/${locale}/blog/${blog.slug}`}
        className="relative w-full h-56 overflow-hidden cursor-pointer group/image"
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-all duration-300 group-hover/image:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </Link>

      <div className="px-6 pt-4 pb-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-theme-muted mb-3">
          <span className="px-3 py-1 rounded-full bg-[var(--background-secondary)] text-theme font-medium">
            {blog.category}
          </span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <Link href={`/${locale}/blog/${blog.slug}`}>
          <h3 className="text-lg font-semibold text-theme mb-2 leading-snug line-clamp-2 group-hover:text-purple-400 transition-colors">
            {blog.title}
          </h3>
        </Link>

        <p className="text-sm text-theme-secondary leading-relaxed line-clamp-2 flex-grow">
          {blog.excerpt}
        </p>

        <div className="mt-4 pt-4 border-t border-[var(--border-color)] text-xs text-theme-muted">
          {blog.date}
        </div>
      </div>
    </motion.article>
  );
}
