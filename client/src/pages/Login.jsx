import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.name || !form.email) {
            setError('Please enter your name and email to log in.');
            return;
        }

        setError('');
        setSaving(true);

        login(form);
        setSaving(false);
        navigate('/checkout');
    };

    return (
        <section className="py-10 md:py-16">
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-mint bg-white/95 p-8 shadow-glow md:p-10">
                <div className="mb-8">
                    <p className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">Login (optional)</p>
                    <h1 className="mt-3 text-3xl font-semibold text-text-dark">Welcome back</h1>
                    <p className="mt-4 text-sm leading-7 text-text-light">
                        Logging in is optional. Use this only if you want to save your name, email, and phone number for a faster checkout experience.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="space-y-2 text-sm font-medium text-text-light">
                        Full Name*
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-mint bg-mint-light px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                    </label>

                    <label className="space-y-2 text-sm font-medium text-text-light">
                        Email Address*
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-mint bg-mint-light px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                    </label>

                    <label className="space-y-2 text-sm font-medium text-text-light">
                        Mobile Number
                        <input
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-mint bg-mint-light px-4 py-3 text-sm text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                    </label>

                    {error && <p className="rounded-[1.75rem] bg-accent/10 px-4 py-3 text-sm text-accent">{error}</p>}

                    <button type="submit" className="btn-primary w-full" disabled={saving}>
                        {saving ? 'Saving…' : 'Login and continue'}
                    </button>
                </form>
            </div>
        </section>
    );
}
