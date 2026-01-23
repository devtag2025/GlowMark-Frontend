"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { messages } from "./messages";

const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLang }) {
  const [lang, setLang] = useState(
    initialLang && messages[initialLang] ? initialLang : "en",
  );

  useEffect(() => {
    // If a locale comes from the URL, prefer it and sync to localStorage
    if (initialLang && messages[initialLang]) {
      setLang(initialLang);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lang", initialLang);
      }
      return;
    }

    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("lang");
    if (stored && messages[stored]) {
      setLang(stored);
    }
  }, [initialLang]);

  const changeLanguage = (newLang) => {
    if (!messages[newLang]) return;
    setLang(newLang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", newLang);
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

