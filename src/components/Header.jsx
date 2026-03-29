"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { usePathname, useRouter } from "next/navigation";
import { getSortedArticles } from "@/data/seo-articles";
import { buildPageUrl, buildHomeUrl, buildSEOUrl } from "@/utils/paths";
import { getRouteKeyFromSlug } from "@/utils/routeTranslations";

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenKey, setMobileOpenKey] = useState(null);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [desktopLangOpen, setDesktopLangOpen] = useState(false);
  const [desktopSeoOpen, setDesktopSeoOpen] = useState(false);

  const LANGUAGE_LABELS = {
    en: t("common.english"),
    fr: t("common.french"),
    nl: t("common.dutch"),
  };

  const seoArticles = useMemo(() => getSortedArticles(), []);

  const handleAnchorClick = (id) => {
    if (!id) return;
    const isHome = pathname === "/" || pathname === `/${lang}`;
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    router.push(`${buildHomeUrl(lang)}#${id}`);
  };

  const NavigationItem = [
    { key: "header.home", href: (currentLang) => buildHomeUrl(currentLang) },
    {
      key: "header.seo",
      href: "#",
      children: seoArticles.map((article) => ({
        slug: article.slug,
        titles: article.titles,
        href: (currentLang) => buildSEOUrl(currentLang, article),
      })),
    },
    {
      key: "header.blog",
      href: (currentLang) => buildPageUrl("blog", currentLang),
    },
    {
      key: "header.pricing",
      href: (currentLang) => buildPageUrl("pricing", currentLang),
    },
    {
      key: "header.faq",
      href: "#faq",
      onClick: () => handleAnchorClick("faq"),
    },
    {
      key: "header.contact",
      href: "#contact",
      onClick: () => handleAnchorClick("contact"),
    },
  ];

  const buildHref = (href) => (typeof href === "function" ? href(lang) : href);

  const isActive = (item) => {
    const href = buildHref(item.href);
    if (!href || href === "#" || href.startsWith("#")) return false;
    const homeUrl = buildHomeUrl(lang);
    if (href === homeUrl || href === "/")
      return pathname === homeUrl || pathname === "/";
    return pathname.startsWith(href);
  };

  const isSeoActive = (children) => {
    return children.some((sub) => {
      const href = buildHref(sub.href);
      return pathname === href || pathname.startsWith(href);
    });
  };

  const changeLocale = (nextLocale) => {
    sessionStorage.setItem("NEXT_LOCALE", nextLocale);
    setLang(nextLocale);

    if (!pathname || pathname === "/" || pathname === "/en") {
      router.push(buildHomeUrl(nextLocale));
      return;
    }

    const segments = pathname.split("/").filter(Boolean);
    const hasLocalePrefix = ["en", "fr", "nl"].includes(segments[0]);
    const currentLocale = hasLocalePrefix ? segments[0] : "en";
    const pathSegments = hasLocalePrefix ? segments.slice(1) : segments;

    if (pathSegments.length === 1) {
      const currentSlug = pathSegments[0];
      const routeKey = getRouteKeyFromSlug(currentSlug, currentLocale);
      if (routeKey) {
        router.push(buildPageUrl(routeKey, nextLocale));
        return;
      }
    }

    if (pathSegments[0] === "seo") {
      const rest = pathSegments.slice(1).join("/");
      router.push(`/${nextLocale}/seo/${rest}`);
      return;
    }

    router.push(`/${nextLocale}/${pathSegments.join("/")}`);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash?.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  useEffect(() => {
    if (desktopLangOpen || desktopSeoOpen) {
      document.body.style.overflow = "hidden"; // prevent scroll
    } else {
      document.body.style.overflow = ""; // allow scroll
    }

    return () => {
      document.body.style.overflow = ""; // cleanup on unmount
    };
  }, [desktopLangOpen, desktopSeoOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[var(--header-bg)] border-b border-[var(--header-border)] shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href={buildHomeUrl(lang)} className="relative z-10">
            <Image
              src="/logo.png"
              alt="Glow Mark Agency"
              width={100}
              height={100}
              className="rounded-lg"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8" role="navigation">
            {NavigationItem.map((item) =>
              item.children ? (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setDesktopSeoOpen(true)}
                  onMouseLeave={() => setDesktopSeoOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 font-semibold transition-colors relative ${
                      isSeoActive(item.children)
                        ? "text-theme"
                        : "text-theme-secondary hover:text-theme"
                    }`}
                  >
                    {t(item.key)}
                    <ChevronDown
                      className={`w-4 h-4 transition ${desktopSeoOpen ? "rotate-180" : ""}`}
                    />
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-purple-500 transition-all duration-300 ${
                        isSeoActive(item.children)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>

                  <div
                    className="absolute left-0 mt-3 w-72 max-h-[70vh] overflow-y-auto bg-[var(--card-bg-solid)] rounded-xl shadow-lg border border-[var(--border-color)] opacity-0 invisible transition-all duration-200"
                    style={{
                      opacity: desktopSeoOpen ? 1 : 0,
                      visibility: desktopSeoOpen ? "visible" : "hidden",
                    }}
                  >
                    {item.children.map((sub) => (
                      <Link
                        key={sub.slug || sub.key}
                        href={buildHref(sub.href)}
                        className="block px-4 py-3 text-sm text-theme-muted hover:text-theme hover:bg-[var(--background-secondary)] transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {sub.titles
                          ? sub.titles[lang] || sub.titles.en
                          : t(sub.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.onClick ? (
                <button
                  key={item.key}
                  onClick={item.onClick}
                  className="text-theme-secondary hover:text-theme font-semibold transition-colors relative group cursor-pointer"
                >
                  {t(item.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
                </button>
              ) : (
                <Link
                  key={item.key}
                  href={buildHref(item.href)}
                  className={`font-semibold transition-colors relative group ${
                    isActive(item)
                      ? "text-theme"
                      : "text-theme-secondary hover:text-theme"
                  }`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-purple-500 transition-all duration-300 ${
                      isActive(item) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ),
            )}

            <div className="relative">
              <button
                onClick={() => setDesktopLangOpen(!desktopLangOpen)}
                className="flex items-center gap-1 text-theme-secondary hover:text-theme font-semibold cursor-pointer"
                aria-expanded={desktopLangOpen}
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
              href={buildPageUrl("request", lang)}
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
                    onClick={() =>
                      setMobileOpenKey(
                        mobileOpenKey === item.key ? null : item.key,
                      )
                    }
                    className={`flex justify-between w-full font-bold text-lg ${
                      isSeoActive(item.children)
                        ? "text-purple-500"
                        : "text-theme"
                    }`}
                    aria-expanded={mobileOpenKey === item.key}
                  >
                    {t(item.key)}
                    <ChevronDown
                      className={`transition ${mobileOpenKey === item.key ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileOpenKey === item.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="pl-4 space-y-3"
                      >
                        {item.children.map((sub) => {
                          const subHref = buildHref(sub.href);
                          const isSubActive =
                            pathname === subHref ||
                            pathname.startsWith(subHref);
                          return (
                            <Link
                              key={sub.slug || sub.key}
                              href={subHref}
                              className={`block font-medium py-1 ${
                                isSubActive
                                  ? "text-purple-500"
                                  : "text-theme-muted"
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.titles
                                ? sub.titles[lang] || sub.titles.en
                                : t(sub.key)}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : item.onClick ? (
                <button
                  key={item.key}
                  onClick={() => {
                    item.onClick();
                    setMobileOpen(false);
                  }}
                  className="block text-theme font-bold text-lg"
                >
                  {t(item.key)}
                </button>
              ) : (
                <Link
                  key={item.key}
                  href={buildHref(item.href)}
                  className={`block font-bold text-lg ${isActive(item) ? "text-purple-500" : "text-theme"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ),
            )}

            <div className="pt-4 border-t border-[var(--border-color)]">
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className="flex justify-between w-full text-theme-muted font-bold uppercase tracking-widest text-xs"
                aria-expanded={mobileLangOpen}
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
              href={buildPageUrl("request", lang)}
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
