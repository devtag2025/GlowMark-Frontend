import { NextResponse } from "next/server";
import { getRouteKeyFromSlug, getRouteSlug } from "./utils/routeTranslations";
import { blogs } from "./data/blogs";
import { seoArticles } from "./data/seo-articles";

const PUBLIC_FILE = /\.(.*)$/;
const LOCALES = ["en", "fr", "nl"];
const DEFAULT_LOCALE = "en";

function findBlogBySlug(slug, locale) {
  return (
    blogs.find((b) => b.slugs?.[locale] === slug) ||
    blogs.find((b) => b.slug === slug)
  );
}

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

function translatePath(pathname, locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return pathname;
  }

  const translatedSegments = [];
  let i = 0;

  while (i < segments.length) {
    const segment = segments[i];
    const routeKey = getRouteKeyFromSlug(segment, locale);

    if (routeKey) {
      const canonicalSlug = getRouteSlug(routeKey, "en");
      translatedSegments.push(canonicalSlug);
      i++;

      if (routeKey === "blog" && i < segments.length) {
        const blogSlug = segments[i];
        const blog = findBlogBySlug(blogSlug, locale);
        if (blog) {
          translatedSegments.push(blog.slug);
          i++;
        } else {
          translatedSegments.push(blogSlug);
          i++;
        }
      } else if (routeKey === "seo" && i < segments.length) {
        const seoSlug = segments[i];
        const article = findSEOArticleBySlug(seoSlug, locale);
        if (article) {
          translatedSegments.push(article.slug);
          i++;
        } else {
          translatedSegments.push(seoSlug);
          i++;
        }
      }
    } else {
      translatedSegments.push(segment);
      i++;
    }
  }

  return "/" + translatedSegments.join("/");
}

function detectLocaleFromHeader(request) {
  const acceptLang = request.headers.get("accept-language") || "";

  const primaryLang = acceptLang
    .split(",")[0]
    .split(";")[0]
    .split("-")[0]
    .trim()
    .toLowerCase();

  console.log("Primary browser language:", primaryLang);

  return LOCALES.includes(primaryLang) ? primaryLang : DEFAULT_LOCALE;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) {
    return;
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const segments = pathname.split("/").filter(Boolean);
    const locale =
      segments[0] && LOCALES.includes(segments[0])
        ? segments[0]
        : DEFAULT_LOCALE;

    if (locale === "en") {
      const pathWithoutLocale = "/" + segments.slice(1).join("/");
      const newPath = pathWithoutLocale === "/" ? "/" : pathWithoutLocale;
      const translatedPath = translatePath(newPath, locale);

      if (translatedPath !== newPath) {
        return NextResponse.redirect(new URL(translatedPath, request.url));
      }
      if (pathname.startsWith("/en")) {
        return NextResponse.redirect(new URL(newPath, request.url));
      }
      return;
    }

    const pathWithoutLocale = "/" + segments.slice(1).join("/");
    const translatedPath = translatePath(pathWithoutLocale, locale);
    const newUrl = new URL(`/${locale}${translatedPath}`, request.url);
    return NextResponse.rewrite(newUrl);
  }

  const detectedLocale = detectLocaleFromHeader(request);
  const translatedPath = translatePath(pathname, detectedLocale);

  if (detectedLocale === "en") {
    const newUrl = new URL(`/en${translatedPath}`, request.url);
    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.redirect(
    new URL(`/${detectedLocale}${translatedPath}`, request.url),
  );
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
