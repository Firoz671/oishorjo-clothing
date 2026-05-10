import { createContext, useContext, useEffect, useReducer } from 'react';
import cartService from '../api/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isLoading: false,
  });
  const { isAuthenticated } = useAuth();

  // Load cart on auth change
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Load guest cart from localStorage
      const guestCart = JSON.parse(
        localStorage.getItem('oishorjo_guest_cart') || '[]'
      );
      dispatch({ type: 'SET_CART', payload: guestCart });
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await cartService.getCart();
      if (res.success) {
        dispatch({ type: 'SET_CART', payload: res.data });
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (product_id, size, quantity = 1) => {
    if (isAuthenticated) {
      const res = await cartService.addToCart(product_id, size, quantity);
      if (res.success) await fetchCart();
    } else {
      // Guest cart - save to localStorage
      const guestCart = JSON.parse(
        localStorage.getItem('oishorjo_guest_cart') || '[]'
      );
      const existing = guestCart.find(
        (i) => i.product_id === product_id && i.size === size
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        guestCart.push({ product_id, size, quantity });
      }
      localStorage.setItem('oishorjo_guest_cart', JSON.stringify(guestCart));
      dispatch({ type: 'SET_CART', payload: guestCart });
    }
  };

  const removeItem = async (id) => {
    if (isAuthenticated) {
      await cartService.removeItem(id);
      await fetchCart();
    } else {
      const guestCart = JSON.parse(
        localStorage.getItem('oishorjo_guest_cart') || '[]'
      ).filter((_, index) => index !== id);
      localStorage.setItem('oishorjo_guest_cart', JSON.stringify(guestCart));
      dispatch({ type: 'SET_CART', payload: guestCart });
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      await cartService.clearCart();
    } else {
      localStorage.removeItem('oishorjo_guest_cart');
    }
    dispatch({ type: 'CLEAR' });
  };

  const cartCount = state.items.reduce(
    (total, item) => total + (item.quantity || 1), 0
  );

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, clearCart, cartCount, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
