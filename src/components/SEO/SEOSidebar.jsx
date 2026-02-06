"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSortedArticles } from "@/data/seo-articles";
import { useLanguage } from "@/i18n/LanguageProvider";
import { buildSEOUrl } from "@/utils/paths";

export default function SEOSidebar() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const articles = getSortedArticles();

  return (
    <nav className="glow-card rounded-2xl p-6">
      <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4">
        {t("seo.sidebarTitle")}
      </h3>
      <ul className="space-y-1">
        {articles.map((article) => {
          const href = buildSEOUrl(lang, article);
          // Check if current pathname includes the article's slug (any locale)
          const articleSlugs = [
            article.slug,
            article.slugs?.en,
            article.slugs?.fr,
            article.slugs?.nl,
          ].filter(Boolean);
          const isActive = articleSlugs.some((slug) => pathname.includes(slug));

          return (
            <li key={article.id}>
              <Link
                href={href}
                className={`block px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-purple-500/20 text-purple-400 font-medium border-l-2 border-purple-500"
                    : "text-theme-secondary hover:bg-[var(--background-secondary)] hover:text-theme"
                }`}
              >
                {article.titles[lang] || article.titles.en}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
