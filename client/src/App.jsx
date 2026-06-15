import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Notification from './components/Notification';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Testimonials from './pages/Testimonials';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import JassFood from './pages/JassFood';
import JassKokani from './pages/JassKokani';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-mint-light via-white to-mint bg-fixed text-text-dark">
      <Navbar />
      <CartDrawer />
      <Notification />
      <main className="mx-auto w-full max-w-7xl px-2.5 sm:px-4 md:px-6 pb-8 sm:pb-12 md:pb-16 lg:px-8 box-border">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jass-food" element={<JassFood />} />
          <Route path="/jass-kokani" element={<JassKokani />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
