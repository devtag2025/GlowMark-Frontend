"use client";

import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function ConsentScripts() {
  const { consent, ready } = useCookieConsent();

  // Real IDs yahan baad me ayengi
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
  const FB_PIXEL_ID = "XXXXXXXXXXXXXXX";

  if (!ready || !consent) return null;

  return (
    <>
      {/* ========== GOOGLE ANALYTICS 4 ========== */}
      {consent.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {/* ========== META PIXEL ========== */}
      {consent.marketing && (
        <>
          <Script id="fb-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        </>
      )}
    </>
  );
}
