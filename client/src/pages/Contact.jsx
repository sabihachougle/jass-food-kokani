import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

function useRuntimeConfig() {
    const [config, setConfig] = useState({ contactRecipient: '', contactCc: '' });

    useEffect(() => {
        let mounted = true;
        fetch(`${API_BASE}/api/config`)
            .then((r) => r.ok ? r.json() : null)
            .then((data) => {
                if (!mounted || !data) return;
                setConfig({ contactRecipient: data.contactRecipient || '', contactCc: data.contactCc || '' });
            })
            .catch(() => { });
        return () => { mounted = false; };
    }, []);

    return config;
}

export default function Contact() {
    const { contactRecipient, contactCc } = useRuntimeConfig();
    const [contact, setContact] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [contactStatus, setContactStatus] = useState('');
    const [contactError, setContactError] = useState('');
    const [contactLoading, setContactLoading] = useState(false);

    const handleContactChange = (event) => {
        const { name, value } = event.target;
        setContact((current) => ({ ...current, [name]: value }));
    };

    const handleContactSubmit = async (event) => {
        event.preventDefault();
        setContactError('');
        setContactStatus('');

        if (!contact.name || !contact.email || !contact.message) {
            setContactError('Please provide your name, email, and query message.');
            return;
        }

        setContactLoading(true);

        try {
            await axios.post(`${API_BASE}/api/contact`, contact);
            setContactStatus('Your message has been sent successfully. We will get back to you soon.');
            setContact({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            setContactError(error.response?.data?.message || 'Unable to send your message right now. Please try again later.');
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <section className="py-6 sm:py-10 md:py-16">
            <section className="card-soft bg-gradient-to-br from-mint-light/80 via-white to-mint-light p-4 sm:p-6 md:p-8">
                <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-text-light font-medium">📞 Contact</p>
                <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 md:grid-cols-[1.05fr_1.3fr]">
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-xl sm:text-2xl font-semibold text-text-dark">Jass Food & Kokani Delicacies</h3>
                        <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-text-light">Home-based Kokani sweets business accepting orders online. Fresh, handmade, and lovingly prepared.</p>
                        <div className="rounded-lg sm:rounded-2xl md:rounded-[1.75rem] border border-mint bg-white/80 p-4 sm:p-6 text-xs sm:text-sm text-text-light shadow-sm">
                            <p className="font-semibold text-text-dark">📧 Contact emails</p>
                            <p className="mt-3"><strong>Primary:</strong> <span className="break-all">{contactRecipient}</span></p>
                            <p className="mt-1"><strong>Alternate:</strong> <span className="break-all">{contactCc}</span></p>
                        </div>
                        <p className="text-xs sm:text-sm text-text-light">Use the form to tell us who is trying to contact and what you need help with.</p>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 rounded-lg sm:rounded-2xl md:rounded-[1.75rem] border border-mint bg-white/95 p-4 sm:p-6 md:p-6 shadow-glow">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-text-dark">To</label>
                            <input
                                type="text"
                                value={`${contactRecipient}, ${contactCc}`}
                                readOnly
                                className="mt-2 w-full rounded-2xl sm:rounded-3xl border border-mint bg-mint-light px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-dark outline-none"
                            />
                        </div>

                        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                            <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-dark">
                                Your Name
                                <input
                                    name="name"
                                    value={contact.name}
                                    onChange={handleContactChange}
                                    required
                                    className="w-full rounded-2xl sm:rounded-3xl border border-mint bg-mint-light px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </label>
                            <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-dark">
                                Your Email
                                <input
                                    name="email"
                                    type="email"
                                    value={contact.email}
                                    onChange={handleContactChange}
                                    required
                                    className="w-full rounded-2xl sm:rounded-3xl border border-mint bg-mint-light px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </label>
                        </div>

                        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                            <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-dark">
                                Phone
                                <input
                                    name="phone"
                                    type="tel"
                                    value={contact.phone}
                                    onChange={handleContactChange}
                                    className="w-full rounded-2xl sm:rounded-3xl border border-mint bg-mint-light px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </label>
                            <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-dark">
                                Subject
                                <input
                                    name="subject"
                                    value={contact.subject}
                                    onChange={handleContactChange}
                                    className="w-full rounded-2xl sm:rounded-3xl border border-mint bg-mint-light px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </label>
                        </div>

                        <label className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-medium text-text-dark">
                            Your Query
                            <textarea
                                name="message"
                                value={contact.message}
                                onChange={handleContactChange}
                                rows="4"
                                required
                                className="w-full rounded-2xl sm:rounded-3xl border border-mint bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </label>

                        {contactError && <p className="rounded-lg sm:rounded-2xl md:rounded-[1.75rem] bg-red-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-red-700 leading-relaxed">{contactError}</p>}
                        {contactStatus && <p className="rounded-lg sm:rounded-2xl md:rounded-[1.75rem] bg-green-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-emerald-700 leading-relaxed">{contactStatus}</p>}

                        <button type="submit" className="btn-primary w-full text-xs sm:text-sm px-4 py-2 sm:py-3" disabled={contactLoading}>
                            {contactLoading ? '⏳ Sending…' : '📮 Send Message'}
                        </button>
                        <p className="mt-2 text-center text-xs sm:text-sm text-text-light leading-relaxed">You will receive a confirmation email with your query details after submission.</p>
                    </form>
                </div>
            </section>
        </section>
    );
}
