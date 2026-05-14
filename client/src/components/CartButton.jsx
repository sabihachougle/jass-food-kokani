import { useCart } from '../context/CartContext';

export default function CartButton() {
  const { totalItems, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-black/10 transition hover:bg-primary-light md:hidden"
    >
      Cart
      <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
        {totalItems}
      </span>
    </button>
  );
}
