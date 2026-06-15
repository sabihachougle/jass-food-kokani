import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartButton from './CartButton';

export default function CartDrawer() {
  const { items, totalPrice, isOpen, toggleCart, updateQuantity, removeItem } = useCart();

  return (
    <>
      <CartButton />
      <aside className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed right-0 top-0 z-50 h-full w-full max-w-md transform overflow-y-auto border-l border-mint bg-white/95 px-5 py-6 shadow-2xl transition-transform duration-300 md:w-[420px]`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-text-light">Your Cart</p>
            <h2 className="mt-2 text-2xl font-semibold text-text-dark">Ready to enjoy</h2>
          </div>
          <button onClick={toggleCart} className="text-2xl font-bold text-text-light transition hover:text-accent">×</button>
        </div>

        <div className="mt-8 space-y-5">
          {items.length === 0 ? (
            <div className="rounded-[1.75rem] border border-mint bg-mint-light p-6 text-center text-sm text-text-light shadow-sm">
              Add some sweets from the menu to start your order.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-[1.75rem] border border-mint bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark">{item.name}</h3>
                    <p className="mt-1 text-sm text-text-light">₹{item.price} {item.unit}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-sm text-text-light transition hover:text-accent">Remove</button>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 rounded-full border border-mint bg-mint-light px-3 py-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="rounded-full bg-white px-3 py-1 text-lg font-semibold text-text-light shadow-sm transition hover:bg-mint"
                  >
                    –
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-semibold text-text-dark">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-full bg-white px-3 py-1 text-lg font-semibold text-text-light shadow-sm transition hover:bg-mint"
                  >
                    +
                  </button>
                  <span className="ml-auto text-sm font-semibold text-text-light">₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-mint bg-mint-light p-5 shadow-sm">
          <div className="flex items-center justify-between text-sm text-text-light">
            <span>Subtotal</span>
            <span className="font-semibold text-text-dark">₹{totalPrice}</span>
          </div>
          <Link
            to="/checkout"
            onClick={toggleCart}
            className="mt-5 block rounded-full bg-gradient-to-r from-primary via-primary-light to-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-glow transition hover:from-accent hover:to-primary"
          >
            Continue to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
