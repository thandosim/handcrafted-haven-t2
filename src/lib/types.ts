import { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
  sub: string;
  role: string;
}

export interface Product {
  _id: string;
  sellerId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  images: Array<{ url: string; alt?: string }>;
  stock: number;
  tags: string[];
  materials: string[];
  status: "draft" | "active" | "suspended";
  ratingAvg: number;
  ratingCount: number;
  ratingSum: number;
  createdAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: "buyer" | "seller" | "admin";
  avatar?: string;
  cart: CartItem[];
  createdAt: Date;
}

export interface CartItem {
  productId: string | Product;
  qty: number;
  addedAt: Date;
}

export interface Order {
  _id: string;
  buyerId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment: {
    provider: string;
    intentId?: string;
    status: "pending" | "succeeded" | "failed";
  };
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: Date;
}

export interface OrderItem {
  productId: string | Product;
  qty: number;
  price: number;
  title: string;
}

export interface Review {
  _id: string;
  productId: string;
  authorId: string;
  rating: number;
  text: string;
  isVerifiedBuyer: boolean;
  moderatedStatus: "pending" | "approved" | "rejected";
  createdAt: Date;
}