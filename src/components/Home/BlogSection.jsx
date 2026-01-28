"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const BlogSection = () => {
  const { t } = useLanguage();
  const blogs = [
    {
      id: "1",
      date: "02/12/2025",
      title: "Fitness SEO: Incredible Strategy to Boost Your Gym",
      sub: "Do you want to attract more members and fill your classes without breaking the bank?",
      img: "/blog1.png",
    },
    {
      id: "2",
      date: "02/12/2025",
      title: "SEO Lawyer: An essential strategy for guarnteed success",
      sub: "Are you a lawyer looking to boost your online visibility? ",
      img: "/blog2.png",
    },
    {
      id: "3",
      date: "02/12/2025",
      title: "SEO Accounting: An essential guide to lasting success",
      sub: "Discover how an SEO accountant can transform the financial management.",
      img: "/blog3.png",
    },
  ];

  return (
    <section className="relative py-10 overflow-hidden max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6"
      >
        <div className="bg-[#6B207A]/20 border border-[#6B207A]/50 inline-flex w-fit text-purple-900 font-semibold px-4 py-1 rounded-full text-sm mx-auto backdrop-blur-sm">
          {t("blog.badge")}
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-center">
          {t("blog.title")}{" "}
          <span className="text-gradient-purple">
            {t("blog.titleHighlight")}{" "}
          </span>
          {t("blog.titleSuffix")}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-theme-muted leading-relaxed text-center max-w-5xl">
          {t("blog.description")}
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
        >
          {blogs.map((blog) => (
            <Link href={"/blog"}>
              <motion.div
                key={blog.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                className="flex flex-col text-left gap-4 p-4 rounded-2xl bg-[var(--card-bg)] transition-all duration-300 overflow-hidden cursor-pointer border border-[var(--border-color)]"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                  />

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-slate-900 shadow-sm">
                    {blog.date}
                  </div>
                </div>
                <h4 className="font-semibold text-xl text-theme">
                  {blog.title}
                </h4>
                <p className="text-sm md:text-base text-theme-muted">
                  {blog.sub}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BlogSection;
