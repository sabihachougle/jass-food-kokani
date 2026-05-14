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
    <section className="py-10 md:py-16">
      <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-mint bg-gradient-to-r from-accent/10 via-white to-mint-light px-6 py-8 shadow-glow sm:px-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-text-light">Traditional sweets</p>
          <h1 className="mt-3 text-4xl font-semibold text-text-dark">Kokani menu</h1>
        </div>
        <p className="max-w-xl text-sm leading-7 text-text-light">Choose from our beloved handmade sweets, crafted with authentic Kokani flavor and rich tradition.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {comingSoon.map((item) => (
          <article key={item.id} className="group flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-mint bg-white/85 p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-2xl">✨</div>
            <h3 className="text-base font-semibold text-text-dark">{item.label}</h3>
            <p className="mt-2 text-xs leading-6 text-text-light">New Kokani flavors arriving soon. Stay connected on WhatsApp and social media.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
