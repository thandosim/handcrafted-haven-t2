
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
  userId: string;
  displayName: string;
  imageUrl: string;
  bio: string;
  story: string;
  socialLinks: {
    ig: string;
    fb: string;
    web: string;
  };
  badges: string[];
  ratingAvg: number;
  ratingCount: number;
}