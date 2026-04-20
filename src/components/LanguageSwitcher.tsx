"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation, Locale } from "@/i18n";

const languages: { code: Locale; flag: string; label: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "nl", flag: "🇳🇱", label: "NL" },
];

export default function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (variant === "mobile") {
    return (
      <div style={{ display: "flex", gap: 12 }}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            style={{
              padding: "8px 16px",
              fontSize: 14,
              letterSpacing: "0.05em",
              background: locale === lang.code
                ? "linear-gradient(135deg, #C8A97E, #A08456)"
                : "transparent",
              color: locale === lang.code ? "#070707" : "#A3A3A3",
              border: locale === lang.code
                ? "none"
                : "1px solid rgba(200,169,126,0.3)",
              borderRadius: 9999,
              cursor: "pointer",
              fontWeight: locale === lang.code ? 700 : 400,
              transition: "all 0.3s ease",
              fontFamily: "inherit",
            }}
          >
            {lang.flag} {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          background: "rgba(200,169,126,0.08)",
          border: "1px solid rgba(200,169,126,0.2)",
          borderRadius: 9999,
          cursor: "pointer",
          color: "#C8A97E",
          fontSize: 12,
          letterSpacing: "0.1em",
          fontWeight: 500,
          transition: "all 0.3s ease",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(200,169,126,0.5)";
          e.currentTarget.style.background = "rgba(200,169,126,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(200,169,126,0.2)";
          e.currentTarget.style.background = "rgba(200,169,126,0.08)";
        }}
      >
        <span style={{ fontSize: 14, lineHeight: 1 }}>{current.flag}</span>
        <span>{current.label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
          }}
        >
          <path d="M2 4L5 7L8 4" stroke="#C8A97E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "rgba(15,15,15,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(200,169,126,0.2)",
            borderRadius: 12,
            overflow: "hidden",
            minWidth: 120,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            zIndex: 100,
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "12px 16px",
                background: locale === lang.code ? "rgba(200,169,126,0.1)" : "transparent",
                border: "none",
                cursor: "pointer",
                color: locale === lang.code ? "#C8A97E" : "#A3A3A3",
                fontSize: 13,
                fontWeight: locale === lang.code ? 600 : 400,
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (locale !== lang.code) {
                  e.currentTarget.style.background = "rgba(200,169,126,0.06)";
                  e.currentTarget.style.color = "#E8D5B5";
                }
              }}
              onMouseLeave={(e) => {
                if (locale !== lang.code) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#A3A3A3";
                }
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
