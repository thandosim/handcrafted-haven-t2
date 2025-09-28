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
const seller1Id = new Types.ObjectId();
const seller2Id = new Types.ObjectId();
const user1Id = new Types.ObjectId();
const user2Id = new Types.ObjectId();
const user3Id = new Types.ObjectId();

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

// Users (including sellers)
const users = [
  {
    _id: user1Id,
    name: "Thando Simelane",
    email: "thando@example.com",
    role: "buyer",
    avatar: "https://example.com/avatar.jpg",
  },
  {
    _id: user2Id,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "buyer",
    avatar: "https://example.com/avatars/jane.jpg",
  },
  {
    _id: user3Id,
    name: "John Smith",
    email: "john@example.com",
    role: "buyer",
    avatar: "https://example.com/avatars/john.jpg",
  },
  {
    _id: seller1Id,
    name: "Artisan Collective",
    email: "collective@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/collective.jpg",
  },
  {
    _id: seller2Id,
    name: "Clay & Canvas",
    email: "claycanvas@example.com",
    role: "seller",
    avatar: "https://example.com/avatars/claycanvas.jpg",
  },
];

// Products
const products = [
  {
    _id: prod1Id,
    sellerId: seller1Id,
    title: "Handwoven Basket",
    slug: "handwoven-basket",
    description: "A beautifully crafted basket made from natural fibers.",
    price: 350,
    currency: "USD",
    images: [{ url: "https://example.com/images/basket.jpg", alt: "Handwoven basket" }],
    stock: 15,
    tags: ["basket", "handmade", "eco-friendly"],
    materials: ["grass", "bamboo"],
    status: "active",
  },
  {
    _id: prod2Id,
    sellerId: seller1Id,
    title: "Ceramic Mug Set",
    slug: "ceramic-mug-set",
    description: "Set of 4 hand-glazed ceramic mugs with earthy tones.",
    price: 120,
    currency: "USD",
    images: [{ url: "https://example.com/images/mugs.jpg", alt: "Ceramic mugs" }],
    stock: 20,
    tags: ["ceramic", "kitchenware", "handmade"],
    materials: ["clay", "glaze"],
    status: "active",
  },
  {
    _id: prod3Id,
    sellerId: seller1Id,
    title: "Macrame Wall Hanging",
    slug: "macrame-wall-hanging",
    description: "Boho-style macrame wall art made with natural cotton rope.",
    price: 180,
    currency: "USD",
    images: [{ url: "https://example.com/images/macrame.jpg", alt: "Macrame wall hanging" }],
    stock: 10,
    tags: ["macrame", "wall-art", "boho"],
    materials: ["cotton", "wood"],
    status: "active",
  },
  {
    _id: prod4Id,
    sellerId: seller1Id,
    title: "Leather Journal",
    slug: "leather-journal",
    description: "Hand-stitched leather journal with recycled paper pages.",
    price: 95,
    currency: "USD",
    images: [{ url: "https://example.com/images/journal.jpg", alt: "Leather journal" }],
    stock: 25,
    tags: ["stationery", "leather", "handmade"],
    materials: ["leather", "paper"],
    status: "active",
  },
  {
    _id: prod5Id,
    sellerId: seller1Id,
    title: "Beaded Necklace",
    slug: "beaded-necklace",
    description: "Colorful beaded necklace inspired by traditional African designs.",
    price: 60,
    currency: "USD",
    images: [{ url: "https://example.com/images/necklace.jpg", alt: "Beaded necklace" }],
    stock: 30,
    tags: ["jewelry", "beads", "cultural"],
    materials: ["glass beads", "thread"],
    status: "active",
  },
  {
    _id: prod6Id,
    sellerId: seller1Id,
    title: "Wooden Toy Set",
    slug: "wooden-toy-set",
    description: "Eco-friendly wooden toy set for toddlers.",
    price: 75,
    currency: "USD",
    images: [{ url: "https://example.com/images/toys.jpg", alt: "Wooden toys" }],
    stock: 18,
    tags: ["toys", "wood", "eco-friendly"],
    materials: ["wood", "non-toxic paint"],
    status: "active",
  },
  {
    _id: prod7Id,
    sellerId: seller2Id,
    title: "Hand-painted Canvas",
    slug: "hand-painted-canvas",
    description: "Original abstract painting on stretched canvas.",
    price: 300,
    currency: "USD",
    images: [{ url: "https://example.com/images/canvas.jpg", alt: "Abstract painting" }],
    stock: 5,
    tags: ["art", "canvas", "painting"],
    materials: ["canvas", "acrylic paint"],
    status: "active",
  },
  {
    _id: prod8Id,
    sellerId: seller2Id,
    title: "Crochet Blanket",
    slug: "crochet-blanket",
    description: "Soft handmade crochet blanket in pastel colors.",
    price: 220,
    currency: "USD",
    images: [{ url: "https://example.com/images/blanket.jpg", alt: "Crochet blanket" }],
    stock: 12,
    tags: ["blanket", "crochet", "cozy"],
    materials: ["yarn", "cotton"],
    status: "active",
  },
  {
    _id: prod9Id,
    sellerId: seller1Id,
    title: "Hand-carved Spoon Set",
    slug: "hand-carved-spoon-set",
    description: "Set of 3 hand-carved wooden spoons for cooking or serving.",
    price: 45,
    currency: "USD",
    images: [{ url: "https://example.com/images/spoons.jpg", alt: "Wooden spoons" }],
    stock: 40,
    tags: ["kitchen", "wood", "handmade"],
    materials: ["wood"],
    status: "active",
  },
  {
    _id: prod10Id,
    sellerId: seller1Id,
    title: "Woven Coasters",
    slug: "woven-coasters",
    description: "Set of 6 woven coasters made from sisal and raffia.",
    price: 35,
    currency: "USD",
    images: [{ url: "https://example.com/images/coasters.jpg", alt: "Woven coasters" }],
    stock: 50,
    tags: ["home", "woven", "eco-friendly"],
    materials: ["sisal", "raffia"],
    status: "active",
  },
  {
    _id: prod11Id,
    sellerId: seller2Id,
    title: "Hand-dyed Scarf",
    slug: "hand-dyed-scarf",
    description: "Lightweight scarf dyed using natural indigo techniques.",
    price: 80,
    currency: "USD",
    images: [{ url: "https://example.com/images/scarf.jpg", alt: "Indigo scarf" }],
    stock: 22,
    tags: ["fashion", "scarf", "natural dye"],
    materials: ["cotton", "indigo"],
    status: "active",
  },
  {
    _id: prod12Id,
    sellerId: seller2Id,
    title: "Clay Plant Pot",
    slug: "clay-plant-pot",
    description: "Rustic clay pot perfect for indoor plants.",
    price: 55,
    currency: "USD",
    images: [{ url: "https://example.com/images/plant-pot.jpg", alt: "Clay plant pot" }],
    stock: 35,
    tags: ["garden", "clay", "decor"],
    materials: ["clay"],
    status: "active",
  },
];

