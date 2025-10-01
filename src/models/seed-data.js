import mongoose from "mongoose"; 
export const sellerIds = Array.from({ length: 8 }, () => new mongoose.Types.ObjectId());

const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Thando Simelane",
    email: "thando@example.com",
    role: "seller",
    avatar: "https://example.com/avatar.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Lindiwe Dlamini",
    email: "lindiwe@example.com",
    role: "buyer",
    avatar: "https://example.com/avatar2.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sipho Mthembu",
    email: "sipho@example.com",
    role: "buyer",
    avatar: "https://example.com/avatar3.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
const sellers = [
  {
    _id: sellerIds[0],
    name: "Artisan Collective",
    email: "collective@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/collective.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: sellerIds[1],
    name: "Clay & Canvas",
    email: "claycanvas@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/claycanvas.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: sellerIds[2],
    name: "Thread & Needle",
    email: "threadneedle@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/threadneedle.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: sellerIds[3],
    name: "Woodworks Studio",
    email: "woodworks@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/woodworks.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: sellerIds[4],
    name: "Bead & Bloom",
    email: "beadbloom@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/beadbloom.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: sellerIds[5],
    name: "The Indigo Studio",
    email: "indigostudio@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/indigo.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: sellerIds[6],
    name: "EcoCrafts",
    email: "ecocrafts@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/ecocrafts.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: sellerIds[7],
    name: "Boho Bazaar",
    email: "bohobazaar@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/boho.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const products = [
  {
    sellerId: sellerIds[0],
    title: "Handwoven Basket",
    slug: "handwoven-basket",
    description: "A beautifully crafted basket made from natural fibers.",
    price: 350.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/basket.jpg", alt: "Handwoven basket" }],
    stock: 15,
    tags: ["basket", "handmade", "eco-friendly"],
    materials: ["grass", "bamboo"],
    status: "active",
    ratingAvg: 4.8,
    ratingCount: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[1],
    title: "Ceramic Mug Set",
    slug: "ceramic-mug-set",
    description: "Set of 4 hand-glazed ceramic mugs with earthy tones.",
    price: 120.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/mugs.jpg", alt: "Ceramic mugs" }],
    stock: 20,
    tags: ["ceramic", "kitchenware", "handmade"],
    materials: ["clay", "glaze"],
    status: "active",
    ratingAvg: 4.6,
    ratingCount: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[2],
    title: "Macrame Wall Hanging",
    slug: "macrame-wall-hanging",
    description: "Boho-style macrame wall art made with natural cotton rope.",
    price: 180.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/macrame.jpg", alt: "Macrame wall hanging" }],
    stock: 10,
    tags: ["macrame", "wall-art", "boho"],
    materials: ["cotton", "wood"],
    status: "active",
    ratingAvg: 4.9,
    ratingCount: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[3],
    title: "Leather Journal",
    slug: "leather-journal",
    description: "Hand-stitched leather journal with recycled paper pages.",
    price: 95.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/journal.jpg", alt: "Leather journal" }],
    stock: 25,
    tags: ["stationery", "leather", "handmade"],
    materials: ["leather", "paper"],
    status: "active",
    ratingAvg: 4.7,
    ratingCount: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[4],
    title: "Beaded Necklace",
    slug: "beaded-necklace",
    description: "Colorful beaded necklace inspired by traditional African designs.",
    price: 60.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/necklace.jpg", alt: "Beaded necklace" }],
    stock: 30,
    tags: ["jewelry", "beads", "cultural"],
    materials: ["glass beads", "thread"],
    status: "active",
    ratingAvg: 4.5,
    ratingCount: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[5],
    title: "Wooden Toy Set",
    slug: "wooden-toy-set",
    description: "Eco-friendly wooden toy set for toddlers.",
    price: 75.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/toys.jpg", alt: "Wooden toys" }],
    stock: 18,
    tags: ["toys", "wood", "eco-friendly"],
    materials: ["wood", "non-toxic paint"],
    status: "active",
    ratingAvg: 4.4,
    ratingCount: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[6],
    title: "Hand-painted Canvas",
    slug: "hand-painted-canvas",
    description: "Original abstract painting on stretched canvas.",
    price: 300.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/canvas.jpg", alt: "Abstract painting" }],
    stock: 5,
    tags: ["art", "canvas", "painting"],
    materials: ["canvas", "acrylic paint"],
    status: "active",
    ratingAvg: 4.9,
    ratingCount: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[7],
    title: "Crochet Blanket",
    slug: "crochet-blanket",
    description: "Soft handmade crochet blanket in pastel colors.",
    price: 220.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/blanket.jpg", alt: "Crochet blanket" }],
    stock: 12,
    tags: ["blanket", "crochet", "cozy"],
    materials: ["yarn", "cotton"],
    status: "active",
    ratingAvg: 4.8,
    ratingCount: 11,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[0],
    title: "Hand-carved Spoon Set",
    slug: "hand-carved-spoon-set",
    description: "Set of 3 hand-carved wooden spoons for cooking or serving.",
    price: 45.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/spoons.jpg", alt: "Wooden spoons" }],
    stock: 40,
    tags: ["kitchen", "wood", "handmade"],
    materials: ["wood"],
    status: "active",
    ratingAvg: 4.6,
    ratingCount: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[1],
    title: "Woven Coasters",
    slug: "woven-coasters",
    description: "Set of 6 woven coasters made from sisal and raffia.",
    price: 35.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/coasters.jpg", alt: "Woven coasters" }],
    stock: 50,
    tags: ["home", "woven", "eco-friendly"],
    materials: ["sisal", "raffia"],
    status: "active",
    ratingAvg: 4.3,
    ratingCount: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[2],
    title: "Hand-dyed Scarf",
    slug: "hand-dyed-scarf",
    description: "Lightweight scarf dyed using natural indigo techniques.",
    price: 80.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/scarf.jpg", alt: "Indigo scarf" }],
    stock: 22,
    tags: ["fashion", "scarf", "natural dye"],
    materials: ["cotton", "indigo"],
    status: "active",
    ratingAvg: 4.7,
    ratingCount: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    sellerId: sellerIds[3],
    title: "Clay Plant Pot",
    slug: "clay-plant-pot",
    description: "Rustic clay pot perfect for indoor plants.",
    price: 55.0,
    currency: "USD",
    images: [{ url: "https://example.com/images/plant-pot.jpg", alt: "Clay plant pot" }],
    stock: 35,
    tags: ["garden", "clay", "decor"],
    materials: ["clay"],
    status: "active",
    ratingAvg: 4.5,
    ratingCount: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];


const cartData = [
  {
    _id: "cart001",
    userId: "user001",
    items: [
      {
        productId: "prod003",
        qty: 2,
        addedAt: new Date("2025-09-24T18:30:00Z")
      },
      {
        productId: "prod007",
        qty: 1,
        addedAt: new Date("2025-09-24T18:32:00Z")
      }
    ],
    updatedAt: new Date("2025-09-24T18:45:00Z")
  },
  {
    _id: "cart002",
    userId: "user002",
    items: [
      {
        productId: "prod005",
        qty: 3,
        addedAt: new Date("2025-09-24T19:10:00Z")
      },
      {
        productId: "prod010",
        qty: 4,
        addedAt: new Date("2025-09-24T19:12:00Z")
      },
      {
        productId: "prod001",
        qty: 1,
        addedAt: new Date("2025-09-24T19:15:00Z")
      }
    ],
    updatedAt: new Date("2025-09-24T19:20:00Z")
  }
];

const orderData = {
  _id: "order003",
  buyerId: "user003",
  items: [
    {
      productId: "prod002",
      qty: 2,
      price: 120.0,
      title: "Ceramic Mug Set"
    },
    {
      productId: "prod006",
      qty: 1,
      price: 75.0,
      title: "Wooden Toy Set"
    },
    {
      productId: "prod011",
      qty: 3,
      price: 80.0,
      title: "Hand-dyed Scarf"
    }
  ],
  total: 555.0,
  status: "pending",
  payment: {
    provider: "stripe",
    intentId: "pi_abc123xyz",
    status: "pending"
  },
  shippingAddress: {
    street: "45 Artisan Lane",
    city: "Mbabane",
    state: "Hhohho",
    zip: "H100",
    country: "Eswatini"
  },
  createdAt: new Date("2025-09-24T20:55:00Z"),
  updatedAt: new Date("2025-09-24T20:55:00Z")
};

const reviewData = [
  {
    _id: new mongoose.Types.ObjectId(),
    productId: products.find(p => p.slug === "macrame-wall-hanging")?._id,
    userId: users[0]._id,
    rating: 5,
    text: "Absolutely stunning macrame piece. The craftsmanship is top-notch!",
    moderatedStatus: "approved",
    createdAt: new Date("2025-09-24T21:00:00Z"),
    updatedAt: new Date("2025-09-24T21:00:00Z")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    productId: products.find(p => p.slug === "hand-painted-canvas")?._id,
    userId: users[1]._id,
    rating: 4,
    text: "Beautiful painting, though the colors were slightly different from the photos.",
    moderatedStatus: "approved",
    createdAt: new Date("2025-09-24T21:05:00Z"),
    updatedAt: new Date("2025-09-24T21:05:00Z")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    productId: products.find(p => p.slug === "ceramic-mug-set")?._id,
    userId: users[2]._id,
    rating: 5,
    text: "These ceramic mugs are gorgeous and feel great in hand. Highly recommend!",
    moderatedStatus: "approved",
    createdAt: new Date("2025-09-24T21:10:00Z"),
    updatedAt: new Date("2025-09-24T21:10:00Z")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    productId: products.find(p => p.slug === "woven-coasters")?._id,
    userId: users[1]._id,
    rating: 3,
    text: "Nice coasters, but they fray a bit after a few uses.",
    moderatedStatus: "pending",
    createdAt: new Date("2025-09-24T21:15:00Z"),
    updatedAt: new Date("2025-09-24T21:15:00Z")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    productId: products.find(p => p.slug === "wooden-toy-set")?._id,
    userId: users[2]._id,
    rating: 4,
    text: "My toddler loves these wooden toys. Great quality and safe materials.",
    moderatedStatus: "approved",
    createdAt: new Date("2025-09-24T21:20:00Z"),
    updatedAt: new Date("2025-09-24T21:20:00Z")
  }
];



export { users, sellers, products, cartData, orderData, reviewData };

