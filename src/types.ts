// src/chatbot/types.ts

// Existing Product interface remains unchanged
export interface Product {
  category: string;
  subtitle: string;
  name: string;
  price: string;
}

// New chat interface types
export interface ChatState {
  messages: ChatMessage[];
  widget?: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  type: "bot" | "user";
  timestamp: Date;
  widget?: string;
}