// Orders
const orderData = [
  {
    _id: new Types.ObjectId(),
    buyerId: user3Id,
    items: [
      { productId: prod2Id, qty: 2, price: 120, title: "Ceramic Mug Set" },
      { productId: prod6Id, qty: 1, price: 75, title: "Wooden Toy Set" },
      { productId: prod11Id, qty: 3, price: 80, title: "Hand-dyed Scarf" },
    ],
    total: 555,
    status: "pending",
    payment: {
      provider: "stripe",
      intentId: "pi_abc123xyz",
      status: "pending",
    },
    shippingAddress: {
      street: "45 Artisan Lane",
      city: "Mbabane",
      state: "Hhohho",
      zip: "H100",
      country: "Eswatini",
    },
  },
];

// Reviews
const reviewData = [
  {
    _id: new Types.ObjectId(),
    productId: prod3Id,
    authorId: user1Id,
    rating: 5,
    text: "Absolutely stunning macrame piece. The craftsmanship is top-notch!",
    moderatedStatus: "approved",
  },
  {
    _id: new Types.ObjectId(),
    productId: prod7Id,
    authorId: user2Id,
    rating: 4,
    text: "Beautiful painting, though the colors were slightly different from the photos.",
    moderatedStatus: "approved",
  },
  {
    _id: new Types.ObjectId(),
    productId: prod2Id,
    authorId: user3Id,
    rating: 5,
    text: "These ceramic mugs are gorgeous and feel great in hand. Highly recommend!",
    moderatedStatus: "approved",
  },
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

    // Insert seed data
    const usersInserted = await User.insertMany(users);
    console.log(`👤 Inserted ${usersInserted.length} users`);

    const productsInserted = await Product.insertMany(products);
    console.log(`📦 Inserted ${productsInserted.length} products`);

    const ordersInserted = await Order.insertMany(orderData);
    console.log(`🧾 Inserted ${ordersInserted.length} orders`);

    const reviewsInserted = await Review.insertMany(reviewData);
    console.log(`⭐ Inserted ${reviewsInserted.length} reviews`);

    console.log("✅ Database seeding completed successfully!");
    
    // Close the connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seed();