import products from '../data/products';
import ProductCard from '../components/ProductCard';

export default function JassFood() {
    const jass = products.filter((p) => p.category === 'jass-food');

    return (
        <section className="py-6 sm:py-10 md:py-16">
            <div className="mb-6 sm:mb-8 md:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-dark">🍛 Jass Food</h1>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-text-light">All products from Jass Food. Prices are in INR.</p>
            </div>

            <div className="grid gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {jass.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
