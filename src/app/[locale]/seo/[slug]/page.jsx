"use client";

import { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getArticleBySlug, getSortedArticles } from "@/data/seo-articles";
import { useLanguage } from "@/i18n/LanguageProvider";
import SEOContentRenderer from "@/components/SEO/SEOContentRenderer";
import { buildSEOUrl, buildHomeUrl } from "@/utils/paths";

export default function SEOArticlePage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const article = getArticleBySlug(params.slug, lang);

  if (!article) {
    notFound();
  }

  // Compute the canonical URL for this article in the current locale.
  // If the current path doesn't match (e.g. using another locale's slug),
  // gently canonicalize it with a client-side replace.
  const canonicalHref = buildSEOUrl(lang, article);

  useEffect(() => {
    if (!article) return;
    if (pathname !== canonicalHref) {
      router.replace(canonicalHref);
    }
  }, [article, pathname, canonicalHref, router]);

  // Get next and previous articles for navigation
  const sortedArticles = getSortedArticles();
  // Find current article index by matching slug (any locale)
  const currentIndex = sortedArticles.findIndex(
    (a) =>
      a.slug === params.slug ||
      a.slugs?.en === params.slug ||
      a.slugs?.fr === params.slug ||
      a.slugs?.nl === params.slug
  );
  const prevArticle =
    currentIndex > 0 ? sortedArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < sortedArticles.length - 1
      ? sortedArticles[currentIndex + 1]
      : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Link
          href={buildHomeUrl(lang)}
          className="inline-flex items-center gap-2 text-theme-muted hover:text-theme transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t("seo.backToHome")}</span>
        </Link>
      </motion.div>

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SEOContentRenderer article={article} />
      </motion.div>

      {/* Previous/Next Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 pt-8 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {prevArticle ? (
          <Link
            href={buildSEOUrl(lang, prevArticle)}
            className="group p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-purple-500/30 transition-all"
          >
            <span className="text-xs text-theme-muted uppercase tracking-wider">
              {t("seo.previous")}
            </span>
            <p className="text-sm font-medium text-theme-secondary group-hover:text-theme mt-1 line-clamp-2">
              {prevArticle.titles[lang] || prevArticle.titles.en}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {nextArticle && (
          <Link
            href={buildSEOUrl(lang, nextArticle)}
            className="group p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-purple-500/30 transition-all text-right"
          >
            <span className="text-xs text-theme-muted uppercase tracking-wider">
              {t("seo.next")}
            </span>
            <p className="text-sm font-medium text-theme-secondary group-hover:text-theme mt-1 line-clamp-2">
              {nextArticle.titles[lang] || nextArticle.titles.en}
            </p>
          </Link>
        )}
      </motion.div>
    </>
  );
}
