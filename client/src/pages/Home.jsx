import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import homeContent from '../content/home.json';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
const CONTACT_RECIPIENT_FALLBACK = '';
const CONTACT_CC_FALLBACK = '';

function useRuntimeConfig() {
  const [config, setConfig] = useState({ contactRecipient: CONTACT_RECIPIENT_FALLBACK, contactCc: CONTACT_CC_FALLBACK });

  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE}/api/config`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!mounted || !data) return;
        setConfig({ contactRecipient: data.contactRecipient || CONTACT_RECIPIENT_FALLBACK, contactCc: data.contactCc || CONTACT_CC_FALLBACK });
      })
      .catch(() => { });
    return () => { mounted = false; };
  }, []);

  return config;
}

function CarouselSection({ title, items = [], link }) {
  const containerRef = useRef(null);
  const { addItem, showNotification } = useCart();

  const scrollByCard = (direction = 1) => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('.carousel-card');
    if (!card) return;
    const gap = 16;
    const cardWidth = card.offsetWidth + gap;
    container.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    addItem(product, 1);
    showNotification(`${product.name} added to cart!`);
  };

  return (
    <section className="card-soft min-w-0 p-2.5 sm:p-3 md:p-4 lg:p-6">
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-text-dark">{title}</h3>
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
          <button type="button" onClick={() => scrollByCard(-1)} aria-label="Scroll left" className="btn-secondary text-xs sm:text-sm px-2 sm:px-2.5 py-1 sm:py-1.5">←</button>
          <button type="button" onClick={() => scrollByCard(1)} aria-label="Scroll right" className="btn-secondary text-xs sm:text-sm px-2 sm:px-2.5 py-1 sm:py-1.5">→</button>
          {link && <Link to={link} className="ml-1 sm:ml-2 md:ml-3 text-xs sm:text-sm text-primary font-semibold hover:text-primary-dark transition">View all →</Link>}
        </div>
      </div>

      <div ref={containerRef} className="flex min-w-0 gap-2 sm:gap-3 md:gap-4 overflow-x-auto py-2 scrollbar-hide px-0 sm:px-0 md:px-0 w-full">
        {items.map((it, idx) => (
          <div key={idx} className="carousel-card min-w-[150px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[220px] max-w-[150px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[220px] rounded-lg sm:rounded-xl border border-mint bg-white shadow-sm hover:shadow-md transition overflow-hidden flex-shrink-0">
            <img src={it.image} alt={it.name} className="h-28 sm:h-32 md:h-36 w-full object-cover" />
            <div className="p-2 sm:p-2.5">
              <div className="flex items-start justify-between gap-1">
                <h4 className="text-xs sm:text-sm font-semibold text-text-dark line-clamp-2">{it.name}</h4>
                <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                  <span className="text-xs font-semibold text-accent">₹{it.price || ''}</span>
                  <span className="text-xs text-text-light">{it.unit}</span>
                </div>
              </div>
              {it.description && <p className="mt-1 text-xs text-text-light line-clamp-1">{it.description}</p>}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => handleAddToCart(it)}
                  className="btn-primary w-full text-xs sm:text-sm px-3 py-2"
                >
                  Add to Cart
                </button>
              </div>
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

  const { contactRecipient, contactCc } = useRuntimeConfig();
  const hero = homeContent?.hero || {};

  return (
    <section className="grid min-w-0 gap-6 sm:gap-8 md:gap-12 lg:gap-16 py-4 sm:py-6 md:py-10 lg:py-16 w-full">
      <div className="grid min-w-0 gap-4 sm:gap-6 md:gap-8 rounded-lg sm:rounded-2xl md:rounded-[2rem] border border-mint bg-white/95 px-3 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 shadow-glow md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="max-w-2xl min-w-0 order-2 md:order-1">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-accent font-semibold">{hero.eyebrow || 'Homemade Mithaas'}</p>
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light mt-1">{hero.subeyebrow || 'Authentic Kokani Taste'}</p>
          <h1 className="mt-3 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight text-text-dark">{hero.heading || 'Authentic Kokani Sweets, Made with Love'}</h1>
          <div className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base leading-7 sm:leading-8 text-text-light">
            {(hero.paragraphs || []).map((p, i) => (
              <p key={i} className={i === 0 ? '' : 'mt-2 sm:mt-3'}>{p}</p>
            ))}
          </div>
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-4">
            {(hero.cta || []).map((c, i) => (
              <Link key={i} to={c.link} className={c.type === 'primary' ? 'btn-primary text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3' : 'btn-secondary text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3'}>{c.label}</Link>
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-lg sm:rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-accent/10 via-mint-light to-white p-4 sm:p-6 md:p-8 text-center shadow-inner shadow-glow/30 order-1 md:order-2">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">🏠 Home-based sweets</p>
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-left text-xs sm:text-sm text-text-light leading-relaxed">
            <p className="flex items-start gap-2"><span className="text-accent text-lg flex-shrink-0">✓</span> <span>Handmade Kokani sweets prepared in small batches</span></p>
            <p className="flex items-start gap-2"><span className="text-accent text-lg flex-shrink-0">✓</span> <span>Fresh ingredients, natural spices, and old family secrets</span></p>
            <p className="flex items-start gap-2"><span className="text-accent text-lg flex-shrink-0">✓</span> <span>Orders confirmed automatically and prepared with care</span></p>
          </div>
        </div>
      </div>

      {/* Trending carousels */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        <CarouselSection
          title="🔥 Trending Jass Food Items"
          items={jassItems}
          link="/jass-food"
        />

        <CarouselSection
          title="⭐ Jass Kokani Best Sellers"
          items={kokaniItems}
          link="/jass-kokani"
        />
      </div>

      <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-3">
        <article className="card-soft p-3 sm:p-4 md:p-6 transition hover:-translate-y-1 hover:shadow-glow group">
          <div className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">👨‍👩‍👧</div>
          <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-text-dark group-hover:text-primary transition">Trusted Family Recipes</h2>
          <p className="mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 md:leading-7 text-text-light">Traditional Kokani sweet formulas made exactly the way mom intended.</p>
        </article>
        <article className="card-soft p-3 sm:p-4 md:p-6 transition hover:-translate-y-1 hover:shadow-glow group">
          <div className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">🍬</div>
          <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-text-dark group-hover:text-primary transition">Fresh for Every Order</h2>
          <p className="mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 md:leading-7 text-text-light">Each order is prepared fresh and packaged with care for pickup or delivery.</p>
        </article>
        <article className="card-soft p-3 sm:p-4 md:p-6 transition hover:-translate-y-1 hover:shadow-glow group">
          <div className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">⚡</div>
          <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-text-dark group-hover:text-primary transition">Fast Order Confirmations</h2>
          <p className="mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 md:leading-7 text-text-light">Your order is received instantly and the kitchen begins preparation right away.</p>
        </article>
      </div>

      <section className="section-glow bg-gradient-to-r from-mint-light via-white to-mint p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">📱 Stay connected</p>
            <h2 className="mt-1.5 sm:mt-2 md:mt-3 text-lg sm:text-2xl md:text-3xl font-semibold text-text-dark">Follow on social media</h2>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            <a href="https://www.instagram.com/jassfood/" target="_blank" rel="noreferrer" className="btn-secondary text-xs sm:text-sm px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3">📷 Instagram</a>
            <a href="https://www.facebook.com/jassfood1/" target="_blank" rel="noreferrer" className="btn-secondary text-xs sm:text-sm px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3">f Facebook</a>
          </div>
        </div>
      </section>

      {/* Contact moved to separate route */}
    </section>
  );
}
