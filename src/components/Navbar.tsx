"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/menu", label: t("nav.menu") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
    <nav
      className="fixed z-50 transition-all duration-700 ease-out"
      style={{
        top: scrolled ? 16 : 0,
        left: scrolled ? 24 : 0,
        right: scrolled ? 24 : 0,
        borderRadius: scrolled ? 9999 : 0,
        background: scrolled
          ? "rgba(10, 10, 10, 0.4)"
          : "transparent",
        backdropFilter: scrolled ? "blur(40px) saturate(1.8)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(40px) saturate(1.8)" : "none",
        border: scrolled
          ? "1px solid rgba(200, 169, 126, 0.25)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 8px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(200, 169, 126, 0.08), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "none",
      }}
    >
      <div
        className="r-nav"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: scrolled ? "0 32px" : "0 48px",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            height: scrolled ? 64 : 88,
            transition: "height 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10" style={{ gap: 10 }}>
            <Image
              src="/logopng.webp"
              alt="Steak N' Chill"
              width={scrolled ? 36 : 44}
              height={scrolled ? 36 : 44}
              style={{
                width: scrolled ? 36 : 44,
                height: scrolled ? 36 : 44,
                transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
            <span
              className="font-heading text-gold"
              style={{
                fontSize: scrolled ? 18 : 22,
                letterSpacing: "0.03em",
                transition: "font-size 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              Steak N&apos; <span className="italic">Chill</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center" style={{ gap: 40 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative uppercase transition-colors duration-300"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color:
                    pathname === link.href
                      ? "#C8A97E"
                      : "#A3A3A3",
                  padding: "8px 0",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href)
                    e.currentTarget.style.color = "#C8A97E";
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href)
                    e.currentTarget.style.color = "#A3A3A3";
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute left-0 right-0 bg-gold"
                    style={{ bottom: -2, height: 1 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center" style={{ gap: 16 }}>
            <LanguageSwitcher variant="desktop" />
            <a
              href="tel:+3226755551"
              className="text-text-muted hover:text-gold transition-colors"
              style={{ fontSize: 14 }}
            >
              02/675.55.51
            </a>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: scrolled ? "10px 28px" : "12px 32px",
                background: "linear-gradient(135deg, #C8A97E, #A08456)",
                color: "#070707",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: scrolled ? 9999 : 0,
                transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {t("nav.reserve")}
            </Link>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="md:hidden flex items-center relative z-10" style={{ gap: 8 }}>
            <LanguageSwitcher variant="desktop" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col items-center justify-center"
              style={{ width: 48, height: 48, gap: 7 }}
              aria-label="Menu"
            >
            <span
              className="block bg-gold transition-all duration-300"
              style={{
                width: 26,
                height: 1,
                transform: mobileOpen
                  ? "rotate(45deg) translateY(4px)"
                  : "none",
              }}
            />
            <span
              className="block bg-gold transition-all duration-300"
              style={{
                width: 26,
                height: 1,
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block bg-gold transition-all duration-300"
              style={{
                width: 26,
                height: 1,
                transform: mobileOpen
                  ? "rotate(-45deg) translateY(-4px)"
                  : "none",
              }}
            />
            </button>
          </div>
        </div>
      </div>

    </nav>

    {/* Mobile Menu — outside nav to avoid backdrop-filter containing block */}
    <div
      className="md:hidden fixed inset-0 z-50 transition-all duration-500"
      style={{
        background: "rgba(7, 7, 7, 0.98)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? "auto" : "none",
      }}
    >
      {/* Close button */}
      <button
        onClick={() => setMobileOpen(false)}
        className="absolute flex flex-col items-center justify-center"
        style={{ top: 20, right: 20, width: 48, height: 48, zIndex: 10 }}
        aria-label={t("nav.close")}
      >
        <span className="block bg-gold" style={{ width: 26, height: 1, transform: "rotate(45deg) translateY(0.5px)" }} />
        <span className="block bg-gold" style={{ width: 26, height: 1, transform: "rotate(-45deg) translateY(-0.5px)" }} />
      </button>

      <div
        className="flex flex-col items-center justify-center h-full"
        style={{ gap: 48 }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-heading transition-colors"
            style={{
              fontSize: 36,
              letterSpacing: "0.03em",
              color: pathname === link.href ? "#C8A97E" : "#F5F5F5",
            }}
          >
            {link.label}
          </Link>
        ))}
        <div className="gold-divider-wide" style={{ marginTop: 16 }} />
        <LanguageSwitcher variant="mobile" />
        <a
          href="tel:+3226755551"
          className="text-text-muted hover:text-gold transition-colors"
          style={{ fontSize: 20 }}
        >
          02/675.55.51
        </a>
        <Link
          href="/contact"
          className="btn-gold"
          style={{ marginTop: 8, borderRadius: 9999 }}
        >
          {t("nav.reserveTable")}
        </Link>
      </div>
    </div>
    </>
  );
}
