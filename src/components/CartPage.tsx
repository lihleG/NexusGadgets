import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import { useToast } from "./ToastContext"; // Add this import
import OrderForm from "./OrderForm"; // Import the OrderForm component
import StripePayment from "./StripePayment"; // Import the StripePayment component

const CartPage = () => {
  const { state, dispatch, getExpectedDelivery } = useCart();
  const { items, subtotal, shipping, tax, total } = state;
  const { showToast } = useToast(); // Add this for notifications

  const [step, setStep] = useState<"cart" | "orderInfo" | "payment">("cart");
  const [orderInfo, setOrderInfo] = useState<any>(null);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    showToast("Item removed from cart", "success");
  };

  const handleOrderInfoSubmit = (data: any) => {
    setOrderInfo(data);
    setStep("payment");
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {step === "cart" && (
        <>
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
          {items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl mb-4">Your cart is empty</p>
              <Link
                to="/"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center border-b py-6"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-contain mr-6"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-purple-600 font-bold mt-2">
                        R {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0">
                      <button
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-l"
                      >
                        -
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center bg-gray-100">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-r"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-6 rounded-lg h-fit">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>R {shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (15%)</span>
                    <span>R {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t">
                    <span>Total</span>
                    <span>R {total.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep("orderInfo")}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: "CLEAR_CART" });
                    showToast("Cart cleared successfully", "success");
                  }}
                  className="w-full mt-4 text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {step === "orderInfo" && (
        <OrderForm onSubmit={handleOrderInfoSubmit} />
      )}

      {step === "payment" && (
        <StripePayment />
      )}
    </div>
  );
};

export default CartPage;
