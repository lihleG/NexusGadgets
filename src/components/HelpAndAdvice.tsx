import React from "react";

const HelpAndAdvice: React.FC = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, debit cards, EFT, and mobile payments like SnapScan. All transactions are secured and encrypted.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is dispatched, you'll receive an email with tracking details. You can also track your order in the 'My Orders' section of your account.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 14-day return policy for unused and unopened items. Please contact our support team to initiate a return.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can be canceled within 24 hours of placing them. After that, cancellations may not be possible if the order is already shipped.",
    },
    {
      question: "Do you offer warranties?",
      answer:
        "Yes, all electronic products come with a 1-year warranty. Some brands offer extended warranties, which will be specified on the product page.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Help & Advice
      </h1>

      <section className="mb-16 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Delivery & Shipping Times</h2>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <p className="text-lg text-gray-700">
            Customers can expect their orders within <strong>2-5 working days</strong>. Delivery
            times may vary based on your location and product availability. You will receive a
            confirmation email with tracking details once your order is shipped.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HelpAndAdvice;
