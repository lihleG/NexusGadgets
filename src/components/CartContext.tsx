// cartContext.tsx

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type Product = {
  id: number;
  name: string;
  price: number;
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
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: Product[] };

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  getExpectedDelivery: () => string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const SHIPPING_COST = 99;
const VAT_RATE = 0.15;
const CART_STORAGE_KEY = "nexus-gadgets-cart";

const calculateCart = (items: Product[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const tax = subtotal * VAT_RATE;
  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + tax + shipping;

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
};

const createCartState = (items: Product[]): CartState => ({
  items,
  ...calculateCart(items),
});

const initialCartState: CartState = createCartState([]);

const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      const updatedItems = existingItem
        ? state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      return createCartState(updatedItems);
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );

      return createCartState(updatedItems);
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      if (!Number.isInteger(quantity) || quantity < 1) {
        return state;
      }

      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      return createCartState(updatedItems);
    }

    case "CLEAR_CART":
      return initialCartState;

    case "LOAD_CART":
      return createCartState(action.payload);

    default:
      return state;
  }
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Restore the cart when the application loads.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart: Product[] = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          const validItems = parsedCart.filter(
            (item) =>
              Number.isInteger(item.id) &&
              typeof item.name === "string" &&
              typeof item.price === "number" &&
              Number.isFinite(item.price) &&
              item.price >= 0 &&
              typeof item.image === "string" &&
              Number.isInteger(item.quantity) &&
              (item.quantity ?? 0) > 0
          );

          dispatch({
            type: "LOAD_CART",
            payload: validItems,
          });
        }
      }
    } catch (error) {
      console.error("Could not restore cart:", error);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Save cart changes.
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const getExpectedDelivery = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);

    return deliveryDate.toLocaleDateString("en-ZA", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <CartContext.Provider
      value={{ state, dispatch, getExpectedDelivery }}
    >
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
