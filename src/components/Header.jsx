"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSeoOpen, setMobileSeoOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [desktopLangOpen, setDesktopLangOpen] = useState(false);

  const LANGUAGE_LABELS = {
    en: t("common.english"),
    fr: t("common.french"),
    nl: t("common.dutch"),
  };

  const NavigationItem = [
    {
      key: "header.home",
      href: (currentLang) => (currentLang === "en" ? "/" : `/${currentLang}`),
    },
    {
      key: "header.seo",
      href: "#",
      children: [
        {
          key: "header.seoOnPage",
          href: (currentLang) =>
            currentLang === "en"
              ? "/seo/on-page"
              : `/${currentLang}/seo/on-page`,
        },
        {
          key: "header.seoTechnical",
          href: (currentLang) =>
            currentLang === "en"
              ? "/seo/technical"
              : `/${currentLang}/seo/technical`,
        },
        {
          key: "header.seoLocal",
          href: (currentLang) =>
            currentLang === "en" ? "/seo/local" : `/${currentLang}/seo/local`,
        },
      ],
    },
    {
      key: "header.blog",
      href: (currentLang) => `/${currentLang}/blog`,
    },
    {
      key: "header.pricing",
      href: (currentLang) =>
        currentLang === "en" ? "/pricing" : `/${currentLang}/pricing`,
    },
    { key: "header.faq", href: "#faq" },
    { key: "header.contact", href: "#contact" },
  ];

  const buildHref = (href) => {
    if (typeof href === "function") {
      return href(lang);
    }
    return href;
  };

  const changeLocale = (nextLocale) => {
    // Update context
    setLang(nextLocale);

    // If switching to English, remove any locale prefix and use bare paths
    if (nextLocale === "en") {
      if (!pathname || pathname === "/") {
        router.push("/");
        return;
      }

      const segments = pathname.split("/").filter(Boolean);
      // If first segment is a locale, drop it
      if (["en", "fr", "nl"].includes(segments[0])) {
        segments.shift();
      }
      const nextPath = `/${segments.join("/")}` || "/";
      router.push(nextPath);
      return;
    }

    // For non-English locales, ensure the locale prefix is present
    if (!pathname || pathname === "/") {
      router.push(`/${nextLocale}`);
      return;
    }

    const segments = pathname.split("/").filter(Boolean);
    if (["en", "fr", "nl"].includes(segments[0])) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }
    const nextPath = `/${segments.join("/")}`;
    router.push(nextPath);
  };

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
          <Link href={lang === "en" ? "/" : `/${lang}`}>
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
                <div key={item.key} className="relative group">
                  <button className="flex items-center gap-1 text-purple-900 font-medium">
                    {t(item.key)}
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
                        key={sub.key}
                        href={buildHref(sub.href)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-purple-200 rounded"
                      >
                        {t(sub.key)}
                      </Link>
                    ))}
                  </motion.div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={buildHref(item.href)}
                  className="relative font-semibold group"
                >
                  {t(item.key)}
                  <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-purple-600 group-hover:w-full transition-all" />
                </Link>
              ),
            )}

            {/* Desktop Language */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-purple-900 font-medium"
                onClick={() => setDesktopLangOpen((open) => !open)}
              >
                {LANGUAGE_LABELS[lang]}
                <ChevronDown
                  className={`w-4 h-4 transition ${
                    desktopLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {desktopLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border border-purple-100"
                  >
                    {["en", "fr", "nl"].map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          changeLocale(code);
                          setDesktopLangOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-slate-700 hover:bg-purple-200 rounded"
                      >
                        {LANGUAGE_LABELS[code]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="hidden md:block">
            <Link
              href="#contact"
              className="px-6 py-3 rounded-full text-white font-semibold gradient-purple gradient-purple-hover"
            >
              {t("common.bookDemo")}
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
                <div key={item.key}>
                  <button
                    onClick={() => setMobileSeoOpen(!mobileSeoOpen)}
                    className="flex justify-between w-full text-purple-900 font-medium"
                  >
                    {t(item.key)}
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
                            key={sub.key}
                            href={buildHref(sub.href)}
                            className="block text-slate-600 hover:text-purple-700"
                          >
                            {t(sub.key)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={buildHref(item.href)}
                  className="block text-purple-900 font-medium"
                >
                  {t(item.key)}
                </Link>
              ),
            )}

            {/* Mobile Language */}
            <div className="pt-4 border-t border-purple-100">
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className="flex justify-between w-full text-purple-900 font-medium"
              >
                {LANGUAGE_LABELS[lang]}
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
                    {["en", "fr", "nl"].map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          changeLocale(code);
                          setMobileLangOpen(false);
                        }}
                        className="block w-full text-left py-1 text-slate-700 hover:bg-purple-50 rounded"
                      >
                        {LANGUAGE_LABELS[code]}
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
              {t("common.bookDemo")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
