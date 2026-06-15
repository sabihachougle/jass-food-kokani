import { Link, useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const state = location.state;

  if (!state) {
    return (
      <section className="py-6 sm:py-10 md:py-16">
        <div className="section-glow text-center p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-dark">Order details not found</h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-text-light">Please return to the menu and place an order.</p>
          <Link to="/menu" className="btn-primary mt-4 sm:mt-6 inline-block text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3">Go to Menu</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-10 md:py-16">
      <div className="section-glow mx-auto max-w-4xl space-y-6 sm:space-y-8 p-4 sm:p-8 md:p-10">
        <div className="text-center">
          <div className="mx-auto inline-flex rounded-full bg-accent/15 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-accent">✅ Order Confirmed</div>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">🎉 Thank you</p>
          <h1 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-semibold text-text-dark">Your order is confirmed</h1>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm leading-6 sm:leading-7 text-text-light">
            Your order has been received by our system. A confirmation email has been sent to you and the owner has been notified automatically.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <div className="card-soft p-4 sm:p-6 md:p-8">
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">📦 Order ID</p>
            <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-accent">{state.orderId}</p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-text-light">Save this ID for future reference or updates on your order.</p>
          </div>
          <div className="card-soft p-4 sm:p-6 md:p-8">
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">🚚 Delivery details</p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-text-light font-medium text-text-dark">
              {state.address.line1}, {state.address.city} — {state.address.pincode}
            </p>
            {state.address.landmark && <p className="mt-2 text-xs sm:text-sm leading-6 sm:leading-7 text-text-light"><strong>Landmark:</strong> {state.address.landmark}</p>}
          </div>
        </div>

        <div className="card-soft p-4 sm:p-6 md:p-8">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">📋 Order summary</p>
          <div className="mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-text-light">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl sm:rounded-3xl border border-mint bg-white px-3 sm:px-4 py-2 sm:py-3">
                <span className="truncate">{item.name} x {item.quantity}</span>
                <span className="font-semibold text-text-dark flex-shrink-0 ml-2">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-mint pt-3 sm:pt-4 text-xs sm:text-sm font-bold text-text-dark">
            <span>Total Amount</span>
            <span className="text-lg sm:text-xl text-accent">₹{state.total}</span>
          </div>
        </div>

        <div className="card-soft p-4 sm:p-6 md:p-8 text-xs sm:text-sm leading-6 sm:leading-7 text-text-light">
          <p>✉️ We sent an order receipt to <strong className="text-text-dark">{state.customer.email}</strong>.</p>
          <p className="mt-2 sm:mt-3">📲 The owner has also been notified automatically.</p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
          <Link to="/menu" className="btn-secondary w-full sm:w-auto text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 text-center">← Back to Menu</Link>
          <Link to="/" className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 text-center">🏠 Return Home</Link>
        </div>
      </div>
    </section>
  );
}
