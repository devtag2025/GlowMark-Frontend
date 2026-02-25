import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import CookieBanner from "@/components/CookieConsent/CookieBanner";
import ConsentScripts from "@/components/CookieConsent/ConsentScripts";

const SUPPORTED_LOCALES = ["en", "fr", "nl"];

export default async function LocaleLayout({ children, params }) {
  const { locale: rawLocale } = await params;
  const locale = SUPPORTED_LOCALES.includes(rawLocale) ? rawLocale : "en";

  return (
    <LanguageProvider initialLang={locale}>
      <Header />
      {children}
      <Footer />
      <ConsentScripts />
      <CookieBanner />
    </LanguageProvider>
  );
}
