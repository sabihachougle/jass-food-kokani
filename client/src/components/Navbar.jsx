import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-mint bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-glow">J</div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-text-light">Jass Food</p>
            <p className="text-lg font-display font-semibold text-text-dark">Kokani Delicacies</p>
            <p className="text-xs italic text-accent">Homemade Mithaas</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm text-text-dark transition hover:text-primary">Home</Link>
          <Link to="/menu" className="text-sm text-text-dark transition hover:text-primary">Menu</Link>
          <Link to="/jass-food" className="text-sm text-text-dark transition hover:text-primary">Jass Food</Link>
          <Link to="/jass-kokani" className="text-sm text-text-dark transition hover:text-primary">Jass Kokani</Link>
          <Link to="/testimonials" className="text-sm text-text-dark transition hover:text-primary">Testimonials</Link>
          <Link to="/checkout" className="text-sm text-text-dark transition hover:text-primary">Order Now</Link>
          <Link to="/contact" className="text-sm text-text-dark transition hover:text-primary">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light"
          >
            Cart
            <span className="ml-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-accent text-xs font-bold text-white shadow-sm">
              {totalItems}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
