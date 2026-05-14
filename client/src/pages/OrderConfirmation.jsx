import { Link, useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const state = location.state;

  if (!state) {
    return (
      <section className="py-10 md:py-16">
        <div className="section-glow text-center">
          <h1 className="text-3xl font-semibold text-text-dark">Order details not found</h1>
          <p className="mt-4 text-sm leading-7 text-text-light">Please return to the menu and place an order.</p>
          <Link to="/menu" className="btn-primary mt-6 inline-block">Go to Menu</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16">
      <div className="section-glow mx-auto max-w-4xl space-y-8 p-10">
        <div className="text-center">
          <div className="mx-auto inline-flex rounded-full bg-accent/15 px-4 py-2 text-sm font-semibold text-accent">Order Confirmed</div>
          <p className="mt-4 text-sm uppercase tracking-[0.35em] text-text-light">Thank you</p>
          <h1 className="mt-3 text-4xl font-semibold text-text-dark">Your order is confirmed</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-7 text-text-light">
            Your order has been received by our system. A confirmation email has been sent to you and the owner has been notified automatically.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-text-light">Order ID</p>
            <p className="mt-3 text-3xl font-semibold text-text-dark">{state.orderId}</p>
            <p className="mt-4 text-sm leading-7 text-text-light">Save this ID for future reference or updates on your order.</p>
          </div>
          <div className="card-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-text-light">Delivery details</p>
            <p className="mt-3 text-sm leading-7 text-text-light">
              {state.address.line1}, {state.address.city} — {state.address.pincode}
            </p>
            {state.address.landmark && <p className="mt-2 text-sm leading-7 text-text-light">Landmark: {state.address.landmark}</p>}
          </div>
        </div>

        <div className="card-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-text-light">Order summary</p>
          <div className="mt-4 space-y-3 text-sm text-text-light">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-3xl border border-mint bg-white px-4 py-3">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-semibold text-text-dark">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-mint pt-4 text-sm font-semibold text-text-dark">
            <span>Total</span>
            <span>₹{state.total}</span>
          </div>
        </div>

        <div className="card-soft text-sm leading-7 text-text-light">
          <p>We sent an order receipt to <strong>{state.customer.email}</strong>.</p>
          <p className="mt-3">The owner has also been notified automatically.</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/menu" className="btn-secondary">Back to Menu</Link>
          <Link to="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    </section>
  );
}
