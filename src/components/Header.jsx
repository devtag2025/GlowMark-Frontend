"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSeoOpen, setMobileSeoOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [language, setLanguage] = useState("Français");

  const NavigationItem = [
    { name: "Home", href: "/" },
    {
      name: "SEO",
      href: "#",
      children: [
        { name: "On-Page SEO", href: "/seo/on-page" },
        { name: "Technical SEO", href: "/seo/technical" },
        { name: "Local SEO", href: "/seo/local" },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`z-100 fixed top-0 w-full transition-all duration-300 shadow-md
      ${
        scrolled
          ? "bg-white/30 backdrop-blur-xl shadow-md border-b border-purple-100"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="Glow Mark Agency"
              width={110}
              height={110}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NavigationItem.map((item) =>
              item.children ? (
                <div key={item.name} className="relative group">
                  <button className="flex items-center gap-1 text-purple-900 font-medium">
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-purple-100
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  >
                    {item.children.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-purple-200 rounded"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative font-semibold group"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-purple-600 group-hover:w-full transition-all" />
                </Link>
              ),
            )}

            {/* Desktop Language */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-purple-900 font-medium">
                {language}
                <ChevronDown className="w-4 h-4" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border border-purple-100
                opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              >
                {["Français", "Nederlands"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="w-full px-4 py-2 text-left text-slate-700 hover:bg-purple-200 rounded"
                  >
                    {lang}
                  </button>
                ))}
              </motion.div>
            </div>
          </nav>

          <div className="hidden md:block">
            <Link
              href="#contact"
              className="px-6 py-3 rounded-full text-white font-semibold gradient-purple gradient-purple-hover"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-purple-900"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-purple-100 px-6 py-6 space-y-4 overflow-hidden"
          >
            {NavigationItem.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <button
                    onClick={() => setMobileSeoOpen(!mobileSeoOpen)}
                    className="flex justify-between w-full text-purple-900 font-medium"
                  >
                    {item.name}
                    <ChevronDown
                      className={`transition ${
                        mobileSeoOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileSeoOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-2 pl-4 space-y-2 overflow-hidden"
                      >
                        {item.children.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block text-slate-600 hover:text-purple-700"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-purple-900 font-medium"
                >
                  {item.name}
                </Link>
              ),
            )}

            {/* Mobile Language */}
            <div className="pt-4 border-t border-purple-100">
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className="flex justify-between w-full text-purple-900 font-medium"
              >
                {language}
                <ChevronDown
                  className={`transition ${mobileLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {mobileLangOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 pl-4 space-y-2 overflow-hidden"
                  >
                    {["Français", "Nederlands"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setMobileLangOpen(false);
                        }}
                        className="block w-full text-left py-1 text-slate-700 hover:bg-purple-50 rounded"
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="#contact"
              className="block text-center mt-4 px-6 py-3 rounded-full text-white font-semibold gradient-purple gradient-purple-hover"
            >
              Book a Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
