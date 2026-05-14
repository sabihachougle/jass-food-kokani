import { useCart } from '../context/CartContext';

export default function Notification() {
    const { notification } = useCart();

    if (!notification) return null;

    return (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white shadow-lg toast-animation">
            <span>✓</span>
            <span>{notification}</span>
        </div>
    );
}
