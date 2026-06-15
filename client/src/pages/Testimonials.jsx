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
        <section className="grid gap-8 sm:gap-12 md:gap-16 py-6 sm:py-10 md:py-16">
            <div className="card-soft bg-white/95 p-4 sm:p-6 md:p-8">
                <div className="grid gap-6 sm:gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div>
                        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-accent font-semibold">💕 Customer Love</p>
                        <h1 className="mt-3 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight text-text-dark">Testimonials & Delivered Orders</h1>
                        <p className="mt-4 sm:mt-6 max-w-2xl text-xs sm:text-base leading-6 sm:leading-8 text-text-light">
                            Read what our customers say and see a snapshot of the freshly delivered orders from Jass Food & Kokani Delicacies.
                            These are static images showing our presentation and delivery quality.
                        </p>
                    </div>
                    <div className="rounded-lg sm:rounded-2xl md:rounded-[2rem] border border-mint bg-mint-light p-4 sm:p-6 md:p-8 shadow-sm">
                        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">📝 How to use</p>
                        <ul className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm text-text-light">
                            <li>1. Add your review text on this page.</li>
                            <li>2. Replace the sample images in <code className="rounded-full bg-white px-2 py-0.5 text-xs font-mono">src/assets/testimonials</code>.</li>
                            <li>3. Save and refresh to show your own delivered order photos.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="grid gap-6 sm:gap-8 md:grid-cols-[1fr_1.1fr]">
                <div className="card-soft bg-white/95 p-4 sm:p-6 md:p-8">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-accent font-semibold">⭐ Real Reviews</p>
                    <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                        {testimonials.map((testimonial, index) => (
                            <article key={index} className="rounded-lg sm:rounded-2xl md:rounded-[2rem] border border-mint bg-mint-light p-4 sm:p-6 shadow-sm hover:shadow-md transition">
                                <div className="flex items-start justify-between gap-3 sm:gap-4">
                                    <div className="flex-1">
                                        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-text-dark">{testimonial.name}</h2>
                                        <p className="text-xs sm:text-sm text-accent mt-1">{Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                                            <span key={starIndex} className="mr-0.5">⭐</span>
                                        ))}</p>
                                    </div>
                                </div>
                                <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-text-light">{testimonial.text}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 sm:gap-6">
                    {deliveredOrders.map((order, index) => (
                        <figure key={index} className="card-soft overflow-hidden bg-white/95 p-0 hover:shadow-glow transition">
                            <img src={order.image} alt={order.alt} className="h-48 sm:h-60 md:h-72 w-full object-cover" />
                            <figcaption className="rounded-b-lg sm:rounded-b-2xl md:rounded-b-[2rem] border-t border-mint bg-mint-light px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-medium text-text-dark">
                                {order.title}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </section>
    );
}
