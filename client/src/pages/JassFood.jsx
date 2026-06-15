import products from '../data/products';
import ProductCard from '../components/ProductCard';

export default function JassFood() {
    const jass = products.filter((p) => p.category === 'jass-food');

    return (
        <section className="grid gap-6 py-10">
            <h1 className="text-2xl font-semibold text-text-dark">Jass Food</h1>
            <p className="text-sm text-text-light">All products from Jass Food. Prices are in INR.</p>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {jass.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
