import products from '../data/products';
import ProductCard from '../components/ProductCard';

export default function JassKokani() {
    const kokani = products.filter((p) => p.category === 'kokani');

    return (
        <section className="py-6 sm:py-10 md:py-16">
            <div className="mb-6 sm:mb-8 md:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-dark">🍯 Jass Kokani Delicacies</h1>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-text-light">Traditional Kokani sweets and delicacies. Prices are in INR.</p>
            </div>

            <div className="grid gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {kokani.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
