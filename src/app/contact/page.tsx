"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ height: '50vh', minHeight: 420 }}>
        <div className="absolute inset-0">
          <Image
            src="https://chefabdel.be/wp-content/uploads/2024/03/8372.jpg"
            alt="Contact"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-bg" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center" style={{ padding: '0 40px' }}>
          <p className="text-gold tracking-[0.3em] uppercase" style={{ fontSize: 14, marginBottom: 24 }}>
            Nous Retrouver
          </p>
          <h1 className="font-heading text-text" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', marginBottom: 24 }}>
            <span className="text-gradient-gold">Contact</span>
          </h1>
          <div className="gold-divider-wide mx-auto" style={{ marginBottom: 28 }} />
          <p className="text-text-muted" style={{ fontSize: 18, maxWidth: 520 }}>
            Réservez votre table ou contactez-nous pour toute demande
            d&apos;information. Nous serons ravis de vous accueillir.
          </p>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="bg-bg" style={{ padding: '160px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 80 }}>
            {/* Left - Info */}
            <Section>
              <div>
                <p className="text-gold tracking-[0.3em] uppercase" style={{ fontSize: 14, marginBottom: 24 }}>
                  Informations
                </p>
                <h2 className="font-heading text-text" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: 40 }}>
                  Venez nous{" "}
                  <span className="text-gradient-gold">rendre visite</span>
                </h2>
                <div className="gold-divider" style={{ marginBottom: 48 }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                  {/* Address */}
                  <div className="flex" style={{ gap: 24 }}>
                    <div className="border border-gold/30 flex items-center justify-center shrink-0" style={{ width: 64, height: 64, borderRadius: 14 }}>
                      <svg className="text-gold" style={{ width: 28, height: 28 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-text font-medium" style={{ fontSize: 20, marginBottom: 10 }}>Adresse</h3>
                      <p className="text-text-muted" style={{ fontSize: 16, lineHeight: 1.7 }}>
                        Bd du Jardin Botanique 7<br />1000 Bruxelles, Belgique
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex" style={{ gap: 24 }}>
                    <div className="border border-gold/30 flex items-center justify-center shrink-0" style={{ width: 64, height: 64, borderRadius: 14 }}>
                      <svg className="text-gold" style={{ width: 28, height: 28 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-text font-medium" style={{ fontSize: 20, marginBottom: 10 }}>Téléphone</h3>
                      <a href="tel:+3226755551" className="text-text-muted hover:text-gold transition-colors" style={{ fontSize: 16 }}>
                        02/675.55.51
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex" style={{ gap: 24 }}>
                    <div className="border border-gold/30 flex items-center justify-center shrink-0" style={{ width: 64, height: 64, borderRadius: 14 }}>
                      <svg className="text-gold" style={{ width: 28, height: 28 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-text font-medium" style={{ fontSize: 20, marginBottom: 10 }}>Horaires</h3>
                      <p className="text-text-muted" style={{ fontSize: 16, lineHeight: 1.7 }}>
                        Lundi &mdash; Vendredi<br />
                        <span className="text-gold font-medium" style={{ fontSize: 18 }}>12h00 &mdash; 23h00</span>
                      </p>
                      <p className="text-text-muted" style={{ fontSize: 16, lineHeight: 1.7, marginTop: 8 }}>
                        Samedi &mdash; Dimanche<br />
                        <span className="text-gold font-medium" style={{ fontSize: 18 }}>13h00 &mdash; 23h00</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-border" style={{ marginTop: 56, paddingTop: 48 }}>
                  <p className="text-text-muted uppercase tracking-wider" style={{ fontSize: 13, marginBottom: 24 }}>
                    Suivez-nous
                  </p>
                  <div className="flex flex-wrap" style={{ gap: 16 }}>
                    {[
                      { label: "Instagram", href: "https://www.instagram.com/steaknchill.be/" },
                      { label: "Facebook", href: "https://www.facebook.com/steaknchill" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-border text-text-muted hover:border-gold hover:text-gold transition-all duration-300"
                        style={{ padding: '14px 24px', borderRadius: 10, fontSize: 15 }}
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Right - Form */}
            <Section delay={0.2}>
              <div className="bg-surface border border-border" style={{ borderRadius: 16, padding: '48px 44px' }}>
                <h3 className="font-heading text-text" style={{ fontSize: 28, marginBottom: 16 }}>
                  Réservation
                </h3>
                <p className="text-text-muted" style={{ fontSize: 16, marginBottom: 48 }}>
                  Remplissez le formulaire ci-dessous ou appelez-nous directement.
                </p>

                {submitted ? (
                  <div className="text-center" style={{ padding: '80px 0' }}>
                    <span className="text-gold block" style={{ fontSize: 56, marginBottom: 32 }}>✓</span>
                    <h4 className="font-heading text-text" style={{ fontSize: 24, marginBottom: 16 }}>Merci !</h4>
                    <p className="text-text-muted" style={{ fontSize: 16 }}>
                      Votre demande a bien été envoyée. Nous vous recontacterons dans les plus brefs délais.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 28 }}>
                      <div>
                        <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 12, marginBottom: 14 }}>
                          Nom *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors"
                          style={{ padding: '16px 20px', borderRadius: 10, fontSize: 16 }}
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 12, marginBottom: 14 }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors"
                          style={{ padding: '16px 20px', borderRadius: 10, fontSize: 16 }}
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 28 }}>
                      <div>
                        <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 12, marginBottom: 14 }}>
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors"
                          style={{ padding: '16px 20px', borderRadius: 10, fontSize: 16 }}
                          placeholder="+32..."
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 12, marginBottom: 14 }}>
                          Nombre de convives
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors appearance-none"
                          style={{ padding: '16px 20px', borderRadius: 10, fontSize: 16 }}
                        >
                          <option value="">Sélectionner</option>
                          <option value="1">1 personne</option>
                          <option value="2">2 personnes</option>
                          <option value="3">3 personnes</option>
                          <option value="4">4 personnes</option>
                          <option value="5">5 personnes</option>
                          <option value="6">6 personnes</option>
                          <option value="7">7+ personnes</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 12, marginBottom: 14 }}>
                        Date souhaitée
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors"
                        style={{ padding: '16px 20px', borderRadius: 10, fontSize: 16 }}
                      />
                    </div>

                    <div>
                      <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 12, marginBottom: 14 }}>
                        Message
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors resize-none"
                        style={{ padding: '16px 20px', borderRadius: 10, fontSize: 16 }}
                        placeholder="Demande spéciale, allergie, occasion..."
                      />
                    </div>

                    <button type="submit" className="btn-gold w-full" style={{ marginTop: 8 }}>
                      Envoyer la demande
                    </button>
                  </form>
                )}
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-surface">
        <Section>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 48px' }}>
            <div className="text-center" style={{ marginBottom: 56 }}>
              <p className="text-gold tracking-[0.3em] uppercase" style={{ fontSize: 14, marginBottom: 24 }}>
                Localisation
              </p>
              <h2 className="font-heading text-text" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginBottom: 16 }}>
                Nous <span className="text-gradient-gold">trouver</span>
              </h2>
              <div className="gold-divider mx-auto" style={{ marginTop: 20 }} />
            </div>
            <div className="relative w-full border border-border overflow-hidden" style={{ aspectRatio: '16/7', minHeight: 380, borderRadius: 16 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.8!2d4.3660!3d50.8540!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c37e0e8b1a55%3A0x0!2sBd+du+Jardin+Botanique+7%2C+1000+Bruxelles!5e0!3m2!1sfr!2sbe!4v1709000000000!5m2!1sfr!2sbe"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Localisation Steak N' Chill"
              />
            </div>
            <div className="text-center" style={{ marginTop: 40 }}>
              <a
                href="https://maps.google.com/?q=Bd+du+Jardin+Botanique+7,+1000+Bruxelles"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
              >
                Ouvrir dans Google Maps
              </a>
            </div>
          </div>
        </Section>
      </section>
    </>
  );
}
