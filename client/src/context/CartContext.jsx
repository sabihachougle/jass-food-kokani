import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext();

const initialCart = [];

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const addItem = (product, quantity) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...current, { ...product, quantity }];
    });
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const updateQuantity = (id, quantity) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity } : item).filter((item) => item.quantity > 0));
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems(initialCart);
  const toggleCart = () => setIsOpen((value) => !value);
  const closeCart = () => setIsOpen(false);

  const summary = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems, totalPrice };
  }, [items]);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, isOpen, toggleCart, closeCart, notification, showNotification, ...summary }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
