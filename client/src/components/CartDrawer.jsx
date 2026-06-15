import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartButton from './CartButton';

export default function CartDrawer() {
  const { items, totalPrice, isOpen, toggleCart, updateQuantity, removeItem } = useCart();

  return (
    <>
      <CartButton />
      <aside className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed right-0 top-0 z-50 h-full w-full max-w-sm sm:max-w-md transform overflow-y-auto border-l border-mint bg-white/95 px-3 sm:px-5 py-4 sm:py-6 shadow-2xl transition-transform duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-text-light font-medium">🛒 Your Cart</p>
            <h2 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-semibold text-text-dark">Ready to enjoy</h2>
          </div>
          <button onClick={toggleCart} className="text-2xl sm:text-3xl font-bold text-text-light transition hover:text-accent flex-shrink-0">×</button>
        </div>

        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-5">
          {items.length === 0 ? (
            <div className="rounded-lg sm:rounded-2xl md:rounded-[1.75rem] border border-mint bg-mint-light p-4 sm:p-6 text-center text-xs sm:text-sm text-text-light shadow-sm">
              Add some sweets from the menu to start your order.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-lg sm:rounded-2xl md:rounded-[1.75rem] border border-mint bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-lg font-semibold text-text-dark truncate">{item.name}</h3>
                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-text-light">₹{item.price} {item.unit}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-xs sm:text-sm text-text-light transition hover:text-accent hover:font-semibold flex-shrink-0">Remove</button>
                </div>
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 rounded-full border border-mint bg-mint-light px-2 sm:px-3 py-1.5 sm:py-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="rounded-full bg-white px-2 sm:px-3 py-0.5 sm:py-1 text-sm sm:text-lg font-bold text-text-light shadow-sm transition hover:bg-mint flex-shrink-0"
                  >
                    −
                  </button>
                  <span className="min-w-[1.5rem] sm:min-w-[2rem] text-center text-xs sm:text-sm font-semibold text-text-dark">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-full bg-white px-2 sm:px-3 py-0.5 sm:py-1 text-sm sm:text-lg font-bold text-text-light shadow-sm transition hover:bg-mint flex-shrink-0"
                  >
                    +
                  </button>
                  <span className="ml-auto text-xs sm:text-sm font-semibold text-text-dark flex-shrink-0">₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 sm:mt-8 rounded-lg sm:rounded-2xl md:rounded-[1.75rem] border border-mint bg-mint-light p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs sm:text-sm text-text-light">
            <span className="font-medium">Subtotal</span>
            <span className="font-bold text-text-dark text-sm sm:text-base">₹{totalPrice}</span>
          </div>
          <Link
            to="/checkout"
            onClick={toggleCart}
            className="mt-4 sm:mt-5 block rounded-full bg-gradient-to-r from-primary via-primary-light to-accent px-4 sm:px-5 py-2.5 sm:py-3 text-center text-xs sm:text-sm font-semibold text-white shadow-glow transition hover:from-accent hover:to-primary active:scale-95"
          >
            Continue to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
