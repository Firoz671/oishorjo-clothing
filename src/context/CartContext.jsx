import { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItemIndex >= 0) {
        const newState = [...state];
        newState[existingItemIndex].quantity += 1;
        return newState;
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(
        item => !(item.id === action.payload.id && item.size === action.payload.size)
      );
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        (item.id === action.payload.id && item.size === action.payload.size)
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem('oishorjo_cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('oishorjo_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, size } });
  };

  const removeFromCart = (id, size) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
