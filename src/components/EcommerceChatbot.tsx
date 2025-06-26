import React from 'react';
import ChatBot from 'react-simple-chatbot';

const steps = [
  {
    id: '1',
    message: 'Hi there! I’m Linda, your shopping assistant. What would you like to know?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'products', label: 'Show me products', trigger: 'products' },
      { value: 'shipping', label: 'Shipping info', trigger: 'shipping' },
      { value: 'support', label: 'Contact support', trigger: 'support' },
      { value: 'hours', label: 'Store hours', trigger: 'hours' },
    ],
  },
  {
    id: 'products',
    message:
      'We have a wide range of electronics, smartphones, laptops, and more! Would you like to explore specific categories?',
    trigger: 'category-query',
  },
  {
    id: 'category-query',
    options: [
      { value: 'smartphones', label: 'Smartphones', trigger: 'smartphones' },
      { value: 'laptops', label: 'Laptops', trigger: 'laptops' },
      { value: 'accessories', label: 'Accessories', trigger: 'accessories' },
    ],
  },
  {
    id: 'smartphones',
    message:
      'We have the latest smartphones from brands like Samsung, Apple, and Huawei. Visit our smartphone page for more details!',
    trigger: 'options',
  },
  {
    id: 'laptops',
    message:
      'Looking for laptops? We offer gaming laptops, ultrabooks, and more. Visit our laptop section to explore!',
    trigger: 'options',
  },
  {
    id: 'accessories',
    message:
      'Need accessories like chargers, cases, or headphones? Check out our accessories section!',
    trigger: 'options',
  },
  {
    id: 'shipping',
    message:
      'We offer free shipping for orders over R1000, and delivery takes 1-3 days. Would you like to track an order?',
    trigger: 'order-tracking-query',
  },
  {
    id: 'order-tracking-query',
    options: [
      { value: 'yes', label: 'Yes', trigger: 'order-tracking' },
      { value: 'no', label: 'No', trigger: 'options' },
    ],
  },
  {
    id: 'order-tracking',
    message:
      'Please provide your order ID, and I will assist you with the tracking.',
    end: true,
  },
  {
    id: 'support',
    message:
      'You can reach our support team at NexusGadgets@support.com or call 011-456-1789. Would you like to leave feedback?',
    trigger: 'feedback-query',
  },
  {
    id: 'feedback-query',
    options: [
      { value: 'yes', label: 'Yes', trigger: 'feedback' },
      { value: 'no', label: 'No', trigger: 'options' },
    ],
  },
  {
    id: 'feedback',
    message:
      'Thank you! Please email us at feedback@nexusgadgets.com or fill out our feedback form online.',
    trigger: 'options',
  },
  {
    id: 'hours',
    message:
      'Our store is open Mon-Fri, 9am to 6pm. Would you like directions to our store?',
    trigger: 'directions-query',
  },
  {
    id: 'directions-query',
    options: [
      { value: 'yes', label: 'Yes', trigger: 'directions' },
      { value: 'no', label: 'No', trigger: 'options' },
    ],
  },
  {
    id: 'directions',
    message:
      'We are located at 123 Tech Avenue, Sandton, Johannesburg. Check us out on Google Maps!',
    trigger: 'options',
  },
];

const EcommerceChatbot: React.FC = () => {
  return (
    <ChatBot
      steps={steps}
      floating={true}
      headerTitle="Linda - Shopping Assistant"
      botAvatar="/assets/Linda.png"
      placeholder="Ask Linda something..."
      enableSmoothScroll={true}
      clearOnRestart={true} // optional but helpful
    />
  );
};

export default EcommerceChatbot;




