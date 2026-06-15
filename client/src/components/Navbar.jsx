import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/jass-food', label: 'Jass Food' },
    { to: '/jass-kokani', label: 'Jass Kokani' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-mint bg-white/95 backdrop-blur-xl shadow-sm overflow-x-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2.5 sm:px-4 md:px-6 py-2.5 sm:py-3 lg:px-8 w-full box-border gap-2">
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-glow text-xs sm:text-sm font-bold flex-shrink-0">J</div>
          <div className="hidden sm:block min-w-0">
            <p className="text-xs uppercase tracking-[0.25em] text-text-light leading-none">Jass Food</p>
            <p className="text-sm md:text-base font-display font-semibold text-text-dark leading-tight">Kokani</p>
            <p className="text-xs italic text-accent">Homemade</p>
          </div>
          <div className="sm:hidden flex-shrink-0">
            <p className="font-display font-semibold text-text-dark text-xs md:text-sm">Jass</p>
            <p className="text-xs text-accent">Kokani</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex lg:gap-4">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-xs md:text-sm text-text-dark transition hover:text-primary hover:font-semibold whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0 ml-auto">
          <Link to="/checkout" className="hidden sm:inline-flex btn-secondary text-xs px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">Order Now</Link>

          <button
            onClick={toggleCart}
            className="relative inline-flex items-center rounded-full bg-primary px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs md:text-sm font-medium text-white transition hover:bg-primary-light flex-shrink-0"
          >
            <span className="hidden sm:inline">Cart</span>
            <span className="sm:hidden text-sm">🛒</span>
            <span className="ml-1 sm:ml-1.5 inline-flex h-4 sm:h-5 md:h-6 min-w-[1rem] sm:min-w-[1.25rem] md:min-w-[1.5rem] items-center justify-center rounded-full bg-accent text-xs font-bold text-white shadow-sm">
              {totalItems}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 text-text-dark hover:bg-mint-light transition flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-mint bg-white/98 px-2.5 sm:px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 overflow-x-hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-3 py-2 rounded-lg text-xs sm:text-sm text-text-dark hover:bg-mint-light transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/checkout"
            className="block btn-primary w-full text-center mt-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            Order Now
          </Link>
        </nav>
      )}
    </header>
  );
}
