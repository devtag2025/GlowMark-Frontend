"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { usePathname, useRouter } from "next/navigation";
import { getSortedArticles } from "@/data/seo-articles";

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

  // Get SEO articles for dropdown
  const seoArticles = getSortedArticles();

  const NavigationItem = [
    {
      key: "header.home",
      href: (currentLang) => (currentLang === "en" ? "/" : `/${currentLang}`),
    },
    {
      key: "header.seo",
      href: "#",
      children: seoArticles.map((article) => ({
        slug: article.slug,
        titles: article.titles,
        href: (currentLang) =>
          currentLang === "en"
            ? `/seo/${article.slug}`
            : `/${currentLang}/seo/${article.slug}`,
      })),
    },
    {
      key: "header.blog",
      href: (currentLang) =>
        currentLang === "en" ? "/blog" : `/${currentLang}/blog`,
    },
    {
      key: "header.pricing",
      href: (currentLang) =>
        currentLang === "en" ? "/pricing" : `/${currentLang}/pricing`,
    },
    { key: "header.faq", href: "#faq" },
    { key: "header.contact", href: "#contact" },
  ];

  const buildHref = (href) => (typeof href === "function" ? href(lang) : href);

  const changeLocale = (nextLocale) => {
    setLang(nextLocale);
    if (nextLocale === "en") {
      if (!pathname || pathname === "/") {
        router.push("/");
        return;
      }
      const segments = pathname.split("/").filter(Boolean);
      if (["en", "fr", "nl"].includes(segments[0])) segments.shift();
      const nextPath = `/${segments.join("/")}` || "/";
      router.push(nextPath);
      return;
    }
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
    router.push(`/${segments.join("/")}`);
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
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[var(--header-bg)] border-b border-[var(--header-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link
            href={lang === "en" ? "/" : `/${lang}`}
            className="relative z-10"
          >
            <Image
              src="/logo.jpg"
              alt="Glow Mark Agency"
              width={100}
              height={100}
              className="rounded-lg"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NavigationItem.map((item) =>
              item.children ? (
                <div key={item.key} className="relative group">
                  <button className="flex items-center gap-1 text-theme-secondary hover:text-theme font-semibold transition-colors">
                    {t(item.key)}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 mt-3 w-72 max-h-[70vh] overflow-y-auto bg-[var(--card-bg-solid)] rounded-xl shadow-lg border border-[var(--border-color)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.slug || sub.key}
                        href={buildHref(sub.href)}
                        className="block px-4 py-3 text-sm text-theme-muted hover:text-theme hover:bg-[var(--background-secondary)] transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {sub.titles ? sub.titles[lang] || sub.titles.en : t(sub.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={buildHref(item.href)}
                  className="text-theme-secondary hover:text-theme font-semibold transition-colors relative group"
                >
                  {t(item.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
                </Link>
              ),
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setDesktopLangOpen(!desktopLangOpen)}
                className="flex items-center gap-1 text-theme-secondary hover:text-theme font-semibold"
              >
                {LANGUAGE_LABELS[lang]}
                <ChevronDown
                  className={`w-4 h-4 transition ${desktopLangOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {desktopLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-32 bg-[var(--card-bg-solid)] rounded-xl shadow-lg border border-[var(--border-color)]"
                  >
                    {["en", "fr", "nl"].map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          changeLocale(code);
                          setDesktopLangOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-theme-muted hover:text-theme hover:bg-[var(--background-secondary)] transition-colors first:rounded-t-xl last:rounded-b-xl"
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
              className="px-6 py-3 rounded-full text-white font-bold gradient-purple transition-transform hover:scale-105 inline-block"
            >
              {t("common.bookDemo")}
            </Link>
          </div>

          <button
            className="md:hidden text-theme"
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
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-[var(--background)] border-t border-[var(--border-color)] px-6 py-8 space-y-6 overflow-hidden shadow-xl"
          >
            {NavigationItem.map((item) =>
              item.children ? (
                <div key={item.key} className="space-y-4">
                  <button
                    onClick={() => setMobileSeoOpen(!mobileSeoOpen)}
                    className="flex justify-between w-full text-theme font-bold text-lg"
                  >
                    {t(item.key)}
                    <ChevronDown
                      className={`transition ${mobileSeoOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileSeoOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="pl-4 space-y-3"
                      >
                        {item.children.map((sub) => (
                          <Link
                            key={sub.slug || sub.key}
                            href={buildHref(sub.href)}
                            className="block text-theme-muted font-medium py-1"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.titles ? sub.titles[lang] || sub.titles.en : t(sub.key)}
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
                  className="block text-theme font-bold text-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ),
            )}

            {/* Mobile Lang */}
            <div className="pt-4 border-t border-[var(--border-color)]">
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className="flex justify-between w-full text-theme-muted font-bold uppercase tracking-widest text-xs"
              >
                {LANGUAGE_LABELS[lang]}
                <ChevronDown className={mobileLangOpen ? "rotate-180" : ""} />
              </button>
              {mobileLangOpen && (
                <div className="mt-4 space-y-3 pl-4">
                  {["en", "fr", "nl"].map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLocale(code);
                        setMobileOpen(false);
                      }}
                      className="block text-theme font-medium"
                    >
                      {LANGUAGE_LABELS[code]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="#contact"
              className="block text-center px-6 py-4 rounded-2xl text-white font-black gradient-purple"
              onClick={() => setMobileOpen(false)}
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
