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
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateField = (name, value) => {
    const trimmed = value.trim();
    switch (name) {
      case 'name':
        return trimmed ? '' : 'Full name is required.';
      case 'email':
        if (!trimmed) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Enter a valid email address.';
        return '';
      case 'phone':
        if (!trimmed) return 'Mobile number is required.';
        if (!/^[0-9]{10}$/.test(trimmed)) return 'Enter a valid 10-digit mobile number.';
        return '';
      case 'addressLine1':
        return trimmed ? '' : 'Address line 1 is required.';
      case 'city':
        return trimmed ? '' : 'City is required.';
      case 'pincode':
        if (!trimmed) return 'Pincode is required.';
        if (!/^[0-9]{6}$/.test(trimmed)) return 'Enter a valid 6-digit pincode.';
        return '';
      default:
        return '';
    }
  };

  const validateAllFields = (values) => {
    const nextErrors = {};
    ['name', 'email', 'phone', 'addressLine1', 'city', 'pincode'].forEach((field) => {
      const message = validateField(field, values[field] || '');
      if (message) nextErrors[field] = message;
    });
    return nextErrors;
  };

  const getFieldClassName = (name, defaultBg = 'bg-mint-light') =>
    `w-full rounded-3xl border px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${defaultBg} ${fieldErrors[name] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-mint'}`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      const nextError = validateField(name, value);
      if (!nextError) {
        const { [name]: removed, ...rest } = current;
        return rest;
      }
      return { ...current, [name]: nextError };
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFieldErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (items.length === 0) {
      setError('Your cart is empty. Add sweets before checkout.');
      return;
    }

    const nextErrors = validateAllFields(form);
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setError('Please fix the highlighted fields before placing the order.');
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
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 rounded-lg sm:rounded-2xl md:rounded-[2rem] border border-mint bg-white/95 p-4 sm:p-8 md:p-10 shadow-glow">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
        <div>
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">🛍️ Checkout</p>
          <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-text-dark">Place your order</h2>
          <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-text-light">
            Submit your order and the system will automatically send a receipt to the owner and a confirmation email to you.
          </p>
        </div>
        <div className="rounded-lg sm:rounded-2xl md:rounded-[1.75rem] border border-mint bg-mint-light p-4 sm:p-6 text-xs sm:text-sm text-text-light shadow-sm">
          <p className="font-semibold text-text-dark">✅ What happens next</p>
          <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 list-disc pl-4 sm:pl-5 text-xs sm:text-sm">
            <li>Your order is confirmed instantly by the system.</li>
            <li>A receipt is sent to your email address.</li>
            <li>The owner receives the order automatically.</li>
          </ul>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg sm:rounded-2xl md:rounded-[1.75rem] border border-mint bg-mint-light p-4 sm:p-6 text-center text-xs sm:text-sm text-text-light shadow-sm">
          Your cart is empty. Add items from the menu to continue.
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 rounded-lg sm:rounded-2xl md:rounded-[1.75rem] border border-mint bg-mint-light p-4 sm:p-6 shadow-sm md:grid-cols-[1fr_0.9fr]">
          <div className="space-y-2 sm:space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-mint bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-light">
                <span className="truncate">{item.name} x {item.quantity}</span>
                <span className="font-semibold text-text-dark flex-shrink-0">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg sm:rounded-2xl md:rounded-[1.75rem] border border-mint bg-white p-4 sm:p-5 shadow-sm">
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">Order summary</p>
            <div className="mt-3 sm:mt-4 flex items-center justify-between text-sm sm:text-base font-bold text-text-dark">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-text-light">We'll send your confirmation right away and start preparing your sweets with care.</p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-light">
          👤 Full Name
          <input
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            required
            aria-invalid={fieldErrors.name ? 'true' : 'false'}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            className={getFieldClassName('name')}
          />
          {fieldErrors.name && <p id="name-error" className="text-xs text-red-500">{fieldErrors.name}</p>}
        </label>
        <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-light">
          📱 Mobile Number
          <input
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            name="phone"
            type="tel"
            required
            aria-invalid={fieldErrors.phone ? 'true' : 'false'}
            aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
            className={getFieldClassName('phone')}
          />
          {fieldErrors.phone && <p id="phone-error" className="text-xs text-red-500">{fieldErrors.phone}</p>}
        </label>
        <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-light md:col-span-2">
          📧 Email Address
          <input
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
            required
            aria-invalid={fieldErrors.email ? 'true' : 'false'}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={getFieldClassName('email')}
          />
          {fieldErrors.email && <p id="email-error" className="text-xs text-red-500">{fieldErrors.email}</p>}
        </label>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-light md:col-span-2">
          📍 Address Line 1
          <input
            value={form.addressLine1}
            onChange={handleChange}
            onBlur={handleBlur}
            name="addressLine1"
            required
            aria-invalid={fieldErrors.addressLine1 ? 'true' : 'false'}
            aria-describedby={fieldErrors.addressLine1 ? 'addressLine1-error' : undefined}
            className={getFieldClassName('addressLine1', 'bg-white')}
          />
          {fieldErrors.addressLine1 && <p id="addressLine1-error" className="text-xs text-red-500">{fieldErrors.addressLine1}</p>}
        </label>
        <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-light">
          🏙️ City
          <input
            value={form.city}
            onChange={handleChange}
            onBlur={handleBlur}
            name="city"
            required
            aria-invalid={fieldErrors.city ? 'true' : 'false'}
            aria-describedby={fieldErrors.city ? 'city-error' : undefined}
            className={getFieldClassName('city', 'bg-white')}
          />
          {fieldErrors.city && <p id="city-error" className="text-xs text-red-500">{fieldErrors.city}</p>}
        </label>
        <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-light">
          📮 Pincode
          <input
            value={form.pincode}
            onChange={handleChange}
            onBlur={handleBlur}
            name="pincode"
            required
            aria-invalid={fieldErrors.pincode ? 'true' : 'false'}
            aria-describedby={fieldErrors.pincode ? 'pincode-error' : undefined}
            className={getFieldClassName('pincode', 'bg-white')}
          />
          {fieldErrors.pincode && <p id="pincode-error" className="text-xs text-red-500">{fieldErrors.pincode}</p>}
        </label>
        <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-light">
          🗺️ Landmark
          <input
            value={form.landmark}
            onChange={handleChange}
            name="landmark"
            className="w-full rounded-2xl sm:rounded-3xl border border-mint bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-light">
        📝 Order Notes
        <textarea
          value={form.notes}
          onChange={handleChange}
          name="notes"
          rows="3"
          className="w-full rounded-2xl sm:rounded-3xl border border-mint bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </label>

      {error && <p className="rounded-lg sm:rounded-2xl md:rounded-[1.75rem] bg-red-50 px-4 sm:px-4 py-3 sm:py-3 text-xs sm:text-sm text-red-700 leading-relaxed">{error}</p>}

      <button type="submit" className="btn-primary w-full text-xs sm:text-sm px-4 py-2.5 sm:py-3" disabled={loading}>
        {loading ? '⏳ Processing order…' : '✅ Place Order'}
      </button>
    </form>
  );
}
