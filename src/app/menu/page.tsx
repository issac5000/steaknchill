"use client";

import { useState, useRef } from "react";
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
      { name: "Scampi chef", description: "Légumes, sauce tomate, crème", price: "16€" },
      { name: "Scampi à l'ail", description: "Ail au beurre chaud", price: "16€" },
      { name: "Scampi frits", description: "Chapelure panko", price: "16€" },
      { name: "Calamars frits", price: "16€" },
      { name: "Carpaccio Angus", description: "Fines tranches de filet de boeuf, roquette, parmesan, vinaigrette balsamique", price: "15€" },
      { name: "Carpaccio de buratta Angus", description: "Fines tranches de filet de boeuf, roquette, parmesan, vinaigrette balsamique, buratta et huile de truffe", price: "20€" },
      { name: "Croquettes au fromage", price: "12€" },
      { name: "Rouleau de pâte feuilletée", description: "Pâte feuilletée farcie au fromage feta et mozzarella", price: "12€" },
      { name: "Carpaccio de pastrami", description: "Huile de truffe, balsamique, parmesan", price: "18€" },
      { name: "Assiette d'entrée mixte", description: "Cheesebal, calamars, langoustines frites, rouleau de pâte au fromage, rondelles d'oignon", price: "24€" },
    ],
  },
  {
    id: "mezze",
    title: "Mezze",
    items: [
      { name: "Ezme piquant", description: "Préparation froide à base de tomates fraîches, poivrons verts, oignons, persil", price: "8€" },
      { name: "Houmous", description: "Préparation crémeuse à base de pois chiches, tahini, ail et jus de citron", price: "8€" },
      { name: "Mezze au fromage blanc", description: "Préparation crémeuse à base de fromage blanc, yaourt et beurre fondu aromatisée à la menthe", price: "8€" },
      { name: "Salade d'aubergines", description: "Aubergine, paprika rôti, huile d'olive, sirop de grenade", price: "8€" },
      { name: "Mix des mezzés froids et chauds", price: "16€" },
    ],
  },
  {
    id: "salades",
    title: "Salades",
    items: [
      { name: "Salade de poulet", description: "Poulet frit, sauce du chef, tomates cerises, concombre, parmesan", price: "15€" },
      { name: "Salade de scampi", description: "Scampi, sauce du chef, tomates cerises, guacamole, concombre, parmesan", price: "15€" },
      { name: "Salade de buratta", description: "Buratta, roquette, pesto, tomates cerises", price: "15€" },
      { name: "Salade du chef", description: "Pomme verte, tomates cerises, fromage cottage, mélasse de grenade, grenade, concombre", price: "15€" },
    ],
  },
  {
    id: "viandes-maturees",
    title: "Viandes Maturées",
    items: [
      { name: "Bavette Wagyu F4 BMS9+", description: "Arrivée Australie 250gr.", price: "50€" },
      { name: "Wagyu F4 BMS9+ propre", description: "Arrivée Australie 250gr.", price: "55€" },
      { name: "Tomahawk 1,5 kg", description: "Côte de boeuf épaisse", price: "90€" },
      { name: "Entrecote KOBE A5 BMS 12+", description: "250gr", price: "90€" },
      { name: "Entrecôte blonde de Galice", description: "Affiné 62 jours 300gr.", price: "55€" },
    ],
  },
  {
    id: "viandes-exception",
    title: "Nos Viandes d'Exception",
    subtitle: "Toutes nos viandes sont servies avec de la salade",
    items: [
      { name: "Steak T-Bone", description: "Black Angus 500-600g.", price: "37€" },
      { name: "Picanha USA", description: "Rumsteck black angus 300gr.", price: "27€" },
      { name: "Entrecôte argentine", description: "Black Angus 300gr.", price: "28€" },
      { name: "Steak de New York", description: "Faux filet 300gr.", price: "27€" },
      { name: "Lokum", description: "Filet pur black angus 250gr.", price: "32€" },
      { name: "Dallas steak", description: "Côte de boeuf Black Angus 500-600g.", price: "38€" },
      { name: "Entrecôte Simmental", description: "Arrivée d'Autriche 300gr.", price: "29€" },
      { name: "Ribs miel/piquant", description: "+-800gr.", price: "29€" },
    ],
  },
  {
    id: "classiques",
    title: "Les Classiques",
    items: [
      { name: "Steak de boeuf", description: "300g.", price: "23€" },
      { name: "Côtelettes d'agneau 6 pièces", description: "Nouvelle-Zélande", price: "28€" },
      { name: "Esclope poulet", price: "18€" },
      { name: "Kofte au fromage", description: "Boulettes de viande hachée farcies au fromage", price: "20€" },
      { name: "Grillades mixtes", description: "Côtelettes d'agneau, saucisse de poulet, kofte au fromage, brochette de boeuf", price: "25€" },
      { name: "Brochette de boeuf", description: "Black Angus", price: "23€" },
    ],
  },
  {
    id: "accompagnements",
    title: "Accompagnements",
    items: [
      { name: "Frites maison", price: "3€" },
      { name: "Onion rings", price: "3,50€" },
      { name: "Frites de patates douces", price: "4,50€" },
      { name: "Frites cheddar et bacon", price: "5€" },
      { name: "Légumes de saison", price: "4,50€" },
      { name: "Purée de pommes de terre", price: "4,50€" },
      { name: "Sauce aux champignons", price: "3,50€" },
      { name: "Sauce au poivre", price: "3,50€" },
      { name: "Sauce béarnaise", price: "3,50€" },
      { name: "Sauce au cheddar", price: "3,50€" },
      { name: "Mayonnaise à la truffe", price: "2€" },
    ],
  },
  {
    id: "burgers",
    title: "Burgers et Frites",
    items: [
      { name: "Steak N' Chill", description: "200g de boeuf Black Angus, cheddar, bacon, oignons caramélisés, salade, roquette, sauce du chef", price: "19€" },
      { name: "Burger de poulet", description: "Tenders de poulet, cheddar, salade, roquette, sauce au poivre", price: "16€" },
      { name: "Burger au poivre", description: "200g de boeuf Black Angus, cheddar, oignons caramélisés, salade, roquette, sauce au poivre", price: "18€" },
      { name: "Burger Truffe", description: "200g de boeuf Black Angus, cheddar, oignons caramélisés, salade, roquette, sauce à la truffe", price: "19€" },
      { name: "Burger au pastrami", description: "Pastrami, gouda, oignons caramélisés, salade, roquette, sauce miel et moutarde", price: "24€" },
      { name: "Burger Ribs", description: "Ribs, gouda, oignons caramélisés, salade, roquette, BBQ, cheddar, sauce poivre", price: "24€" },
    ],
  },
  {
    id: "pates",
    title: "Pâtes",
    items: [
      { name: "Linguine à la truffe", price: "20€" },
      { name: "Linguines aux scampi", price: "18€" },
      { name: "Linguine au poulet et à la crème de champignons", price: "18€" },
      { name: "Linguine aux fruits de mer", price: "22€" },
      { name: "Linguines au pesto et burrata", price: "21€" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      { name: "Dame blanche", price: "8€" },
      { name: "Brésilienne", price: "8€" },
      { name: "Tiramisu", price: "9€" },
      { name: "Cheesecake Sébastien", description: "Fondue au chocolat", price: "9€" },
      { name: "Cheesecake au spéculoos", price: "9€" },
      { name: "Moelleux au chocolat", description: "Servi avec de la glace à la vanille et de la crème fouettée", price: "10€" },
      { name: "Baklava aux pistaches", description: "+glaces 2,50€", price: "9€" },
      { name: "Tarte aux pommes", description: "Servi avec de la glace à la vanille et de la crème fouettée", price: "10€" },
      { name: "Mousse au chocolat", price: "9€" },
    ],
  },
  {
    id: "boissons-chaudes",
    title: "Boissons Chaudes",
    items: [
      { name: "Café", price: "3,50€" },
      { name: "Café au lait", price: "3,50€" },
      { name: "Americano", price: "3,90€" },
      { name: "Latte Machiato", price: "5,50€" },
      { name: "Espresso", price: "3,50€" },
      { name: "Double expresso", price: "3,90€" },
      { name: "Chocolat chaud", price: "5,50€" },
      { name: "Thé noir", price: "3,50€" },
      { name: "Thé vert", price: "3,50€" },
      { name: "Thé camomille", price: "3,50€" },
    ],
  },
  {
    id: "softs",
    title: "Softs",
    items: [
      { name: "Coca-Cola", price: "3,50€" },
      { name: "Coca-Cola Zéro", price: "3,50€" },
      { name: "Sprite", price: "3,50€" },
      { name: "Fanta", price: "3,50€" },
      { name: "Bliss agrum", price: "3,50€" },
      { name: "Bliss tonic", price: "3,50€" },
      { name: "Jus de pomme", price: "3,50€" },
      { name: "Jus de pomme cerise", price: "3,50€" },
      { name: "Jus multifruits", price: "3,50€" },
      { name: "Jus d'orange", price: "3,50€" },
      { name: "1/2 eau plate", price: "5,50€" },
      { name: "1/2 eau gazeuse", price: "5,50€" },
      { name: "Fuze tea pétillant", price: "3,50€" },
      { name: "Fuze tea peach", price: "3,50€" },
      { name: "Red Bull", price: "5,50€" },
    ],
  },
  {
    id: "mocktails",
    title: "Cocktails Sans Alcool",
    items: [
      { name: "Virgin Mojito", price: "8€" },
      { name: "Mojito aux fraises 0,0", price: "8€" },
      { name: "Mojito Passion 0.0", price: "8€" },
      { name: "Virgin Piña Colada 0,0", price: "8€" },
      { name: "Mojito Violette 0.0", price: "8€" },
      { name: "Mojito pastèque 0,0", price: "8€" },
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      { name: "Mojito", price: "13€" },
      { name: "Lady red cheek", price: "13€" },
      { name: "Pornstar Martini", price: "13€" },
      { name: "Piña Colada", price: "13€" },
      { name: "Violette", price: "13€" },
      { name: "Espresso Martini", price: "13€" },
      { name: "Steakchill mix", price: "15€" },
    ],
  },
];

