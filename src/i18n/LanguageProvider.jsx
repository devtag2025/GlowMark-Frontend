"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { messages } from "./messages";

const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLang }) {
  const [lang, setLang] = useState(
    initialLang && messages[initialLang] ? initialLang : "en",
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionLang = sessionStorage.getItem("NEXT_LOCALE");
    if (sessionLang && messages[sessionLang]) {
      setLang(sessionLang);
      return;
    }
    if (initialLang && messages[initialLang]) {
      setLang(initialLang);
    }
  }, [initialLang]);

  const changeLanguage = (newLang) => {
    if (!messages[newLang]) return;
    setLang(newLang);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("NEXT_LOCALE", newLang);
    }
  };

  const t = (key) => {
    if (!key) return "";

    const getFrom = (source, path) =>
      path
        .split(".")
        .reduce((obj, part) => (obj ? obj[part] : undefined), source);

    const fromCurrent = getFrom(messages[lang], key);
    if (fromCurrent !== undefined) return fromCurrent;

    const fromDefault = getFrom(messages.en, key);
    if (fromDefault !== undefined) return fromDefault;

    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
