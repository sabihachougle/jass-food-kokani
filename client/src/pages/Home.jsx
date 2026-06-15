import { useRef } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import homeContent from '../content/home.json';
import { API_BASE, CONTACT_RECIPIENT, CONTACT_CC } from '../env.js';

function CarouselSection({ title, items = [], link }) {
  const containerRef = useRef(null);

  const scrollByCard = (direction = 1) => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('.carousel-card');
    const gap = 16;
    const cardWidth = (card?.offsetWidth || 260) + gap;
    container.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
  };

  return (
    <section className="card-soft p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-dark">{title}</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => scrollByCard(-1)} className="btn-secondary">Prev</button>
          <button onClick={() => scrollByCard(1)} className="btn-secondary">Next</button>
          {link && <Link to={link} className="ml-3 text-sm text-primary">View all</Link>}
        </div>
      </div>

      <div ref={containerRef} className="mt-4 flex gap-4 overflow-x-auto py-3 scrollbar-hide">
        {items.map((it, idx) => (
          <div key={idx} className="carousel-card min-w-[220px] max-w-[220px] rounded-xl border border-mint bg-white shadow-sm">
            <img src={it.image} alt={it.name} className="h-36 w-full object-cover rounded-t-xl" />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-text-dark">{it.name}</h4>
                <span className="text-xs text-text-light">₹{it.price || ''}</span>
              </div>
              {it.description && <p className="mt-1 text-xs text-text-light">{it.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const jassItems = (homeContent?.carousels?.jassFood || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const kokaniItems = (homeContent?.carousels?.kokani || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const hero = homeContent?.hero || {};

  return (
    <section className="grid gap-16 py-10 md:py-16">
      <div className="grid gap-10 rounded-[2rem] border border-mint bg-white/95 px-6 py-10 shadow-glow sm:px-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">{hero.eyebrow || 'Homemade Mithaas'}</p>
          <p className="text-sm uppercase tracking-[0.35em] text-text-light">{hero.subeyebrow || 'Authentic Kokani Taste'}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-text-dark sm:text-5xl">{hero.heading || 'Authentic Kokani Sweets, Made with Love'}</h1>
          <div className="mt-6 max-w-xl text-base leading-8 text-text-light">
            {(hero.paragraphs || []).map((p, i) => (
              <p key={i} className={i === 0 ? '' : 'mt-3'}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {(hero.cta || []).map((c, i) => (
              <Link key={i} to={c.link} className={c.type === 'primary' ? 'btn-primary' : 'btn-secondary'}>{c.label}</Link>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-accent/10 via-mint-light to-white p-8 text-center shadow-inner shadow-glow/30">
          <p className="text-sm uppercase tracking-[0.35em] text-text-light">Home-based sweets</p>
          <div className="mt-8 space-y-3 text-left text-text-light">
            <p>Handmade Kokani sweets prepared in small batches.</p>
            <p>Fresh ingredients, natural spices, and old family secrets.</p>
            <p>Orders are confirmed automatically and prepared with care.</p>
          </div>
        </div>
      </div>

      {/* Trending carousels */}
      <div className="grid gap-8">
        <CarouselSection
          title="Trending Jass Food Items"
          items={jassItems}
          link="/jass-food"
        />

        <CarouselSection
          title="Jass Kokani Delicacies Best Sellers"
          items={kokaniItems}
          link="/jass-kokani"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <article className="card-soft transition hover:-translate-y-1 hover:shadow-glow">
          <h2 className="text-xl font-semibold text-text-dark">Trusted Family Recipes</h2>
          <p className="mt-3 text-sm leading-7 text-text-light">Traditional Kokani sweet formulas made exactly the way mom intended.</p>
        </article>
        <article className="card-soft transition hover:-translate-y-1 hover:shadow-glow">
          <h2 className="text-xl font-semibold text-text-dark">Fresh for Every Order</h2>
          <p className="mt-3 text-sm leading-7 text-text-light">Each order is prepared fresh and packaged with care for pickup or delivery.</p>
        </article>
        <article className="card-soft transition hover:-translate-y-1 hover:shadow-glow">
          <h2 className="text-xl font-semibold text-text-dark">Fast Order Confirmations</h2>
          <p className="mt-3 text-sm leading-7 text-text-light">Your order is received instantly and the kitchen begins preparation right away.</p>
        </article>
      </div>

      <section className="section-glow bg-gradient-to-r from-mint-light via-white to-mint">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-text-light">Stay connected</p>
            <h2 className="mt-3 text-3xl font-semibold text-text-dark">Follow Jass Food on social media</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.instagram.com/jassfood/" target="_blank" rel="noreferrer" className="btn-secondary">Instagram</a>
            <a href="https://www.facebook.com/jassfood1/" target="_blank" rel="noreferrer" className="btn-secondary">Facebook</a>
          </div>
        </div>
      </section>

      {/* Contact moved to separate route */}
    </section>
  );
}
