import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const productCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().nonnegative(),
  currency: z.string().default("USD"),
  stock: z.number().int().nonnegative().default(1),
  tags: z.array(z.string()).optional(),
  images: z.array(z.object({ 
    url: z.string(), 
    alt: z.string().optional() 
  })).min(1),
  materials: z.array(z.string()).optional(),
});

export const cartPriceSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    qty: z.number().int().min(1),
  })),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string()
  }).optional()
});

export const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string().min(10),
});