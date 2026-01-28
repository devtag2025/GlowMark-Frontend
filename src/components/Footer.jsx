"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const Footer = () => {
  const { t, lang } = useLanguage();

  const CompanyItem = [
    {
      key: "footer.blog",
      href: (currentLang) =>
        currentLang === "en" ? "/blog" : `/${currentLang}/blog`,
    },
    {
      key: "footer.pricing",
      href: (currentLang) =>
        currentLang === "en" ? "/pricing" : `/${currentLang}/pricing`,
    },
  ];

  const LegalItem = [
    {
      key: "footer.general",
      href: (currentLang) =>
        currentLang === "en"
          ? "/general-conditions"
          : `/${currentLang}/general-conditions`,
    },
    {
      key: "footer.privacy",
      href: (currentLang) =>
        currentLang === "en"
          ? "/privacy-policy"
          : `/${currentLang}/privacy-policy`,
    },
    {
      key: "footer.cookies",
      href: (currentLang) =>
        currentLang === "en"
          ? "/cookies-policy"
          : `/${currentLang}/cookies-policy`,
    },
  ];

  const buildHref = (href) => (typeof href === "function" ? href(lang) : href);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-16 bg-gradient-to-br from-[#6B207A] to-purple-500 text-white overflow-hidden shadow-lg shadow-purple-900/20">
      {/* Top subtle line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-60" />

      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={100}
                height={100}
                className="rounded-lg shadow-md shadow-purple-900/30"
              />
            </Link>

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                {t("footer.title")}
                <span className="text-purple-300">
                  {t("footer.titleHighlight")}
                </span>
              </h2>
              <p className="text-base text-purple-200 mt-1">
                {t("footer.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <p className="text-base font-bold text-purple-200 leading-relaxed">
              Infos +32 3 434 36 35 <br />
              WhatsApp: +32 491 55 67 29
            </p>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-widest text-xs text-purple-300 mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3 text-base font-semibold text-purple-200">
              {CompanyItem.map((item) => (
                <li key={item.key}>
                  <Link
                    href={buildHref(item.href)}
                    className="inline-block transition hover:text-white hover:translate-x-1"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-widest text-xs text-purple-300 mb-4">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-3 text-base font-semibold text-purple-200">
              {LegalItem.map((item) => (
                <li key={item.key}>
                  <Link
                    href={buildHref(item.href)}
                    className="inline-block transition hover:text-white hover:translate-x-1"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-end justify-start md:justify-end">
            <button
              onClick={scrollToTop}
              className="
                flex items-center gap-2
                px-4 py-2 cursor-pointer
                text-xs font-semibold uppercase
                rounded
                bg-white
                text-purple-900
                border border-purple-300/30
                backdrop-blur
                shadow-lg shadow-purple-900/30
                transition-all duration-300
                hover:bg-purple-200
                hover:-translate-y-1
              "
            >
              {t("footer.top")}
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-purple-100/40">
          <p className="text-center text-[10px] md:text-xs text-purple-300 font-medium tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Glow Mark Agency • {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
