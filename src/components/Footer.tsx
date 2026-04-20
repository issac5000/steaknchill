"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";

const socials = [
  {
    href: "https://www.instagram.com/steaknchill.be/",
    label: "Instagram",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    href: "https://www.facebook.com/steaknchill",
    label: "Facebook",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
];

export default function Footer() {
  const { t } = useTranslation();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/menu", label: t("nav.menu") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="relative">
      {/* Gold separator line */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, #C8A97E 30%, #C8A97E 70%, transparent)",
        }}
      />

      {/* Main footer */}
      <div
        className="r-container r-section"
        style={{
          background:
            "linear-gradient(180deg, #0A0A0A 0%, #070707 100%)",
          padding: "80px 48px 60px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Top : Logo centré + tagline */}
          <div className="text-center" style={{ marginBottom: 64 }}>
            <Link href="/" className="inline-block" style={{ marginBottom: 24 }}>
              <h3
                className="font-heading text-text"
                style={{ fontSize: 28 }}
              >
                Steak N&apos; <span className="text-gradient-gold italic">Chill</span>
              </h3>
            </Link>
            <p
              className="text-text-muted"
              style={{ fontSize: 14, letterSpacing: "0.1em" }}
            >
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation centr��e */}
          <div
            className="flex items-center justify-center flex-wrap r-gap r-mb"
            style={{ gap: 48, marginBottom: 48 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted uppercase hover:text-gold transition-colors duration-300"
                style={{ fontSize: 12, letterSpacing: "0.25em" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="flex justify-center" style={{ marginBottom: 48 }}>
            <div
              style={{
                width: 120,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(200,169,126,0.4), transparent)",
              }}
            />
          </div>

          {/* Infos grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 text-center r-gap r-mb"
            style={{ gap: 40, marginBottom: 56 }}
          >
            {/* Adresse */}
            <div>
              <p
                className="text-gold uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  marginBottom: 16,
                }}
              >
                {t("footer.address")}
              </p>
              <p
                className="text-text-muted"
                style={{ fontSize: 14, lineHeight: 1.8 }}
              >
                Bd du Jardin Botanique 7
                <br />
                1000 Bruxelles
              </p>
            </div>

            {/* Horaires */}
            <div>
              <p
                className="text-gold uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  marginBottom: 16,
                }}
              >
                {t("footer.hours")}
              </p>
              <p
                className="text-text-muted"
                style={{ fontSize: 14, lineHeight: 1.8 }}
              >
                {t("footer.hours.weekday")} <span className="text-text">{t("footer.hours.weekdayVal")}</span>
                <br />
                {t("footer.hours.weekend")} <span className="text-text">{t("footer.hours.weekendVal")}</span>
              </p>
            </div>

            {/* Contact */}
            <div>
              <p
                className="text-gold uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  marginBottom: 16,
                }}
              >
                {t("footer.reservation")}
              </p>
              <a
                href="tel:+3226755551"
                className="text-text-muted hover:text-text transition-colors block"
                style={{ fontSize: 14, lineHeight: 1.8 }}
              >
                02/675.55.51
              </a>
            </div>
          </div>

          {/* Socials */}
          <div
            className="flex items-center justify-center"
            style={{ gap: 20, marginBottom: 56 }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={s.label}
              >
                <div
                  className="flex items-center justify-center transition-all duration-300 group-hover:border-gold group-hover:text-gold text-text-muted"
                  style={{
                    width: 44,
                    height: 44,
                    border: "1px solid #2A2A2A",
                    borderRadius: "50%",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {s.icon}
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="r-container"
        style={{
          borderTop: "1px solid #1A1A1A",
          background: "#050505",
          padding: "24px 48px",
        }}
      >
        <div
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{ maxWidth: 1100, margin: "0 auto", gap: 12 }}
        >
          <p className="text-text-muted/40" style={{ fontSize: 12 }}>
            &copy; {new Date().getFullYear()} Steak N&apos; Chill. {t("footer.rights")}
          </p>
          <p className="text-text-muted/60" style={{ fontSize: 12 }}>
            {t("footer.poweredBy")}{" "}
            <a
              href="https://synaplink.be"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors duration-300"
            >
              Synap&apos;Link
            </a>
          </p>
          <p
            className="text-text-muted/40"
            style={{ fontSize: 12, letterSpacing: "0.1em" }}
          >
            Bd du Jardin Botanique 7, 1000 Bruxelles
          </p>
        </div>
      </div>
    </footer>
  );
}
