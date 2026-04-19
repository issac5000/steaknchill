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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error("URL du webhook non configurée.");
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'envoi. Veuillez réessayer.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", guests: "", date: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
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

      {/* INFO CARDS */}
      <section className="bg-bg r-section-pad" style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Section>
            <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16 }}>
              {/* Address Card */}
              <div style={{
                background: '#0F0F0F',
                border: '1px solid #2A2A2A',
                borderRadius: 14,
                padding: '32px 28px',
                transition: 'border-color 0.3s ease',
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(200,169,126,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2A2A2A'}
              >
                <svg className="text-gold" style={{ width: 24, height: 24, marginBottom: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-text font-medium" style={{ fontSize: 16, marginBottom: 8 }}>Adresse</h3>
                <p className="text-text-muted" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  Bd du Jardin Botanique 7<br />1000 Bruxelles
                </p>
              </div>

              {/* Phone Card */}
              <div style={{
                background: '#0F0F0F',
                border: '1px solid #2A2A2A',
                borderRadius: 14,
                padding: '32px 28px',
                transition: 'border-color 0.3s ease',
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(200,169,126,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2A2A2A'}
              >
                <svg className="text-gold" style={{ width: 24, height: 24, marginBottom: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="text-text font-medium" style={{ fontSize: 16, marginBottom: 8 }}>Téléphone</h3>
                <a href="tel:+3226755551" className="text-text-muted hover:text-gold transition-colors" style={{ fontSize: 14 }}>
                  02/675.55.51
                </a>
              </div>

              {/* Hours Card */}
              <div style={{
                background: '#0F0F0F',
                border: '1px solid #2A2A2A',
                borderRadius: 14,
                padding: '32px 28px',
                transition: 'border-color 0.3s ease',
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(200,169,126,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2A2A2A'}
              >
                <svg className="text-gold" style={{ width: 24, height: 24, marginBottom: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-text font-medium" style={{ fontSize: 16, marginBottom: 8 }}>Horaires</h3>
                <p className="text-text-muted" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  Lun–Ven : <span className="text-gold">12h–23h</span><br />
                  Sam–Dim : <span className="text-gold">13h–23h</span>
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* RESERVATION FORM */}
      <section className="bg-surface r-section-pad" style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Section>
            <div className="text-center" style={{ marginBottom: 40 }}>
              <p className="text-gold tracking-[0.3em] uppercase" style={{ fontSize: 13, marginBottom: 16 }}>
                Réservation
              </p>
              <h2 className="font-heading text-text" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginBottom: 12 }}>
                Réservez votre <span className="text-gradient-gold">table</span>
              </h2>
              <div className="gold-divider" style={{ marginTop: 16, marginLeft: 'auto', marginRight: 'auto' }} />
            </div>

            <div className="r-card" style={{
              background: '#0F0F0F',
              border: '1px solid #2A2A2A',
              borderRadius: 16,
              padding: '36px 32px',
            }}>
              {error && (
                <div style={{
                  padding: '14px 18px',
                  borderRadius: 10,
                  marginBottom: 20,
                  border: '1px solid rgba(220, 80, 80, 0.3)',
                  backgroundColor: 'rgba(220, 80, 80, 0.08)',
                  color: '#e08080',
                  fontSize: 14,
                  lineHeight: 1.5,
                }}>
                  {error}
                </div>
              )}

              {submitted ? (
                <div className="text-center" style={{ padding: '48px 0' }}>
                  <span className="text-gold block" style={{ fontSize: 48, marginBottom: 20 }}>✓</span>
                  <h4 className="font-heading text-text" style={{ fontSize: 22, marginBottom: 12 }}>Merci !</h4>
                  <p className="text-text-muted" style={{ fontSize: 15 }}>
                    Votre demande a bien été envoyée. Nous vous recontacterons rapidement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
                    <div>
                      <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 11, marginBottom: 10 }}>
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors"
                        style={{ padding: '14px 16px', borderRadius: 10, fontSize: 15 }}
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 11, marginBottom: 10 }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors"
                        style={{ padding: '14px 16px', borderRadius: 10, fontSize: 15 }}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16 }}>
                    <div>
                      <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 11, marginBottom: 10 }}>
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors"
                        style={{ padding: '14px 16px', borderRadius: 10, fontSize: 15 }}
                        placeholder="+32..."
                      />
                    </div>
                    <div>
                      <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 11, marginBottom: 10 }}>
                        Convives
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors appearance-none"
                        style={{ padding: '14px 16px', borderRadius: 10, fontSize: 15 }}
                      >
                        <option value="">Nb.</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 11, marginBottom: 10 }}>
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors"
                        style={{ padding: '14px 16px', borderRadius: 10, fontSize: 15 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-muted uppercase tracking-wider" style={{ fontSize: 11, marginBottom: 10 }}>
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-bg border border-border text-text focus:border-gold focus:outline-none transition-colors resize-none"
                      style={{ padding: '14px 16px', borderRadius: 10, fontSize: 15 }}
                      placeholder="Demande spéciale, allergie, occasion..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full"
                    disabled={loading}
                    style={{
                      marginTop: 4,
                      opacity: loading ? 0.6 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer la demande"}
                  </button>
                </form>
              )}
            </div>

            {/* Social links */}
            <div className="flex justify-center" style={{ gap: 12, marginTop: 28 }}>
              {[
                { label: "Instagram", href: "https://www.instagram.com/steaknchill.be/" },
                { label: "Facebook", href: "https://www.facebook.com/steaknchill" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-gold transition-colors"
                  style={{ fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-bg">
        <Section>
          <div className="r-container" style={{ maxWidth: 900, margin: '0 auto', padding: '64px 48px' }}>
            <div className="relative w-full border border-border overflow-hidden r-map" style={{ aspectRatio: '16/9', minHeight: 300, borderRadius: 14 }}>
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
            <div className="text-center" style={{ marginTop: 28 }}>
              <a
                href="https://maps.google.com/?q=Bd+du+Jardin+Botanique+7,+1000+Bruxelles"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
                style={{ padding: '14px 36px', fontSize: '0.75rem' }}
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
