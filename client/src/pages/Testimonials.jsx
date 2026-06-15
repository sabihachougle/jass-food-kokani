import delivery1 from '../assets/testimonials/delivery-1.svg';
import delivery2 from '../assets/testimonials/delivery-2.svg';
import delivery3 from '../assets/testimonials/delivery-3.svg';

const testimonials = [
    {
        name: 'Priya Sharma',
        rating: 5,
        text: 'Jass Food did not disappoint. The sweets arrived fresh, and every bite tasted like home. Highly recommend!'
    },
    {
        name: 'Anil Deshmukh',
        rating: 5,
        text: 'Amazing service and fast delivery. The presentation was beautiful, and the flavors were authentic Kokani deliciousness.'
    },
    {
        name: 'Nita Pawar',
        rating: 4,
        text: 'The order arrived on time and the sweets were flavorful. I especially loved the homemade touch in every piece.'
    },
];

const deliveredOrders = [
    {
        title: 'Fresh Gift Pack',
        image: delivery1,
        alt: 'Fresh delivered sweets pack'
    },
    {
        title: 'Order Ready to Serve',
        image: delivery2,
        alt: 'Delivered order ready to serve'
    },
    {
        title: 'Happy Delivery',
        image: delivery3,
        alt: 'Delivered order image'
    },
];

export default function Testimonials() {
    return (
        <section className="grid gap-16 py-10 md:py-16">
            <div className="card-soft bg-white/95">
                <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">Customer Love</p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight text-text-dark sm:text-5xl">Testimonials & Delivered Orders</h1>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-text-light">
                            Read what our customers say and see a snapshot of the freshly delivered orders from Jass Food & Kokani Delicacies.
                            These are static images showing our presentation and delivery quality.
                        </p>
                    </div>
                    <div className="rounded-[2rem] border border-mint bg-mint-light p-8 shadow-sm">
                        <p className="text-sm uppercase tracking-[0.35em] text-text-light">How to use</p>
                        <ul className="mt-4 space-y-3 text-sm text-text-light">
                            <li>1. Add your review text on this page.</li>
                            <li>2. Replace the sample images in <code className="rounded-full bg-white px-2 py-1 text-xs">src/assets/testimonials</code>.</li>
                            <li>3. Save and refresh to show your own delivered order photos.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
                <div className="card-soft bg-white/95">
                    <p className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">Real Reviews</p>
                    <div className="mt-8 space-y-6">
                        {testimonials.map((testimonial, index) => (
                            <article key={index} className="rounded-[2rem] border border-mint bg-mint-light p-6 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-text-dark">{testimonial.name}</h2>
                                        <p className="text-sm text-text-light">{Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                                            <span key={starIndex} aria-hidden="true">⭐</span>
                                        ))}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-7 text-text-light">{testimonial.text}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6">
                    {deliveredOrders.map((order, index) => (
                        <figure key={index} className="card-soft overflow-hidden bg-white/95 p-0">
                            <img src={order.image} alt={order.alt} className="h-72 w-full object-cover" />
                            <figcaption className="rounded-b-[2rem] border-t border-mint bg-mint-light px-6 py-4 text-sm text-text-dark">
                                {order.title}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </section>
    );
}
