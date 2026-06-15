import products from '../data/products';
import ProductCard from '../components/ProductCard';

export default function JassKokani() {
    const kokani = products.filter((p) => p.category === 'kokani');

    return (
        <section className="grid gap-6 py-10">
            <h1 className="text-2xl font-semibold text-text-dark">Jass Kokani Delicacies</h1>
            <p className="text-sm text-text-light">Traditional Kokani sweets and delicacies. Prices are in INR.</p>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {kokani.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
