import { blogs } from "@/data/blogs";
import { getRouteSlug } from "./routeTranslations";

/**
 * Build a locale-aware blog detail URL with translated slugs.
 * - locale "en" (or falsy) => /blog/{translated-slug}
 * - other locales         => /{locale}/blog/{translated-slug}
 * Slug is taken from blog.slugs[locale] when available, otherwise blog.slug.
 */
export function buildBlogUrl(locale, blog) {
  const safeLocale = locale || "en";
  const slug = blog.slugs?.[safeLocale] || blog.slug;
  const blogRouteSlug = getRouteSlug("blog", safeLocale);

  if (safeLocale === "en") {
    return `/${blogRouteSlug}/${slug}`;
  }

  return `/${safeLocale}/${blogRouteSlug}/${slug}`;
}

/**
 * Resolve a blog by the slug present in the URL and the current locale.
 * This keeps old URLs working (matching blog.slug) while allowing
 * per-locale slugs via blog.slugs[locale].
 */
export function resolveBlogBySlug(locale, slug) {
  const safeLocale = locale || "en";

  return (
    blogs.find((b) => b.slugs?.[safeLocale] === slug) ||
    blogs.find((b) => b.slug === slug)
  );
}

/**
 * Build a translated URL for a static page route.
 * @param {string} routeKey - Internal route key (e.g., 'pricing', 'privacyPolicy')
 * @param {string} locale - Language code ('en', 'fr', 'nl')
 * @returns {string} Translated URL path
 */
export function buildPageUrl(routeKey, locale = "en") {
  const safeLocale = locale || "en";
  const slug = getRouteSlug(routeKey, safeLocale);

  if (safeLocale === "en") {
    return `/${slug}`;
  }

  return `/${safeLocale}/${slug}`;
}

/**
 * Build a translated URL for the home page.
 * @param {string} locale - Language code ('en', 'fr', 'nl')
 * @returns {string} Translated URL path
 */
export function buildHomeUrl(locale = "en") {
  const safeLocale = locale || "en";

  if (safeLocale === "en") {
    return "/";
  }

  return `/${safeLocale}`;
}

/**
 * Build a locale-aware SEO article URL with translated slugs.
 * - locale "en" (or falsy) => /seo/{translated-slug}
 * - other locales         => /{locale}/seo/{translated-slug}
 * Slug is taken from article.slugs[locale] when available, otherwise article.slug.
 */
export function buildSEOUrl(locale, article) {
  const safeLocale = locale || "en";
  const slug = article.slugs?.[safeLocale] || article.slug;
  const seoRouteSlug = getRouteSlug("seo", safeLocale);

  if (safeLocale === "en") {
    return `/${seoRouteSlug}/${slug}`;
  }

  return `/${safeLocale}/${seoRouteSlug}/${slug}`;
}

/**
 * Resolve an SEO article by the slug present in the URL and the current locale.
 * This keeps old URLs working (matching article.slug) while allowing
 * per-locale slugs via article.slugs[locale].
 */
export function resolveSEOBySlug(locale, slug, articles) {
  const safeLocale = locale || "en";

  return (
    articles.find((a) => a.slugs?.[safeLocale] === slug) ||
    articles.find((a) => a.slug === slug)
  );
}

