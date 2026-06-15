import { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, isOpen, onClose }) {
    const { addItem, showNotification } = useCart();
    const [activeIndex, setActiveIndex] = useState(0);

    const imageList = useMemo(() => {
        if (!product) return [];

        const images = [product.image, ...(product.images || [])].filter(Boolean);
        return images.reduce((acc, src) => (acc.includes(src) ? acc : [...acc, src]), []);
    }, [product]);

    if (!product || !isOpen) return null;

    const handleAddToCart = () => {
        addItem(product, 1);
        showNotification(`${product.name} added to cart!`);
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex min-h-screen items-start justify-center overflow-y-auto bg-black/60 p-4 sm:p-6"
            onClick={handleOverlayClick}
            aria-modal="true"
            role="dialog"
        >
            <div className="relative w-full max-w-6xl max-h-[calc(100vh-3rem)] overflow-hidden rounded-3xl bg-white shadow-2xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full border border-text-light/40 bg-white/90 px-3 py-2 text-sm font-semibold text-text-dark shadow-sm transition hover:bg-white"
                    aria-label="Close product details"
                >
                    ×
                </button>

                <div className="grid h-full max-h-[calc(100vh-3rem)] min-h-[20rem] gap-4 lg:grid-cols-[1.3fr_0.9fr] p-5 sm:p-6 lg:p-8">
                    <div className="flex min-h-0 flex-col gap-4 overflow-hidden">
                        <div className="aspect-[4/3] w-full max-h-[55vh] overflow-hidden rounded-3xl bg-slate-100">
                            <img
                                src={imageList[activeIndex]}
                                alt={`${product.name} large view`}
                                className="img-modal-main object-cover"
                            />
                        </div>

                        {imageList.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {imageList.map((src, index) => (
                                    <button
                                        key={src + index}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className={`min-w-[4.5rem] overflow-hidden rounded-2xl border p-1 transition ${activeIndex === index ? 'border-accent' : 'border-slate-200 hover:border-primary'}`}
                                    >
                                        <img src={src} alt={`${product.name} alternate ${index + 1}`} className="img-modal-thumb object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex min-h-0 flex-col gap-5 overflow-y-auto pb-5">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-text-light">Product details</p>
                            <h2 className="mt-2 text-2xl font-semibold text-text-dark">{product.name}</h2>
                        </div>

                        <div className="rounded-3xl border border-mint bg-mint-light/50 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-text-light">Price</p>
                                    <p className="mt-1 text-xl font-semibold text-accent">₹{product.price}</p>
                                </div>
                                <p className="text-sm text-text-light">{product.unit}</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm leading-6 text-text-light">
                            <p>{product.description}</p>
                            {product.details && <p>{product.details}</p>}
                        </div>

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="btn-primary w-full text-sm px-4 py-3"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
