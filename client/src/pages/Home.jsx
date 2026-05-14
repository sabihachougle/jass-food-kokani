import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="grid gap-16 py-10 md:py-16">
      <div className="grid gap-10 rounded-[2rem] border border-mint bg-white/95 px-6 py-10 shadow-glow sm:px-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">Homemade Mithaas</p>
          <p className="text-sm uppercase tracking-[0.35em] text-text-light">Authentic Kokani Taste</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-text-dark sm:text-5xl">Authentic Kokani Sweets, Made with Love</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-text-light">
            Jass Food and Kokani Delicacies brings the warm flavors of home to your table with traditional recipes passed down through generations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/menu" className="btn-primary">View Menu</Link>
            <Link to="/checkout" className="btn-secondary">Order Now</Link>
          </div>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-accent/10 via-mint-light to-white p-8 text-center shadow-inner shadow-glow/30">
          <p className="text-sm uppercase tracking-[0.35em] text-text-light">Home-based sweets</p>
          <div className="mt-8 space-y-3 text-left text-text-light">
            <p>Handmade Kokani sweets prepared in small batches.</p>
            <p>Fresh ingredients, natural spices, and old family secrets.</p>
            <p>Orders are confirmed automatically and prepared with care.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <article className="card-soft transition hover:-translate-y-1 hover:shadow-glow">
          <h2 className="text-xl font-semibold text-text-dark">Trusted Family Recipes</h2>
          <p className="mt-3 text-sm leading-7 text-text-light">Traditional Kokani sweet formulas made exactly the way mom intended.</p>
        </article>
        <article className="card-soft transition hover:-translate-y-1 hover:shadow-glow">
          <h2 className="text-xl font-semibold text-text-dark">Fresh for Every Order</h2>
          <p className="mt-3 text-sm leading-7 text-text-light">Each order is prepared fresh and packaged with care for pickup or delivery.</p>
        </article>
        <article className="card-soft transition hover:-translate-y-1 hover:shadow-glow">
          <h2 className="text-xl font-semibold text-text-dark">Fast Order Confirmations</h2>
          <p className="mt-3 text-sm leading-7 text-text-light">Your order is received instantly and the kitchen begins preparation right away.</p>
        </article>
      </div>

      <section className="section-glow bg-gradient-to-r from-mint-light via-white to-mint">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-text-light">Stay connected</p>
            <h2 className="mt-3 text-3xl font-semibold text-text-dark">Follow Jass Food on social media</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.instagram.com/jassfood/" target="_blank" rel="noreferrer" className="btn-secondary">Instagram</a>
            <a href="https://www.facebook.com/jassfood1/" target="_blank" rel="noreferrer" className="btn-secondary">Facebook</a>
          </div>
        </div>
      </section>

      <section id="contact" className="card-soft bg-gradient-to-br from-mint-light/80 via-white to-mint-light">
        <p className="text-sm uppercase tracking-[0.35em] text-text-light">Contact</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-text-dark">Jass Food & Kokani Delicacies</h3>
            <p className="text-sm leading-7 text-text-light">Home-based Kokani sweets business accepting orders online. Fresh, handmade, and lovingly prepared.</p>
          </div>
          <div className="space-y-3 text-sm text-text-light">
            <p><strong>Phone:</strong> +91 98339 87609</p>
            <p><strong>Email:</strong> orders@jassfood.com</p>
            <p><strong>Follow:</strong> Instagram / Facebook</p>
          </div>
        </div>
      </section>
    </section>
  );
}
