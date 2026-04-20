"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import fr from "./fr";
import en from "./en";
import nl from "./nl";

export type Locale = "fr" | "en" | "nl";

type Dictionary = Record<string, string>;

const dictionaries: Record<Locale, Dictionary> = { fr, en, nl };

const STORAGE_KEY = "steaknchill-lang";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with "fr" to avoid hydration mismatch
  const [locale, setLocaleState] = useState<Locale>("fr");

  // Read localStorage after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && dictionaries[saved]) {
        setLocaleState(saved);
      }
    } catch {}
  }, []);

  // Persist and update html lang
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      return dictionaries[locale]?.[key] ?? dictionaries.fr?.[key] ?? fallback ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
