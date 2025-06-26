import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51NQv6yJNXVuylq7dD4Y8jqPbpplv4eBB6lzWcseYy5O7myntUl8rIduRIkBOpSUDUYh7BquKJJUGtfsgoC6proQW00OZ2SMGFf");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    setLoading(true);

    // 1. Create Payment Method from card info
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setErrorMessage(paymentMethodError.message || "Payment method creation failed.");
      setLoading(false);
      return;
    }

    try {
      // 2. Send paymentMethod.id and amount to backend to create PaymentIntent
      const response = await fetch("http://localhost:4000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 5000,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed on server");
      }

      // 3. Payment successful
      setSuccessMessage("Payment successful! Thank you for your purchase.");
    } catch (error: any) {
      setErrorMessage(error.message || "Payment failed.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg p-6 rounded-md space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold text-gray-800">Payment Information</h2>
      <CardElement className="p-2 border border-gray-300 rounded-md text-gray-800" />
      
      {errorMessage && (
        <div className="text-red-600 font-medium">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-600 font-medium">{successMessage}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-2 rounded-md font-semibold transition ${
          loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-500 text-white"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripePayment;

