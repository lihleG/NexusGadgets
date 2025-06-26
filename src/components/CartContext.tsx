// cartContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";

type Product = {
  id: number;
  name: string;
  price: number; // String representation of price with commas
  image: string;
  quantity?: number;
};

type CartState = {
  items: Product[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  getExpectedDelivery: () => string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCartState: CartState = {
  items: [],
  subtotal: 0,
  shipping: 99, // Fixed shipping cost
  tax: 0,
  total: 0,
};

const calculateCart = (items: Product[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const tax = subtotal * 0.15;
  const total = subtotal + tax + initialCartState.shipping;
  
  return { subtotal, tax, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      return { ...state, ...calculateCart(updatedItems), items: updatedItems };
    }
    
    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return { ...state, ...calculateCart(updatedItems), items: updatedItems };
    }
    
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity < 1) return state;
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return { ...state, ...calculateCart(updatedItems), items: updatedItems };
    }
    
    case "CLEAR_CART":
      return initialCartState;
      
    default:
      return state;
  }
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  
  const getExpectedDelivery = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Ship in 1 day
    const deliveryDate = new Date(today);
    deliveryDate.setDate(deliveryDate.getDate() + 3); // Delivery in 3 days
    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, getExpectedDelivery }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};