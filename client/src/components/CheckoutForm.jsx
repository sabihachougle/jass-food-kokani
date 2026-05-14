import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export default function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    addressLine1: '',
    city: '',
    pincode: '',
    landmark: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.addressLine1 || !form.city || !form.pincode) {
      setError('Please complete the required details before placing the order.');
      return;
    }
    if (items.length === 0) {
      setError('Your cart is empty. Add sweets before checkout.');
      return;
    }

    setError('');
    setLoading(true);

    const orderPayload = {
      items,
      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email,
      },
      address: {
        line1: form.addressLine1,
        city: form.city,
        pincode: form.pincode,
        landmark: form.landmark,
      },
      notes: form.notes,
      total: totalPrice,
    };

    try {
      const response = await axios.post(`${API_BASE}/api/order`, orderPayload);
      const order = response.data;
      clearCart();

      navigate('/confirmation', {
        state: {
          orderId: order.orderId,
          total: totalPrice,
          items,
          customer: orderPayload.customer,
          address: orderPayload.address,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-[2rem] border border-mint bg-white/95 p-8 shadow-glow md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-text-light">Checkout</p>
          <h2 className="mt-3 text-3xl font-semibold text-text-dark">Place your order</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-text-light">
            Submit your order and the system will automatically send a receipt to the owner and a confirmation email to you.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-mint bg-mint-light p-6 text-sm text-text-light shadow-sm">
          <p className="font-semibold text-text-dark">What happens next</p>
          <ul className="mt-4 space-y-3 list-disc pl-5">
            <li>Your order is confirmed instantly by the system.</li>
            <li>A receipt is sent to your email address.</li>
            <li>The owner receives the order automatically.</li>
          </ul>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[1.75rem] border border-mint bg-mint-light p-6 text-center text-sm text-text-light shadow-sm">
          Your cart is empty. Add items from the menu to continue.
        </div>
      ) : (
        <div className="grid gap-4 rounded-[1.75rem] border border-mint bg-mint-light p-6 shadow-sm md:grid-cols-[1fr_0.9fr]">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-3xl border border-mint bg-white px-4 py-3 text-sm text-text-light">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-semibold text-text-dark">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="rounded-[1.75rem] border border-mint bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-text-light">Order summary</p>
            <div className="mt-4 flex items-center justify-between text-base font-semibold text-text-dark">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-text-light">We'll send your confirmation right away and start preparing your sweets with care.</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-text-light">
          Full Name*
          <input
            value={form.name}
            onChange={handleChange}
            name="name"
            required
            className="w-full rounded-3xl border border-mint bg-mint-light px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-text-light">
          Mobile Number
          <input
            value={form.phone}
            onChange={handleChange}
            name="phone"
            type="tel"
            className="w-full rounded-3xl border border-mint bg-mint-light px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-text-light">
          Email Address*
          <input
            value={form.email}
            onChange={handleChange}
            name="email"
            type="email"
            required
            className="w-full rounded-3xl border border-mint bg-mint-light px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-text-light">
          Address Line 1*
          <input
            value={form.addressLine1}
            onChange={handleChange}
            name="addressLine1"
            required
            className="w-full rounded-3xl border border-mint bg-white px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-text-light">
          City*
          <input
            value={form.city}
            onChange={handleChange}
            name="city"
            required
            className="w-full rounded-3xl border border-mint bg-white px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-text-light">
          Pincode*
          <input
            value={form.pincode}
            onChange={handleChange}
            name="pincode"
            required
            className="w-full rounded-3xl border border-mint bg-white px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-text-light">
          Landmark
          <input
            value={form.landmark}
            onChange={handleChange}
            name="landmark"
            className="w-full rounded-3xl border border-mint bg-white px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-text-light">
        Order Notes
        <textarea
          value={form.notes}
          onChange={handleChange}
          name="notes"
          rows="4"
          className="w-full rounded-3xl border border-mint bg-white px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      {error && <p className="rounded-[1.75rem] bg-accent/10 px-4 py-3 text-sm text-accent">{error}</p>}

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? 'Processing order…' : 'Place Order'}
      </button>
    </form>
  );
}
