import { blogs } from "@/data/blogs";

// Build a locale-aware blog detail URL.
// - locale "en" (or falsy) => /blog/{slug}
// - other locales         => /{locale}/blog/{slug}
// Slug is taken from blog.slugs[locale] when available, otherwise blog.slug.
export function buildBlogUrl(locale, blog) {
  const safeLocale = locale || "en";
  const slug = blog.slugs?.[safeLocale] || blog.slug;

  if (safeLocale === "en") {
    return `/blog/${slug}`;
  }

  return `/${safeLocale}/blog/${slug}`;
}

// Resolve a blog by the slug present in the URL and the current locale.
// This keeps old URLs working (matching blog.slug) while allowing
// per-locale slugs via blog.slugs[locale].
export function resolveBlogBySlug(locale, slug) {
  const safeLocale = locale || "en";

  return (
    blogs.find((b) => b.slugs?.[safeLocale] === slug) ||
    blogs.find((b) => b.slug === slug)
  );
}

