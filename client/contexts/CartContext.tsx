import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '@shared/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const initialState: CartState = {
  items: [],
  isOpen: false,
  itemCount: 0,
  subtotal: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.productId === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          quantity,
        }];
      }
      
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((total, item) => total + item.quantity, 0),
        subtotal: calculateSubtotal(newItems),
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.productId !== action.payload.productId);
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((total, item) => total + item.quantity, 0),
        subtotal: calculateSubtotal(newItems),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId } });
      }
      
      const newItems = state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((total, item) => total + item.quantity, 0),
        subtotal: calculateSubtotal(newItems),
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    
    default:
      return state;
  }
}

function calculateSubtotal(items: CartItem[]): number {
  // Note: In a real app, you'd fetch product prices here
  // For now, we'll return 0 and calculate in components with product data
  return 0;
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Restore cart items
        parsedCart.items?.forEach((item: CartItem) => {
          // In a real app, you'd fetch the product and add it
          // For now, we'll just restore the items as-is
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
