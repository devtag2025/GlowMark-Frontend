import { NextResponse } from "next/server";
import { getRouteKeyFromSlug, getRouteSlug } from "./utils/routeTranslations";
import { blogs } from "./data/blogs";
import { seoArticles } from "./data/seo-articles";

const PUBLIC_FILE = /\.(.*)$/;
const LOCALES = ["en", "fr", "nl"];
const DEFAULT_LOCALE = "en";

/**
 * Find blog by translated slug
 */
function findBlogBySlug(slug, locale) {
  return (
    blogs.find((b) => b.slugs?.[locale] === slug) ||
    blogs.find((b) => b.slug === slug)
  );
}

/**
 * Find SEO article by slug, trying locale-specific match first,
 * then falling back to any locale slug or canonical slug.
 */
function findSEOArticleBySlug(slug, locale) {
  const byLocale =
    seoArticles.find((a) => a.slugs?.[locale] === slug || a.slug === slug) ||
    null;

  if (byLocale) {
    return byLocale;
  }

  return (
    seoArticles.find(
      (a) =>
        a.slug === slug ||
        a.slugs?.en === slug ||
        a.slugs?.fr === slug ||
        a.slugs?.nl === slug,
    ) || null
  );
}

/**
 * Translate URL path segments from localized slugs to canonical routes
 */
function translatePath(pathname, locale) {
  const segments = pathname.split("/").filter(Boolean);
  
  // If no segments, return as-is (home page)
  if (segments.length === 0) {
    return pathname;
  }

  const translatedSegments = [];
  let i = 0;

  while (i < segments.length) {
    const segment = segments[i];
    
    // Check if this is a route segment that needs translation
    const routeKey = getRouteKeyFromSlug(segment, locale);
    
    if (routeKey) {
      // Translate the route segment to canonical form
      const canonicalSlug = getRouteSlug(routeKey, "en"); // Use English as canonical
      translatedSegments.push(canonicalSlug);
      i++;
      
      // Handle dynamic routes (blog/[slug] and seo/[slug])
      if (routeKey === "blog" && i < segments.length) {
        const blogSlug = segments[i];
        const blog = findBlogBySlug(blogSlug, locale);
        if (blog) {
          // Use canonical blog slug (English)
          translatedSegments.push(blog.slug);
          i++;
        } else {
          // Keep original slug if not found (backward compatibility)
          translatedSegments.push(blogSlug);
          i++;
        }
      } else if (routeKey === "seo" && i < segments.length) {
        const seoSlug = segments[i];
        const article = findSEOArticleBySlug(seoSlug, locale);
        if (article) {
          // Use canonical SEO article slug (English)
          translatedSegments.push(article.slug);
          i++;
        } else {
          // Keep original slug if not found (backward compatibility)
          translatedSegments.push(seoSlug);
          i++;
        }
      }
    } else {
      // Not a translatable route, keep as-is
      translatedSegments.push(segment);
      i++;
    }
  }

  return "/" + translatedSegments.join("/");
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip public files and api routes
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) {
    return;
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname
    const segments = pathname.split("/").filter(Boolean);
    const locale = segments[0] && LOCALES.includes(segments[0]) ? segments[0] : DEFAULT_LOCALE;
    
    // If it's /en or /en/*, redirect to / or /* (remove en prefix for English)
    if (locale === "en") {
      const pathWithoutLocale = "/" + segments.slice(1).join("/");
      const newPath = pathWithoutLocale === "/" ? "/" : pathWithoutLocale;
      
      // Translate the path to canonical form before redirecting
      const translatedPath = translatePath(newPath, locale);
      
      // Only redirect if path needs translation (to avoid infinite loops)
      if (translatedPath !== newPath) {
        return NextResponse.redirect(new URL(translatedPath, request.url));
      }
      // If already canonical, redirect to remove /en prefix
      if (pathname.startsWith("/en")) {
        return NextResponse.redirect(new URL(newPath, request.url));
      }
      return;
    }
    
    // For non-English locales, translate the path and rewrite
    const pathWithoutLocale = "/" + segments.slice(1).join("/");
    const translatedPath = translatePath(pathWithoutLocale, locale);
    const newUrl = new URL(`/${locale}${translatedPath}`, request.url);
    return NextResponse.rewrite(newUrl);
  }

  // No locale in path = treat as English, rewrite to /en/*
  const translatedPath = translatePath(pathname, DEFAULT_LOCALE);
  const newUrl = new URL(`/en${translatedPath}`, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
