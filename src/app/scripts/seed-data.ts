import "dotenv/config";
import mongoose, { Types } from "mongoose";
import { config } from "@/lib/config";
import User from "@/models/User";
import Product from "@/models/Products";
import Order from "@/models/Order";
import Review from "@/models/Review";

// Use the config system which already validates the URI
const MONGODB_URI = config.mongodbUri;

// Connect to MongoDB and log the database name
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.name}`);
    console.log(`🔗 Using URI: ${MONGODB_URI}`);
    return conn.connection;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

// Pre-generate IDs so references line up
const user1Id = new Types.ObjectId();
const user2Id = new Types.ObjectId();
const user3Id = new Types.ObjectId();

// Seller IDs
const seller1Id = new Types.ObjectId();
const seller2Id = new Types.ObjectId();
const seller3Id = new Types.ObjectId();
const seller4Id = new Types.ObjectId();
const seller5Id = new Types.ObjectId();
const seller6Id = new Types.ObjectId();
const seller7Id = new Types.ObjectId();
const seller8Id = new Types.ObjectId();

// Product IDs
const prod1Id = new Types.ObjectId();
const prod2Id = new Types.ObjectId();
const prod3Id = new Types.ObjectId();
const prod4Id = new Types.ObjectId();
const prod5Id = new Types.ObjectId();
const prod6Id = new Types.ObjectId();
const prod7Id = new Types.ObjectId();
const prod8Id = new Types.ObjectId();
const prod9Id = new Types.ObjectId();
const prod10Id = new Types.ObjectId();
const prod11Id = new Types.ObjectId();
const prod12Id = new Types.ObjectId();

// Users (buyers)
const users = [
  {
    _id: user1Id,
    name: "Thando Simelane",
    email: "thando@example.com",
    role: "buyer",
    avatar: "https://example.com/avatar.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: user2Id,
    name: "Lindiwe Dlamini",
    email: "lindiwe@example.com",
    role: "buyer",
    avatar: "https://example.com/avatar2.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: user3Id,
    name: "Sipho Mthembu",
    email: "sipho@example.com",
    role: "buyer",
    avatar: "https://example.com/avatar3.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Sellers
const sellers = [
  {
    _id: seller1Id,
    name: "Artisan Collective",
    email: "collective@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/collective.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: seller2Id,
    name: "Clay & Canvas",
    email: "claycanvas@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/claycanvas.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: seller3Id,
    name: "Thread & Needle",
    email: "threadneedle@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/threadneedle.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: seller4Id,
    name: "Woodworks Studio",
    email: "woodworks@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/woodworks.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: seller5Id,
    name: "Bead & Bloom",
    email: "beadbloom@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/beadbloom.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: seller6Id,
    name: "The Indigo Studio",
    email: "indigostudio@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/indigo.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: seller7Id,
    name: "EcoCrafts",
    email: "ecocrafts@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/ecocrafts.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: seller8Id,
    name: "Boho Bazaar",
    email: "bohobazaar@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/boho.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Products with real Unsplash images
const products = [
  {
    _id: prod1Id,
    sellerId: seller1Id,
    title: "Handwoven Basket",
    slug: "handwoven-basket",
    description: "A beautifully crafted basket made from natural fibers.",
    price: 350.0,
    currency: "USD",
    images: [{ 
      url: "https://images.unsplash.com/photo-1568651909298-94932bbe9026?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Handwoven basket" 
    }],
    stock: 15,
    tags: ["basket", "handmade", "eco-friendly"],
    materials: ["grass", "bamboo"],
    status: "active",
    ratingAvg: 4.8,
    ratingCount: 12,
    ratingSum: 57.6,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod2Id,
    sellerId: seller2Id,
    title: "Ceramic Mug Set",
    slug: "ceramic-mug-set",
    description: "Set of 4 hand-glazed ceramic mugs with earthy tones.",
    price: 120.0,
    currency: "USD",
    images: [{ 
      url: "https://images.unsplash.com/photo-1495100497150-fe209c585f50?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Ceramic mugs" 
    }],
    stock: 20,
    tags: ["ceramic", "kitchenware", "handmade"],
    materials: ["clay", "glaze"],
    status: "active",
    ratingAvg: 4.6,
    ratingCount: 8,
    ratingSum: 36.8,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod3Id,
    sellerId: seller3Id,
    title: "Macrame Wall Hanging",
    slug: "macrame-wall-hanging",
    description: "Boho-style macrame wall art made with natural cotton rope.",
    price: 180.0,
    currency: "USD",
    images: [{ 
      url: "https://plus.unsplash.com/premium_photo-1661412814375-2f987e310e2c?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Macrame wall hanging" 
    }],
    stock: 10,
    tags: ["macrame", "wall-art", "boho"],
    materials: ["cotton", "wood"],
    status: "active",
    ratingAvg: 4.9,
    ratingCount: 15,
    ratingSum: 73.5,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod4Id,
    sellerId: seller4Id,
    title: "Leather Journal",
    slug: "leather-journal",
    description: "Hand-stitched leather journal with recycled paper pages.",
    price: 95.0,
    currency: "USD",
    images: [{ 
      url: "https://images.unsplash.com/photo-1677064061401-f77f966ff8a1?q=80&w=2685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Leather journal" 
    }],
    stock: 25,
    tags: ["stationery", "leather", "handmade"],
    materials: ["leather", "paper"],
    status: "active",
    ratingAvg: 4.7,
    ratingCount: 10,
    ratingSum: 47.0,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod5Id,
    sellerId: seller5Id,
    title: "Beaded Necklace",
    slug: "beaded-necklace",
    description: "Colorful beaded necklace inspired by traditional African designs.",
    price: 60.0,
    currency: "USD",
    images: [{ 
      url: "https://images.unsplash.com/photo-1742137189378-1788397cf778?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Beaded necklace" 
    }],
    stock: 30,
    tags: ["jewelry", "beads", "cultural"],
    materials: ["glass beads", "thread"],
    status: "active",
    ratingAvg: 4.5,
    ratingCount: 7,
    ratingSum: 31.5,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod6Id,
    sellerId: seller6Id,
    title: "Wooden Toy Set",
    slug: "wooden-toy-set",
    description: "Eco-friendly wooden toy set for toddlers.",
    price: 75.0,
    currency: "USD",
    images: [{ 
      url: "https://plus.unsplash.com/premium_photo-1702597749448-ba435d39d115?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Wooden toys" 
    }],
    stock: 18,
    tags: ["toys", "wood", "eco-friendly"],
    materials: ["wood", "non-toxic paint"],
    status: "active",
    ratingAvg: 4.4,
    ratingCount: 6,
    ratingSum: 26.4,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod7Id,
    sellerId: seller7Id,
    title: "Hand-painted Canvas",
    slug: "hand-painted-canvas",
    description: "Original abstract painting on stretched canvas.",
    price: 300.0,
    currency: "USD",
    images: [{ 
      url: "https://plus.unsplash.com/premium_photo-1667668222192-1b8755497ea2?q=80&w=2625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Abstract painting" 
    }],
    stock: 5,
    tags: ["art", "canvas", "painting"],
    materials: ["canvas", "acrylic paint"],
    status: "active",
    ratingAvg: 4.9,
    ratingCount: 9,
    ratingSum: 44.1,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod8Id,
    sellerId: seller8Id,
    title: "Crochet Blanket",
    slug: "crochet-blanket",
    description: "Soft handmade crochet blanket in pastel colors.",
    price: 220.0,
    currency: "USD",
    images: [{ 
      url: "https://plus.unsplash.com/premium_photo-1705346743803-f7e6c51d5438?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Crochet blanket" 
    }],
    stock: 12,
    tags: ["blanket", "crochet", "cozy"],
    materials: ["yarn", "cotton"],
    status: "active",
    ratingAvg: 4.8,
    ratingCount: 11,
    ratingSum: 52.8,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod9Id,
    sellerId: seller1Id,
    title: "Hand-carved Spoon Set",
    slug: "hand-carved-spoon-set",
    description: "Set of 3 hand-carved wooden spoons for cooking or serving.",
    price: 45.0,
    currency: "USD",
    images: [{ 
      url: "https://images.unsplash.com/photo-1723361750447-c25cb9027421?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Wooden spoons" 
    }],
    stock: 40,
    tags: ["kitchen", "wood", "handmade"],
    materials: ["wood"],
    status: "active",
    ratingAvg: 4.6,
    ratingCount: 13,
    ratingSum: 59.8,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod10Id,
    sellerId: seller2Id,
    title: "Woven Coasters",
    slug: "woven-coasters",
    description: "Set of 6 woven coasters made from sisal and raffia.",
    price: 35.0,
    currency: "USD",
    images: [{ 
      url: "https://images.pexels.com/photos/9173943/pexels-photo-9173943.jpeg", 
      alt: "Woven coasters" 
    }],
    stock: 50,
    tags: ["home", "woven", "eco-friendly"],
    materials: ["sisal", "raffia"],
    status: "active",
    ratingAvg: 4.3,
    ratingCount: 5,
    ratingSum: 21.5,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod11Id,
    sellerId: seller3Id,
    title: "Hand-dyed Scarf",
    slug: "hand-dyed-scarf",
    description: "Lightweight scarf dyed using natural indigo techniques.",
    price: 80.0,
    currency: "USD",
    images: [{ 
      url: "https://images.unsplash.com/photo-1500241770736-a3f62bbc8717?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Indigo scarf" 
    }],
    stock: 22,
    tags: ["fashion", "scarf", "natural dye"],
    materials: ["cotton", "indigo"],
    status: "active",
    ratingAvg: 4.7,
    ratingCount: 6,
    ratingSum: 28.2,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: prod12Id,
    sellerId: seller4Id,
    title: "Clay Plant Pot",
    slug: "clay-plant-pot",
    description: "Rustic clay pot perfect for indoor plants.",
    price: 55.0,
    currency: "USD",
    images: [{ 
      url: "https://images.unsplash.com/photo-1487268113661-a75c49688467?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      alt: "Clay plant pot" 
    }],
    stock: 35,
    tags: ["garden", "clay", "decor"],
    materials: ["clay"],
    status: "active",
    ratingAvg: 4.5,
    ratingCount: 8,
    ratingSum: 36.0,
    variants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Orders with delivered/shipped status for verified reviews
const orderData = [
  {
    _id: new Types.ObjectId(),
    buyerId: user3Id,
    items: [
      { productId: prod2Id, qty: 2, price: 120.0, title: "Ceramic Mug Set" },
      { productId: prod6Id, qty: 1, price: 75.0, title: "Wooden Toy Set" },
      { productId: prod11Id, qty: 3, price: 80.0, title: "Hand-dyed Scarf" }
    ],
    total: 555.0,
    status: "delivered",
    payment: {
      provider: "stripe",
      intentId: "pi_abc123xyz",
      status: "succeeded"
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
  },
  {
    _id: new Types.ObjectId(),
    buyerId: user1Id,
    items: [
      { productId: prod3Id, qty: 1, price: 180.0, title: "Macrame Wall Hanging" }
    ],
    total: 180.0,
    status: "shipped",
    payment: {
      provider: "stripe",
      intentId: "pi_def456uvw",
      status: "succeeded"
    },
    shippingAddress: {
      street: "12 Craft Street",
      city: "Lagos",
      state: "Lagos",
      zip: "100001",
      country: "Nigeria"
    },
    createdAt: new Date("2025-09-23T18:30:00Z"),
    updatedAt: new Date("2025-09-24T10:00:00Z")
  },
  {
    _id: new Types.ObjectId(),
    buyerId: user2Id,
    items: [
      { productId: prod7Id, qty: 1, price: 300.0, title: "Hand-painted Canvas" },
      { productId: prod10Id, qty: 4, price: 35.0, title: "Woven Coasters" }
    ],
    total: 440.0,
    status: "delivered",
    payment: {
      provider: "stripe",
      intentId: "pi_ghi789rst",
      status: "succeeded"
    },
    shippingAddress: {
      street: "78 Art Avenue",
      city: "Nairobi",
      state: "Nairobi",
      zip: "00100",
      country: "Kenya"
    },
    createdAt: new Date("2025-09-22T14:20:00Z"),
    updatedAt: new Date("2025-09-23T16:45:00Z")
  }
];

// Reviews from verified buyers
const reviewData = [
  {
    _id: new Types.ObjectId(),
    productId: prod3Id,
    authorId: user1Id,
    rating: 5,
    text: "Absolutely stunning macrame piece. The craftsmanship is top-notch!",
    isVerifiedBuyer: true,
    moderatedStatus: "approved",
    createdAt: new Date("2025-09-24T21:00:00Z"),
    updatedAt: new Date("2025-09-24T21:00:00Z")
  },
  {
    _id: new Types.ObjectId(),
    productId: prod7Id,
    authorId: user2Id,
    rating: 4,
    text: "Beautiful painting, though the colors were slightly different from the photos.",
    isVerifiedBuyer: true,
    moderatedStatus: "approved",
    createdAt: new Date("2025-09-24T21:05:00Z"),
    updatedAt: new Date("2025-09-24T21:05:00Z")
  },
  {
    _id: new Types.ObjectId(),
    productId: prod2Id,
    authorId: user3Id,
    rating: 5,
    text: "These ceramic mugs are gorgeous and feel great in hand. Highly recommend!",
    isVerifiedBuyer: true,
    moderatedStatus: "approved",
    createdAt: new Date("2025-09-24T21:10:00Z"),
    updatedAt: new Date("2025-09-24T21:10:00Z")
  },
  {
    _id: new Types.ObjectId(),
    productId: prod10Id,
    authorId: user2Id,
    rating: 3,
    text: "Nice coasters, but they fray a bit after a few uses.",
    isVerifiedBuyer: true,
    moderatedStatus: "pending",
    createdAt: new Date("2025-09-24T21:15:00Z"),
    updatedAt: new Date("2025-09-24T21:15:00Z")
  },
  {
    _id: new Types.ObjectId(),
    productId: prod6Id,
    authorId: user3Id,
    rating: 4,
    text: "My toddler loves these wooden toys. Great quality and safe materials.",
    isVerifiedBuyer: true,
    moderatedStatus: "approved",
    createdAt: new Date("2025-09-24T21:20:00Z"),
    updatedAt: new Date("2025-09-24T21:20:00Z")
  }
];

async function seed() {
  const conn = await connectDB();

  console.log("🌱 Starting database seeding...");

  try {
    // Clear old data
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Review.deleteMany({})
    ]);
    console.log("🧹 Cleared existing collections");

    // Combine users and sellers into one array
    const allUsers = [...users, ...sellers];
    
    // Insert seed data
    const usersInserted = await User.insertMany(allUsers);
    console.log(`👤 Inserted ${usersInserted.length} users (${sellers.length} sellers, ${users.length} buyers)`);

    const productsInserted = await Product.insertMany(products);
    console.log(`📦 Inserted ${productsInserted.length} products`);

    const ordersInserted = await Order.insertMany(orderData);
    console.log(`🧾 Inserted ${ordersInserted.length} orders`);

    const reviewsInserted = await Review.insertMany(reviewData);
    console.log(`⭐ Inserted ${reviewsInserted.length} reviews`);

    console.log("\n✅ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Total Users: ${usersInserted.length}`);
    console.log(`   - Sellers: ${sellers.length}`);
    console.log(`   - Buyers: ${users.length}`);
    console.log(`   - Products: ${productsInserted.length}`);
    console.log(`   - Orders: ${ordersInserted.length}`);
    console.log(`   - Reviews: ${reviewsInserted.length}`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seed();