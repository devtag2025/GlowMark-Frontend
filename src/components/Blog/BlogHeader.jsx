"use client";

import { motion } from "framer-motion";

export default function BlogHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-4">
        <span className="font-bold">Our</span>{" "}
        <span
          className="font-serif italic text-gradient-purple"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Blogs
        </span>
      </h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
      >
        Discover insights, tips, and strategies to grow your online presence
      </motion.p>
    </motion.div>
  );
}
