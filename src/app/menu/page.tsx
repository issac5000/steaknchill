"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useTranslation } from "@/i18n";

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

interface MenuItem {
  name: string;
  description?: string;
  price: string;
}

interface MenuCategory {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

// Prices and structure — always the same
const menuStructure = [
  { id: "entrees", itemCount: 6, prices: ["18€", "18€", "18€", "14€", "16€", "20€"] },
  { id: "salades", itemCount: 3, prices: ["18€", "18€", "17€"] },
  { id: "viandes-maturees", itemCount: 4, prices: ["60€", "65€", "120€", "95€"] },
  { id: "viandes-exception", itemCount: 8, prices: ["40€", "29€", "30€", "29€", "36€", "32€", "40€", "34€"] },
  { id: "classiques", itemCount: 4, prices: ["25€", "20€", "25€", "30€"] },
  { id: "burgers", itemCount: 4, prices: ["22€", "22€", "20€", "20€"] },
  { id: "pates", itemCount: 3, prices: ["27€", "24€", "22€"] },
  { id: "supplements", itemCount: 13, prices: ["4€", "6,50€", "6€", "6€", "6€", "9,50€", "5€", "4€", "3€", "3€", "3€", "2,50€", "5€"] },
  { id: "desserts", itemCount: 5, prices: ["10€", "10€", "12€", "10€", "10€"] },
  { id: "boissons-chaudes", itemCount: 8, prices: ["4€", "4,50€", "3,50€", "4€", "5€", "5,50€", "5,50€", "9,50€"] },
  { id: "softs", itemCount: 14, prices: ["3,50€", "3,50€", "3,50€", "3,50€", "3,50€", "3,50€", "3,50€", "3,50€", "3,50€", "3,50€", "3,50€", "3,50€", "5,50€", "5,50€"] },
  { id: "mocktails", itemCount: 4, prices: ["10€", "10€", "10€", "10€"] },
  { id: "cocktails", itemCount: 5, prices: ["14€", "14€", "14€", "16€", "14€"] },
  { id: "alcools", itemCount: 9, prices: ["9€", "9€", "10€", "8€", "9€", "8€", "8€", "9€", "11€"] },
  { id: "aperitifs", itemCount: 16, prices: ["8€", "12€", "8€", "8€", "8€", "8€", "8€", "8€", "7€", "19€", "8€", "11€", "8€", "5,50€", "9€", "8€"] },
  { id: "bieres", itemCount: 6, prices: ["5,50€", "6,50€", "6€", "5,50€", "5,50€", "7€"] },
];

export default function MenuPage() {
  const { t } = useTranslation();
  const [activeGroup, setActiveGroup] = useState(0);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const container = tabContainerRef.current;
    if (!container) return;
    const buttons = container.querySelectorAll<HTMLButtonElement>('button');
    const activeBtn = buttons[activeGroup];
    if (activeBtn) {
      setIndicator({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [activeGroup]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  // Build translated menu data
  const menuData: MenuCategory[] = useMemo(() => {
    return menuStructure.map((cat) => {
      const items: MenuItem[] = [];
      for (let i = 0; i < cat.itemCount; i++) {
        const nameKey = `menu.item.${cat.id}.${i}.name`;
        const descKey = `menu.item.${cat.id}.${i}.desc`;
        const name = t(nameKey);
        const desc = t(descKey);
        items.push({
          name,
          description: desc !== descKey ? desc : undefined,
          price: cat.prices[i],
        });
      }
      const subKey = `menu.cat.${cat.id}.sub`;
      const sub = t(subKey);
      return {
        id: cat.id,
        title: t(`menu.cat.${cat.id}`),
        subtitle: sub !== subKey ? sub : undefined,
        items,
      };
    });
  }, [t]);

  const categoryGroups = useMemo(() => [
    { label: t("menu.tab.entrees"), ids: ["entrees", "salades"] },
    { label: t("menu.tab.viandes"), ids: ["viandes-maturees", "viandes-exception", "classiques"] },
    { label: t("menu.tab.burgersPates"), ids: ["burgers", "pates"] },
    { label: t("menu.tab.supplements"), ids: ["supplements"] },
    { label: t("menu.tab.dessertsBeverages"), ids: ["desserts", "boissons-chaudes", "softs", "mocktails", "cocktails", "alcools", "aperitifs", "bieres"] },
  ], [t]);

  // Update indicator when language changes (tab labels may change width)
  useEffect(() => {
    updateIndicator();
  }, [categoryGroups, updateIndicator]);

  const visibleCategories = menuData.filter((cat) =>
    categoryGroups[activeGroup].ids.includes(cat.id)
  );

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ height: '50vh', minHeight: 420 }}>
        <div className="absolute inset-0">
          <Image
            src="https://chefabdel.be/wp-content/uploads/2024/03/grilled-beef-steak-dark-wooden-surface.jpg"
            alt={t("menu.hero.titleAccent")}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-bg" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center" style={{ padding: '0 40px' }}>
          <p className="text-gold tracking-[0.3em] uppercase" style={{ fontSize: 14, marginBottom: 24 }}>
            {t("menu.hero.label")}
          </p>
          <h1 className="font-heading text-text" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', marginBottom: 24 }}>
            {t("menu.hero.title")} <span className="text-gradient-gold">{t("menu.hero.titleAccent")}</span>
          </h1>
          <div className="gold-divider-wide mx-auto" style={{ marginBottom: 28 }} />
          <p className="text-text-muted" style={{ fontSize: 18, maxWidth: 520 }}>
            {t("menu.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="sticky z-40" style={{ top: 88 }}>
        <div style={{
          background: 'rgba(7, 7, 7, 0.92)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}>
          <div className="r-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
            <div style={{ position: 'relative', padding: '20px 0' }}>
              {/* Scrollable tabs */}
              <div
                ref={tabContainerRef}
                className="flex overflow-x-auto no-scrollbar"
                style={{ gap: 8, position: 'relative', padding: '4px', alignItems: 'center' }}
              >
                {/* Sliding pill indicator */}
                <div
                  style={{
                    position: 'absolute',
                    top: 4,
                    left: indicator.left,
                    width: indicator.width,
                    height: 'calc(100% - 8px)',
                    background: 'linear-gradient(135deg, #C8A97E, #A08456)',
                    borderRadius: 50,
                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    pointerEvents: 'none',
                    boxShadow: '0 4px 24px rgba(200, 169, 126, 0.3), 0 0 60px rgba(200, 169, 126, 0.08)',
                  }}
                />
                {categoryGroups.map((group, i) => (
                  <button
                    key={group.label}
                    onClick={() => setActiveGroup(i)}
                    style={{
                      padding: '14px 32px',
                      fontSize: 13,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase' as const,
                      whiteSpace: 'nowrap' as const,
                      color: activeGroup === i ? '#070707' : '#A3A3A3',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 50,
                      cursor: 'pointer',
                      fontWeight: activeGroup === i ? 700 : 500,
                      position: 'relative' as const,
                      zIndex: 1,
                      transition: 'color 0.4s ease, font-weight 0.4s ease, transform 0.3s ease',
                      fontFamily: 'inherit',
                      transform: activeGroup === i ? 'scale(1)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      if (activeGroup !== i) {
                        e.currentTarget.style.color = '#E8D5B5';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeGroup !== i) {
                        e.currentTarget.style.color = '#A3A3A3';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {group.label}
                  </button>
                ))}
              </div>

              {/* Bottom gold accent line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '5%',
                right: '5%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(200, 169, 126, 0.2), transparent)',
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* MENU CONTENT */}
      <section className="bg-bg r-section-pad" style={{ padding: '120px 48px', minHeight: '100vh' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {visibleCategories.map((category, catIndex) => (
            <Section key={category.id} delay={catIndex * 0.1}>
              <div style={{ marginBottom: 96 }}>
                {/* Category Header */}
                <div className="text-center" style={{ marginBottom: 56 }}>
                  <h2 className="font-heading text-text" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 16 }}>
                    {category.title}
                  </h2>
                  {category.subtitle && (
                    <p className="text-text-muted italic" style={{ fontSize: 16 }}>
                      {category.subtitle}
                    </p>
                  )}
                  <div className="gold-divider" style={{ marginTop: 24, marginLeft: 'auto', marginRight: 'auto' }} />
                </div>

                {/* Items */}
                <div>
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={`${category.id}-${itemIndex}`}
                      className="menu-item-row flex items-baseline justify-between border-b border-border/50 group"
                      style={{ padding: '24px 0' }}
                    >
                      <div className="flex-1" style={{ paddingRight: 32 }}>
                        <span className="text-text group-hover:text-gold transition-colors duration-300" style={{ fontSize: 18 }}>
                          {item.name}
                        </span>
                        {item.description && (
                          <span className="block text-text-muted" style={{ marginTop: 8, fontSize: 15 }}>
                            {item.description}
                          </span>
                        )}
                      </div>
                      <span className="text-gold font-heading whitespace-nowrap" style={{ fontSize: 24 }}>
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface text-center r-section-pad" style={{ padding: '120px 40px' }}>
        <Section>
          <p className="text-gold tracking-[0.3em] uppercase" style={{ fontSize: 14, marginBottom: 24 }}>
            {t("menu.cta.label")}
          </p>
          <h2 className="font-heading text-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40 }}>
            {t("menu.cta.title")} <span className="text-gradient-gold">{t("menu.cta.titleAccent")}</span>
          </h2>
          <div className="gold-divider-wide mx-auto" style={{ marginBottom: 48 }} />
          <div className="flex flex-col sm:flex-row justify-center" style={{ gap: 24 }}>
            <a href="tel:+3226755551" className="btn-gold">
              02/675.55.51
            </a>
            <Link href="/contact" className="btn-outline-gold">
              {t("menu.cta.contact")}
            </Link>
          </div>
        </Section>
      </section>
    </>
  );
}
