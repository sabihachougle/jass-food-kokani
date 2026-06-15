import products from '../data/products';
import ProductCard from '../components/ProductCard';

const comingSoon = [
  { id: 'coming-1', label: 'Coming Soon' },
  { id: 'coming-2', label: 'Coming Soon' },
  { id: 'coming-3', label: 'Coming Soon' },
  { id: 'coming-4', label: 'Coming Soon' },
];

export default function Menu() {
  return (
    <section className="py-6 sm:py-10 md:py-16">
      <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col gap-3 sm:gap-4 md:gap-6 rounded-lg sm:rounded-2xl md:rounded-[2rem] border border-mint bg-gradient-to-r from-accent/10 via-white to-mint-light px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 shadow-glow md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">🍯 Traditional sweets</p>
          <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-text-dark">Kokani Menu</h1>
        </div>
        <p className="max-w-xl text-xs sm:text-sm leading-6 sm:leading-7 text-text-light">Choose from our beloved handmade sweets, crafted with authentic Kokani flavor and rich tradition.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {comingSoon.map((item) => (
          <article key={item.id} className="group flex min-h-[240px] sm:min-h-[280px] flex-col items-center justify-center rounded-lg sm:rounded-xl border border-dashed border-mint bg-white/85 p-4 sm:p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-2 sm:mb-3 inline-flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-full bg-accent/15 text-2xl sm:text-3xl">✨</div>
            <h3 className="text-sm sm:text-base font-semibold text-text-dark">{item.label}</h3>
            <p className="mt-2 text-xs leading-6 text-text-light">New Kokani flavors arriving soon. Stay connected on WhatsApp and social media.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
