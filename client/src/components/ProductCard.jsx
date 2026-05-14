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
    <article className="group overflow-hidden rounded-xl border border-mint bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="overflow-hidden">
        <img src={product.image} alt={product.name} className="h-40 w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-text-dark">{product.name}</h3>
          <span className="whitespace-nowrap text-xs font-semibold text-accent">₹{product.price}</span>
        </div>
        <p className="mt-1 text-xs leading-5 text-text-light">{product.description}</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1 rounded-full border border-mint bg-mint-light px-2 py-1">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="text-sm font-semibold text-text-light"
            >
              –
            </button>
            <span className="min-w-[1.5rem] text-center text-xs font-semibold text-text-dark">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="text-sm font-semibold text-text-light"
            >
              +
            </button>
          </div>
          <button onClick={handleAdd} className="btn-primary w-full text-xs sm:w-auto sm:px-3 sm:py-2">
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
