import ConsentScripts from "@/components/CookieConsent/ConsentScripts";
import { LenisProvider } from "./LenisProvider";
import CookieBanner from "@/components/CookieConsent/CookieBanner";

export default function AppProviders({ children }) {
  return (
    <LenisProvider>
      {children}
      <ConsentScripts />
      <CookieBanner />
    </LenisProvider>
  );
}
