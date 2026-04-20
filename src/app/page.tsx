"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ─── REVEAL COMPONENT ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 60 : 0,
      x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── CONTAINER WRAPPER ─── */
function Container({
  children,
  className = "",
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`r-container ${className}`}
      style={{
        maxWidth: wide ? 1200 : 1100,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 48,
        paddingRight: 48,
      }}
    >
      {children}
    </div>
  );
}

/* ─── COUNTER COMPONENT ─── */
function CountUp({
  target,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { mass: 0.8, stiffness: 40, damping: 15 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionVal.set(target);
    }
  }, [isInView, motionVal, target]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(v.toFixed(decimals));
    });
    return unsubscribe;
  }, [spring, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── DATA ─── */
const stats = [
  { target: 22.7, decimals: 1, suffix: "K", label: "Abonnés Instagram" },
  { target: 249, decimals: 0, suffix: "+", label: "Publications" },
  { target: 7, decimals: 0, suffix: "j/7", label: "Ouvert pour vous" },
  { target: 100, decimals: 0, suffix: "%", label: "Halal Certifié" },
];

const signatureDishes = [
  {
    name: "Tomahawk",
    description:
      "Côte de boeuf +-1,5kg Pologne, grillée à la perfection. Une pièce spectaculaire à partager.",
    price: "95€",
    image: "/tomawak.webp",
    className: "",
  },
  {
    name: "Bavette Wagyu",
    description:
      "Bavette Wagyu F4 BMS 9+ 300gr., persillée à la perfection. Le summum de la viande maturée.",
    price: "60€",
    image: "/WagyuBMS9+.webp",
    className: "",
  },
  {
    name: "Entrecôte KOBE A5",
    description:
      "Arrivage Japon A5 BMS 12+ 300gr. L'excellence japonaise, une expérience gustative unique.",
    price: "120€",
    image: "/kobea5.webp",
    className: "",
  },
];

const reviews = [
  {
    name: "Sophie L.",
    rating: 5,
    text: "Un steakhouse exceptionnel ! Les viandes maturées sont incroyables. Le service est attentionné et l'ambiance est chaleureuse. Je recommande vivement.",
    source: "Google",
  },
  {
    name: "Mehdi R.",
    rating: 5,
    text: "La meilleure viande que j'ai mangée à Bruxelles. Le Tomahawk est un spectacle à lui seul. Rapport qualité-prix excellent pour la qualité proposée.",
    source: "Google",
  },
  {
    name: "Claire D.",
    rating: 5,
    text: "Expérience culinaire incroyable. Les grillades sont sublimes. Les entrées et mezze sont tout aussi délicieux. Adresse à ne pas manquer.",
    source: "Google",
  },
  {
    name: "Karim B.",
    rating: 5,
    text: "Le Dallas Steak est une merveille. La cuisson est parfaite. Cadre raffiné, service impeccable. On reviendra sans hésiter.",
    source: "Google",
  },
  {
    name: "Nathalie V.",
    rating: 5,
    text: "Anniversaire inoubliable chez Steak N' Chill. Les burgers sont parmi les meilleurs de Bruxelles. La viande était fondante à souhait.",
    source: "Google",
  },
  {
    name: "Youssef A.",
    rating: 5,
    text: "Enfin un vrai steakhouse halal de qualité à Bruxelles. Les viandes sont exceptionnelles et le personnel est aux petits soins. Une adresse en or.",
    source: "Google",
  },
  {
    name: "Isabelle M.",
    rating: 5,
    text: "Tout était parfait du début à la fin. Le carpaccio en entrée puis l'entrecôte argentine en plat, un pur régal. L'ambiance est très agréable.",
    source: "Google",
  },
];

const marqueeItems = [
  "Bavette Wagyu",
  "✦",
  "Tomahawk",
  "✦",
  "Entrecôte KOBE A5",
  "✦",
  "T-Bone",
  "✦",
  "Picanha Wagyu",
  "✦",
  "Filet Pur",
  "✦",
  "Ribs",
  "✦",
  "New York Steak",
  "✦",
];

const experienceFeatures = [
  "Viandes 100% Halal",
  "Viandes maturées d'exception",
  "Ouvert 7 jours sur 7",
  "Bd du Jardin Botanique 7",
];

/* ─── PAGE ─── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <>
      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative h-screen overflow-hidden" ref={heroRef}>
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <Image
            src="/hero.webp"
            alt="Steak N' Chill Hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center"
          style={{ opacity: heroOpacity, padding: "0 40px" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 48 }}
          >
            <Image
              src="/logopng.webp"
              alt="Steak N' Chill Logo"
              width={160}
              height={160}
              className="mx-auto object-contain"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gold/80 uppercase"
            style={{
              letterSpacing: "0.4em",
              fontSize: 12,
              marginBottom: 32,
            }}
          >
            Bruxelles &mdash; Bd du Jardin Botanique 7
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-text"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 1.1,
              marginBottom: 40,
            }}
          >
            Steak N&apos;{" "}
            <span className="italic" style={{ color: "#C8A97E" }}>Chill</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="gold-divider-wide mx-auto origin-center"
            style={{ marginBottom: 40 }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-heading text-cream/60 italic"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
              maxWidth: 600,
              marginBottom: 56,
            }}
          >
            Steakhouse &amp; Grillades de Viandes d&apos;Exception
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row"
            style={{ gap: 20 }}
          >
            <Link href="/menu" className="btn-gold">
              Découvrir la Carte
            </Link>
            <Link href="/contact" className="btn-outline-gold">
              Réserver une Table
            </Link>
          </motion.div>
        </motion.div>

      </section>

      {/* ════════════════════ STATS ════════════════════ */}
      <section className="bg-bg" style={{ padding: "80px 0 0" }}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.15}>
                <div
                  className="relative text-center"
                  style={{ padding: "32px 16px" }}
                >
                  <span
                    className="font-heading text-text block"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                      marginBottom: 16,
                    }}
                  >
                    <CountUp
                      target={stat.target}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span
                    className="text-text-muted/60 uppercase block"
                    style={{ fontSize: 11, letterSpacing: "0.2em" }}
                  >
                    {stat.label}
                  </span>
                  {i < stats.length - 1 && (
                    <div
                      className="absolute top-1/2 right-0 hidden md:block"
                      style={{
                        width: 1,
                        height: 60,
                        transform: "translateY(-50%)",
                        background:
                          "linear-gradient(to bottom, transparent 0%, #C8A97E 50%, transparent 100%)",
                      }}
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════ ABOUT / STORY ════════════════════ */}
      <section className="bg-bg r-section" style={{ padding: "80px 0 160px" }}>
        <Container wide>
          <div
            className="grid grid-cols-1 lg:grid-cols-12 items-stretch r-gap"
            style={{ gap: 56 }}
          >
            {/* Image */}
            <Reveal direction="left" className="lg:col-span-6 h-full">
              <div className="relative h-full r-about-img" style={{ minHeight: 400, padding: 20 }}>
                <div
                  className="absolute r-about-border"
                  style={{
                    top: 40,
                    left: 40,
                    right: 0,
                    bottom: 0,
                    border: "1px solid rgba(200,169,126,0.35)",
                  }}
                />
                <div
                  className="relative overflow-hidden h-full"
                  style={{ position: "relative", zIndex: 2 }}
                >
                  <Image
                    src="/soushero.webp"
                    alt="Steak N' Chill"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                </div>
              </div>
            </Reveal>

            {/* Text content */}
            <div className="text-center lg:col-span-6 flex flex-col justify-center">
              <Reveal delay={0.1}>
                <p
                  className="text-gold uppercase"
                  style={{
                    letterSpacing: "0.4em",
                    fontSize: 12,
                    marginBottom: 24,
                  }}
                >
                  Notre Histoire
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <h2
                  className="font-heading text-text"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 1.15,
                    marginBottom: 32,
                  }}
                >
                  Un voyage culinaire{" "}
                  <span className="text-gradient-gold italic">
                    d&apos;exception
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="gold-divider" style={{ marginBottom: 40, marginLeft: "auto", marginRight: "auto" }} />
              </Reveal>

              <Reveal delay={0.35}>
                <p
                  className="text-text-muted"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Au cœur de Bruxelles, sur le Boulevard du Jardin Botanique, Steak N&apos; Chill vous invite à découvrir l&apos;art de la grillade portée à son plus haut niveau. Des viandes d&apos;exception sélectionnées avec soin — du Wagyu BMS 9+ au Kobe japonais A5, en passant par le Tomahawk et la Picanha — chaque pièce est traitée avec le respect qu&apos;elle mérite.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <p
                  className="text-text-muted"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginBottom: 48,
                  }}
                >
                  Carpaccios délicats, burgers gastronomiques, mezze savoureux et grillades spectaculaires composent une carte pensée pour les amoureux de la bonne viande. Une adresse devenue incontournable pour les connaisseurs bruxellois.
                </p>
              </Reveal>

              <Reveal delay={0.42}>
                <p
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: 36,
                    color: "#C8A97E",
                    marginBottom: 40,
                  }}
                >
                  Steak N&apos; Chill
                </p>
              </Reveal>

              <Reveal delay={0.48}>
                <div
                  className="flex items-center flex-wrap justify-center"
                  style={{ gap: 32 }}
                >
                  <Link href="/menu" className="btn-gold">
                    Voir la Carte
                  </Link>
                  <a
                    href="https://www.instagram.com/steaknchill.be/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold/70 hover:text-gold transition-colors flex items-center"
                    style={{ gap: 10, fontSize: 14, letterSpacing: "0.05em" }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    @steaknchill.be
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════ MARQUEE BAND ════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F0F0F 0%, #141210 50%, #0F0F0F 100%)",
          padding: "40px 0",
          borderTop: "1px solid rgba(200,169,126,0.1)",
          borderBottom: "1px solid rgba(200,169,126,0.1)",
        }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              style={{
                margin: "0 32px",
                fontFamily: item === "✦" ? "inherit" : "var(--font-heading)",
                fontSize: item === "✦" ? 10 : 28,
                color: item === "✦" ? "rgba(200,169,126,0.5)" : "#C8A97E",
                fontStyle: item === "✦" ? "normal" : "italic",
                letterSpacing: item === "✦" ? "0" : "0.05em",
                textTransform: "uppercase" as const,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════ SIGNATURE DISHES ════════════════════ */}
      <section className="relative r-section" style={{ padding: "160px 0" }}>
        <div className="absolute inset-0">
          <Image
            src="https://chefabdel.be/wp-content/uploads/2024/03/grilled-juicy-steak-cooking-fire-created-with-generative-ai-technology.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>
        <Container className="relative z-10">
          <div className="text-center r-mb" style={{ marginBottom: 80 }}>
            <Reveal>
              <p
                className="text-gold uppercase"
                style={{
                  letterSpacing: "0.4em",
                  fontSize: 12,
                  marginBottom: 24,
                }}
              >
                Nos Signatures
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-heading text-text"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  marginBottom: 24,
                }}
              >
                Viandes d&apos;
                <span className="text-gradient-gold italic">Exception</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="flex justify-center">
              <div className="gold-divider-wide" />
            </Reveal>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 32 }}
          >
            {signatureDishes.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 0.15}>
                <motion.div
                  className="group relative overflow-hidden"
                  style={{
                    border: "1px solid rgba(200,169,126,0.15)",
                    borderRadius: 4,
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 60px rgba(200,169,126,0.15), 0 0 40px rgba(200,169,126,0.05)",
                    borderColor: "rgba(200,169,126,0.4)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Image container — carré */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className={`transition-transform duration-[1.2s] ease-out group-hover:scale-110 object-cover ${dish.className || ""}`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    <div
                      className="absolute backdrop-blur-xl"
                      style={{
                        top: 24,
                        right: 24,
                        background: "rgba(7,7,7,0.35)",
                        border: "1px solid rgba(200,169,126,0.35)",
                        padding: "10px 22px",
                        borderRadius: 2,
                        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(200,169,126,0.1)",
                      }}
                    >
                      <span
                        className="font-heading text-gradient-gold"
                        style={{ fontSize: 22 }}
                      >
                        {dish.price}
                      </span>
                    </div>
                  </div>

                  {/* Text — sous l'image */}
                  <div
                    style={{
                      padding: "24px 28px",
                      background: "rgba(15,15,15,0.95)",
                      borderTop: "1px solid rgba(200,169,126,0.2)",
                    }}
                  >
                    <h3
                      className="font-heading text-gradient-gold whitespace-nowrap"
                      style={{ fontSize: "clamp(18px, 2vw, 24px)", marginBottom: 10 }}
                    >
                      {dish.name}
                    </h3>
                    <div
                      style={{
                        width: 40,
                        height: 1,
                        background: "linear-gradient(90deg, #C8A97E, transparent)",
                        marginBottom: 12,
                      }}
                    />
                    <p
                      className="text-cream/70"
                      style={{ fontSize: 13, lineHeight: 1.7 }}
                    >
                      {dish.description}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center" style={{ marginTop: 64 }}>
              <Link href="/menu" className="btn-outline-gold">
                Voir toute la Carte
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ════════════════════ REVIEWS ════════════════════ */}
      <section className="bg-bg overflow-hidden r-section" style={{ padding: "160px 0" }}>
        <Container wide>
          <div className="text-center r-mb" style={{ marginBottom: 80 }}>
            <Reveal>
              <p
                className="text-gold uppercase"
                style={{
                  letterSpacing: "0.4em",
                  fontSize: 12,
                  marginBottom: 24,
                }}
              >
                Témoignages
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-heading text-text"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  marginBottom: 24,
                }}
              >
                Ce que disent nos{" "}
                <span className="text-gradient-gold italic">clients</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="flex justify-center">
              <div className="gold-divider-wide" />
            </Reveal>
          </div>

          <div className="relative r-reviews-wrap" style={{ minHeight: 620 }}>
            {/* iPhone mockup — left, absolute */}
            <Reveal direction="left" className="r-iphone">
              <div className="relative" style={{ width: 280 }}>
                <Image
                  src="/iphone-frame.png"
                  alt="iPhone"
                  width={280}
                  height={560}
                  className="relative z-20 w-full h-auto pointer-events-none"
                />
                <div
                  className="absolute overflow-hidden z-10"
                  style={{
                    top: "2.8%",
                    left: "5.5%",
                    right: "5.5%",
                    bottom: "2.8%",
                    borderRadius: 32,
                  }}
                >
                  <Image
                    src="/rs.webp"
                    alt="Steak N' Chill Instagram"
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
              </div>
            </Reveal>

            {/* Testimonials carousel */}
            <div
              className="absolute top-0 bottom-0 overflow-hidden r-reviews"
              style={{ left: 290, right: -200 }}
            >
              <div className="h-full flex items-center">
                <div className="flex animate-reviews-scroll whitespace-normal" style={{ gap: 20, width: "max-content" }}>
                  {[...reviews, ...reviews].map((review, i) => (
                    <div
                      key={`${review.name}-${i}`}
                      className="group relative bg-surface flex-shrink-0 flex flex-col r-review-card"
                      style={{
                        width: 260,
                        minHeight: 420,
                        border: "1px solid #2A2A2A",
                        padding: 32,
                        transition: "border-color 0.5s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(200,169,126,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#2A2A2A";
                      }}
                    >
                      <span className="quote-mark">&ldquo;</span>

                      <div
                        className="flex relative z-10"
                        style={{ gap: 5, marginBottom: 24 }}
                      >
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <span
                            key={j}
                            className="text-gold"
                            style={{ fontSize: 16 }}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <p
                        className="text-text-muted flex-grow relative z-10"
                        style={{
                          fontSize: 14,
                          lineHeight: 1.8,
                          marginBottom: 28,
                          whiteSpace: "normal",
                        }}
                      >
                        {review.text}
                      </p>

                      <div
                        className="flex items-center justify-between relative z-10"
                        style={{
                          borderTop: "1px solid #2A2A2A",
                          paddingTop: 20,
                        }}
                      >
                        <span
                          className="text-text font-medium"
                          style={{ fontSize: 14, whiteSpace: "nowrap" }}
                        >
                          {review.name}
                        </span>
                        <span
                          className="text-gold/50 uppercase"
                          style={{ fontSize: 10, letterSpacing: "0.15em", whiteSpace: "nowrap" }}
                        >
                          {review.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="text-center" style={{ marginTop: 64 }}>
              <a
                href="https://www.instagram.com/steaknchill.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold inline-flex items-center"
                style={{ gap: 10 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Suivez-nous sur Instagram
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ════════════════════ EXPERIENCE ════════════════════ */}
      <section
        className="bg-surface overflow-hidden r-section"
        style={{ padding: "160px 0" }}
      >
        <Container>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 items-center r-gap"
            style={{ gap: 80 }}
          >
            {/* Text */}
            <div className="order-2 lg:order-1 text-center">
              <Reveal>
                <p
                  className="text-gold uppercase"
                  style={{
                    letterSpacing: "0.4em",
                    fontSize: 12,
                    marginBottom: 24,
                  }}
                >
                  L&apos;Expérience
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2
                  className="font-heading text-text"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 1.15,
                    marginBottom: 32,
                  }}
                >
                  Plus qu&apos;un repas,
                  <br />
                  <span className="text-gradient-gold italic">
                    un moment unique
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.15} className="flex justify-center">
                <div className="gold-divider" style={{ marginBottom: 40 }} />
              </Reveal>
              <Reveal delay={0.2}>
                <p
                  className="text-text-muted"
                  style={{
                    fontSize: 17,
                    lineHeight: 1.9,
                    marginBottom: 40,
                  }}
                >
                  Chez Steak N&apos; Chill, chaque détail compte. De la sélection
                  rigoureuse des viandes d&apos;exception à la cuisson parfaite
                  sur nos grills, en passant par un service attentionné dans un
                  cadre élégant — nous créons des expériences gastronomiques
                  dont on se souvient.
                </p>
              </Reveal>

              <div
                className="grid grid-cols-2 sm:grid-cols-4 items-stretch"
                style={{ gap: 16, marginBottom: 48 }}
              >
                {experienceFeatures.map((item, i) => (
                  <Reveal key={item} delay={0.25 + i * 0.08} className="h-full">
                    <div
                      className="group relative flex flex-col items-center justify-center text-center h-full"
                      style={{
                        padding: 16,
                        border: "1px solid #2A2A2A",
                        background: "rgba(15,15,15,0.6)",
                        transition: "all 0.4s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(200,169,126,0.3)";
                        e.currentTarget.style.background = "rgba(200,169,126,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#2A2A2A";
                        e.currentTarget.style.background = "rgba(15,15,15,0.6)";
                      }}
                    >
                      <span
                        className="text-gold/50 block"
                        style={{ fontSize: 12, marginBottom: 10 }}
                      >
                        ✦
                      </span>
                      <span
                        className="text-text-muted block"
                        style={{ fontSize: 12, lineHeight: 1.5 }}
                      >
                        {item}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.6}>
                <Link href="/contact" className="btn-gold">
                  Réserver maintenant
                </Link>
              </Reveal>
            </div>

            {/* Images */}
            <div className="order-1 lg:order-2">
              <div
                className="grid grid-cols-2"
                style={{ gap: 24 }}
              >
                <Reveal delay={0.1}>
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "1/2.5" }}
                  >
                    <Image
                      src="/momentunique1.webp"
                      alt="Steak grillé"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/30 to-transparent" />
                  </div>
                </Reveal>
                <Reveal delay={0.25}>
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "1/2.5", marginTop: 48 }}
                  >
                    <Image
                      src="/momentunique2.webp"
                      alt="Côtes grillées"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/30 to-transparent" />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════ CTA / RESERVATION ════════════════════ */}
      <section
        className="relative overflow-hidden r-section"
        style={{ padding: "180px 0" }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://chefabdel.be/wp-content/uploads/2024/03/grilled-juicy-steak-cooking-fire-created-with-generative-ai-technology.jpg"
            alt="Grillades"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/50" />
        </div>

        <Container className="relative z-10 text-center">
          <Reveal>
            <p
              className="text-gold uppercase"
              style={{
                letterSpacing: "0.4em",
                fontSize: 12,
                marginBottom: 32,
              }}
            >
              Réservation
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-heading text-text"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                lineHeight: 1.1,
                marginBottom: 40,
              }}
            >
              Votre table vous
              <br />
              <span className="text-gradient-gold italic">attend</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="flex justify-center">
            <div
              className="gold-divider-wide"
              style={{ marginBottom: 40 }}
            />
          </Reveal>
          <Reveal delay={0.3} className="flex justify-center">
            <p
              className="text-text-muted text-center"
              style={{
                fontSize: 18,
                maxWidth: 520,
                marginBottom: 56,
                lineHeight: 1.8,
              }}
            >
              Réservez votre table dès maintenant et laissez-vous transporter
              par une expérience culinaire inoubliable au cœur de Bruxelles.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div
              className="flex flex-col sm:flex-row justify-center"
              style={{ gap: 20 }}
            >
              <a href="tel:+3226755551" className="btn-gold">
                Appeler &mdash; 02/675.55.51
              </a>
              <Link href="/contact" className="btn-outline-gold">
                Formulaire de Contact
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