const categoryGroups = [
  { label: "Entrées", ids: ["entrees", "mezze", "salades"] },
  { label: "Viandes", ids: ["viandes-maturees", "viandes-exception", "classiques"] },
  { label: "Burgers & Pâtes", ids: ["burgers", "pates"] },
  { label: "Accompagnements", ids: ["accompagnements"] },
  { label: "Desserts & Boissons", ids: ["desserts", "boissons-chaudes", "softs", "mocktails", "cocktails"] },
];

export default function MenuPage() {
  const [activeGroup, setActiveGroup] = useState(0);

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
            mezze, burgers gastronomiques et grillades spectaculaires.
          </p>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="sticky z-40 bg-bg/95 backdrop-blur-xl border-b border-border" style={{ top: 88 }}>
        <div className="r-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
          <div className="flex overflow-x-auto no-scrollbar" style={{ gap: 12, padding: '24px 0' }}>
            {categoryGroups.map((group, i) => (
              <button
                key={group.label}
                onClick={() => setActiveGroup(i)}
                className={`whitespace-nowrap tracking-[0.1em] uppercase transition-all duration-300 border ${
                  activeGroup === i
                    ? "bg-gold/10 border-gold/40 text-gold"
                    : "border-transparent text-text-muted hover:text-gold"
                }`}
                style={{ padding: '14px 28px', fontSize: 14, borderRadius: 10 }}
              >
                {group.label}
              </button>
            ))}
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
                  <div className="gold-divider mx-auto" style={{ marginTop: 24 }} />
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
