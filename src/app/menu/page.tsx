"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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

const menuData: MenuCategory[] = [
  {
    id: "entrees",
    title: "Entrées",
    items: [
      { name: "Scampi Chef", description: "Légumes et crème", price: "18€" },
      { name: "Scampi à l'ail", description: "Beurre chaud persillé", price: "18€" },
      { name: "Calamar frit", description: "Anneau de calamar frit", price: "18€" },
      { name: "Croquette de fromage", description: "2 pièces", price: "14€" },
      { name: "Carpaccio", description: "Carpaccio de bœuf finement tranché, roquette fraîche, parmesan et filet d'huile d'olive", price: "16€" },
      { name: "Carpaccio Burrata", description: "Carpaccio de bœuf finement tranché, roquette fraîche, parmesan, filet d'huile d'olive et burrata", price: "20€" },
    ],
  },
  {
    id: "salades",
    title: "Salades",
    items: [
      { name: "Salade Poulet", description: "Salade verte, tomates cerise, sauce cesar, concombre et parmesan", price: "18€" },
      { name: "Salade Scampi", description: "Salade verte, tomates cerise, sauce chef, concombre et parmesan", price: "18€" },
      { name: "Burratina", description: "Roquette, tomate cerise et crème balsamique", price: "17€" },
    ],
  },
  {
    id: "viandes-maturees",
    title: "Viandes Maturées",
    subtitle: "Toutes nos viandes sont accompagnées de salade",
    items: [
      { name: "Bavette Wagyu", description: "F4 BMS 9+ 300gr.", price: "60€" },
      { name: "Picanha Wagyu", description: "F4 BMS 9+ 300gr.", price: "65€" },
      { name: "Entrecôte Kobe A5", description: "Arrivage Japon A5 BMS 12+ 300gr.", price: "120€" },
      { name: "Tomahawk", description: "Côte de boeuf +-1,5kg Pologne", price: "95€" },
    ],
  },
  {
    id: "viandes-exception",
    title: "Viande d'Exception",
    subtitle: "Toutes nos viandes sont accompagnées de salade",
    items: [
      { name: "T-Bone", description: "500gr. Nouvelle Zélande", price: "40€" },
      { name: "New York Steak", description: "300gr. Faux filet Nouvelle Zélande", price: "29€" },
      { name: "Entrecôte", description: "300gr. Argentine", price: "30€" },
      { name: "Picanha", description: "300gr. Uruguay", price: "29€" },
      { name: "Filet Pur", description: "250gr. Nouvelle Zélande", price: "36€" },
      { name: "Entrecôte Simmental", description: "300gr. Autriche", price: "32€" },
      { name: "Côte à l'os", description: "500gr. Pologne", price: "40€" },
      { name: "Ribs", description: "+-800gr. miel ou spicy", price: "34€" },
    ],
  },
  {
    id: "classiques",
    title: "Classics",
    items: [
      { name: "Steak de boeuf", description: "300gr. Nouvelle Zélande", price: "25€" },
      { name: "Escalope de poulet", description: "Grillé", price: "20€" },
      { name: "Brochette de boeuf", description: "300gr.", price: "25€" },
      { name: "Côte d'agneau", description: "5 pièces", price: "30€" },
    ],
  },
  {
    id: "burgers",
    title: "Burgers et Frites",
    items: [
      { name: "Burger Steak N' Chill", description: "Burger de boeuf 200gr. cheddar, salade verte, roquette, sauce maison, oignon caramélisées et bacon", price: "22€" },
      { name: "Burger Truffe", description: "Burger de boeuf 200gr. cheddar, salade verte, roquette, mayonnaise truffe et oignon caramélisées", price: "22€" },
      { name: "Burger Poulet", description: "Hachée de poulet, salade verte, emmental, roquette, oignon caramélisées et sauce poivre", price: "20€" },
      { name: "Burger Pepper", description: "Burger de boeuf 200gr. cheddar, salade verte, roquette, sauce poivre et oignon caramélisées", price: "20€" },
    ],
  },
  {
    id: "pates",
    title: "Pâtes",
    items: [
      { name: "Linguine aux truffes", description: "Sauce crème truffe et parmesan", price: "27€" },
      { name: "Linguine aux scampis", description: "Poivrons et crème", price: "24€" },
      { name: "Linguine poulet", description: "Sauce crème champignons et poulet", price: "22€" },
    ],
  },
  {
    id: "supplements",
    title: "Suppléments",
    items: [
      { name: "Frites", price: "4€" },
      { name: "Frites cheddar bacon", price: "6,50€" },
      { name: "Onion rings", price: "6€" },
      { name: "Frites truffe", price: "6€" },
      { name: "Frites patate douce", price: "6€" },
      { name: "Frites patate douce burrata", price: "9,50€" },
      { name: "Légumes de saison", price: "5€" },
      { name: "Sauce champignons", price: "4€" },
      { name: "Sauce poivre", price: "3€" },
      { name: "Sauce cheddar", price: "3€" },
      { name: "Sauce béarnaise", price: "3€" },
      { name: "Mayonnaise truffe", price: "2,50€" },
      { name: "Purée de pomme de terre", price: "5€" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      { name: "Baklava Pistache", description: "Feuilleté croustillant garni de pistaches concassées, délicatement nappé de sirop sucré. Supplément glace 3€", price: "10€" },
      { name: "Tarte aux pommes à la cannelle", description: "Servie tiède avec une boule de glace vanille et chantilly", price: "10€" },
      { name: "Cheesecake Sébastien", description: "Servi avec chocolat fondu et chantilly", price: "12€" },
      { name: "Dame Blanche", description: "Vanille crémeuse, chocolat coulant et nuage de chantilly", price: "10€" },
      { name: "Dôme au chocolat", description: "Dôme au chocolat fourré avec une mousse de chocolat", price: "10€" },
    ],
  },
  {
    id: "boissons-chaudes",
    title: "Boissons Chaudes",
    items: [
      { name: "Café", price: "4€" },
      { name: "Café long", price: "4,50€" },
      { name: "Espresso", price: "3,50€" },
      { name: "Double Espresso", price: "4€" },
      { name: "Cappuccino", price: "5€" },
      { name: "Latte", price: "5,50€" },
      { name: "Chocolat chaud", price: "5,50€" },
      { name: "Irish Coffee", price: "9,50€" },
    ],
  },
  {
    id: "softs",
    title: "Softs",
    items: [
      { name: "Coca-Cola", price: "3,50€" },
      { name: "Coca Zero", price: "3,50€" },
      { name: "Fanta", price: "3,50€" },
      { name: "Sprite", price: "3,50€" },
      { name: "Bliss Tonic", price: "3,50€" },
      { name: "Bliss Agrum", price: "3,50€" },
      { name: "Ice Tea", price: "3,50€" },
      { name: "Ice Tea Peach", price: "3,50€" },
      { name: "Jus de pomme", price: "3,50€" },
      { name: "Jus de pomme cerise", price: "3,50€" },
      { name: "Jus d'orange", price: "3,50€" },
      { name: "Jus multifruit", price: "3,50€" },
      { name: "Eau plate 1/2", price: "5,50€" },
      { name: "Eau pétillante 1/2", price: "5,50€" },
    ],
  },
  {
    id: "mocktails",
    title: "Mocktails",
    items: [
      { name: "Virgin Mojito", description: "Menthe fraîche écrasée, citron vert pressé et eau gazeuse", price: "10€" },
      { name: "Fraise", description: "Fraise, pointe de citron et fine bulle pétillante", price: "10€" },
      { name: "Violette", description: "Sirop de violette, citron léger et bulles fines", price: "10€" },
      { name: "Passion", description: "Passion exotique, touche d'agrumes et eau pétillante", price: "10€" },
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      { name: "Mojito", description: "Menthe fraîche écrasée, citron vert pressé, vodka et eau gazeuse", price: "14€" },
      { name: "Red Velvet", description: "Fraise mixée, pointe de citron, vodka et fine bulle pétillante", price: "14€" },
      { name: "Royal Bloom", description: "Sirop de violette, citron léger, vodka et bulles fines", price: "14€" },
      { name: "Pornstar Martini", description: "Vodka, fruit de la passion et vanille, accompagné d'un shot de prosecco", price: "16€" },
      { name: "Espresso Martini", description: "Vodka, espresso frais et liqueur de café", price: "14€" },
    ],
  },
  {
    id: "alcools",
    title: "Alcools",
    items: [
      { name: "Scotch Whisky Jack Daniels", price: "9€" },
      { name: "Scotch Whisky Red Label", price: "9€" },
      { name: "Scotch Whisky Chivas Regal", price: "10€" },
      { name: "Vodka Smirnoff", price: "8€" },
      { name: "Vodka Absolute", price: "9€" },
      { name: "Vodka Erristo", price: "8€" },
      { name: "Vodka Erristof Rouge", price: "8€" },
      { name: "Raki", price: "9€" },
      { name: "Gin Tonic", price: "11€" },
    ],
  },
  {
    id: "aperitifs",
    title: "Apéritifs / Digestifs",
    items: [
      { name: "Kir", price: "8€" },
      { name: "Kir Royale", price: "12€" },
      { name: "Ricard", price: "8€" },
      { name: "Safari", price: "8€" },
      { name: "Martini Rouge", price: "8€" },
      { name: "Martini Blanc", price: "8€" },
      { name: "Porto Rouge", price: "8€" },
      { name: "Porto Blanc", price: "8€" },
      { name: "Picon Bière", price: "7€" },
      { name: "Picon Vin Blanc", price: "19€" },
      { name: "Tequila", price: "8€" },
      { name: "Prosecco", price: "11€" },
      { name: "Baileys", price: "8€" },
      { name: "Limoncello", price: "5,50€" },
      { name: "Amaretto", price: "9€" },
      { name: "Cognac", price: "8€" },
    ],
  },
  {
    id: "bieres",
    title: "Bières",
    items: [
      { name: "Battin Pils 5°", price: "5,50€" },
      { name: "Battin Blonde 5°", price: "6,50€" },
      { name: "Battin Brune 5,2°", price: "6€" },
      { name: "Battin Kriek 4,3°", price: "5,50€" },
      { name: "Battin Blanche 4,8°", price: "5,50€" },
      { name: "Battin Triple 8°", price: "7€" },
    ],
  },
];

const categoryGroups = [
  { label: "Entrées", ids: ["entrees", "salades"] },
  { label: "Viandes", ids: ["viandes-maturees", "viandes-exception", "classiques"] },
  { label: "Burgers & Pâtes", ids: ["burgers", "pates"] },
  { label: "Suppléments", ids: ["supplements"] },
  { label: "Desserts & Boissons", ids: ["desserts", "boissons-chaudes", "softs", "mocktails", "cocktails", "alcools", "aperitifs", "bieres"] },
];

export default function MenuPage() {
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
            alt="La Carte"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-bg" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center" style={{ padding: '0 40px' }}>
          <p className="text-gold tracking-[0.3em] uppercase" style={{ fontSize: 14, marginBottom: 24 }}>
            Steak N&apos; Chill
          </p>
          <h1 className="font-heading text-text" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', marginBottom: 24 }}>
            La <span className="text-gradient-gold">Carte</span>
          </h1>
          <div className="gold-divider-wide mx-auto" style={{ marginBottom: 28 }} />
          <p className="text-text-muted" style={{ fontSize: 18, maxWidth: 520 }}>
            Une carte soigneusement élaborée autour de viandes d&apos;exception,
            burgers gastronomiques, pâtes et grillades spectaculaires.
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
            Envie de goûter ?
          </p>
          <h2 className="font-heading text-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40 }}>
            Réservez votre <span className="text-gradient-gold">table</span>
          </h2>
          <div className="gold-divider-wide mx-auto" style={{ marginBottom: 48 }} />
          <div className="flex flex-col sm:flex-row justify-center" style={{ gap: 24 }}>
            <a href="tel:+3226755551" className="btn-gold">
              02/675.55.51
            </a>
            <Link href="/contact" className="btn-outline-gold">
              Nous contacter
            </Link>
          </div>
        </Section>
      </section>
    </>
  );
}
