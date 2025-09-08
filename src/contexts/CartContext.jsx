import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import { orderAPI } from '../api/orderAPI';

export const CartContext = createContext();

const CART_KEY = 'cart';

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { data } = await orderAPI.getMyOrders();
        const latest = data[0];
        if (latest && latest.items.length) setItems(latest.items);
      } catch {}
    })();
  }, [user]);

  const addToCart = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const exist = prev.find((x) => x._id === product._id);
      if (exist) {
        const updated = { ...exist, qty: Math.min(exist.qty + qty, product.stock) };
        return prev.map((x) => (x._id === product._id ? updated : x));
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) => prev.map((x) => (x._id === id ? { ...x, qty: Math.min(Math.max(qty, 1), x.stock) } : x)));
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((x) => x._id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);

  const value = { cartItems: items, addToCart, updateQty, removeFromCart, clearCart, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = { children: PropTypes.node.isRequired };
