
export type Product = {
  _id: string;
  sellerId: string;
  title: string;
  slug: string;
  description: string;
  materials: string[];
  category: string;
  tags: string[];
  price: number;
  currency: string;
  images: Array<{
    url: string;
    alt: string;
  }>;
  stock: number;
  variants: Array<{
    name: string;
    options: string[];
  }>;
  status: string;
  ratingAvg: number;
  ratingCount: number;
  createdAt: string;
};

export interface Seller {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  cart: [{
    productId: string;
    qty: string;
    addedAt: string;
  }];
  createdAt: number;
}