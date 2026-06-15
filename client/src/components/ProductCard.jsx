import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, showNotification } = useCart();

  const handleAdd = () => {
    addItem(product, quantity);
    showNotification(`${product.name} added to cart!`);
    setQuantity(1);
  };

  return (
    <article className="group overflow-hidden rounded-lg sm:rounded-xl border border-mint bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-glow">
      <div className="overflow-hidden h-40 sm:h-48">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-text-dark line-clamp-2 flex-1">{product.name}</h3>
          <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
            <span className="whitespace-nowrap text-xs sm:text-sm font-semibold text-accent">₹{product.price}</span>
            <span className="text-xs text-text-light">{product.unit}</span>
          </div>
        </div>
        <p className="mt-2 text-xs sm:text-sm leading-5 text-text-light line-clamp-2">{product.description}</p>
        <div className="mt-3 flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 rounded-full border border-mint bg-mint-light px-2 py-1.5 sm:px-3 sm:py-2">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="text-sm font-bold text-text-light hover:text-primary transition"
            >
              −
            </button>
            <span className="min-w-[1.5rem] text-center text-xs sm:text-sm font-semibold text-text-dark">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="text-sm font-bold text-text-light hover:text-primary transition"
            >
              +
            </button>
          </div>
          <button onClick={handleAdd} className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
