/**
 * Central route translation map for URL path segments.
 * Maps internal route keys to localized URL slugs for each language.
 * 
 * This allows URLs to be fully translated:
 * - English: /en/pricing
 * - French: /fr/tarifs
 * - Dutch: /nl/prijzen
 * 
 * All routes should use these translations when building URLs.
 */

export const routeTranslations = {
  // Static pages
  pricing: {
    en: 'pricing',
    fr: 'tarifs',
    nl: 'prijzen',
  },
  blog: {
    en: 'blog',
    fr: 'blog',
    nl: 'blog',
  },
  seo: {
    en: 'seo',
    fr: 'seo',
    nl: 'seo',
  },
  request: {
    en: 'request',
    fr: 'demande',
    nl: 'aanvraag',
  },
  privacyPolicy: {
    en: 'privacy-policy',
    fr: 'politique-de-confidentialite',
    nl: 'privacybeleid',
  },
  cookiesPolicy: {
    en: 'cookies-policy',
    fr: 'politique-des-cookies',
    nl: 'cookiebeleid',
  },
  generalConditions: {
    en: 'general-conditions',
    fr: 'conditions-generales',
    nl: 'algemene-voorwaarden',
  },
};

/**
 * Get the translated slug for a route key and locale.
 * @param {string} routeKey - Internal route identifier (e.g., 'pricing', 'blog')
 * @param {string} locale - Language code ('en', 'fr', 'nl')
 * @returns {string} Translated slug for the URL
 */
export function getRouteSlug(routeKey, locale = 'en') {
  const route = routeTranslations[routeKey];
  if (!route) {
    console.warn(`Route translation not found for key: ${routeKey}`);
    return routeKey;
  }
  return route[locale] || route.en || routeKey;
}

/**
 * Reverse lookup: Find the route key from a localized slug.
 * @param {string} slug - The localized slug from the URL
 * @param {string} locale - Language code ('en', 'fr', 'nl')
 * @returns {string|null} Route key if found, null otherwise
 */
export function getRouteKeyFromSlug(slug, locale = 'en') {
  for (const [key, translations] of Object.entries(routeTranslations)) {
    if (translations[locale] === slug || translations.en === slug) {
      return key;
    }
  }
  return null;
}

/**
 * Get all possible slugs for a route (for reverse lookup in middleware).
 * @returns {Object} Map of slug -> { routeKey, locale }
 */
export function getAllSlugMappings() {
  const mappings = {};
  
  for (const [routeKey, translations] of Object.entries(routeTranslations)) {
    for (const [locale, slug] of Object.entries(translations)) {
      if (!mappings[slug]) {
        mappings[slug] = [];
      }
      mappings[slug].push({ routeKey, locale });
    }
  }
  
  return mappings;
}
