import mongoose from "mongoose";
import { users, sellers, products, cartData, orderData, reviewData } from "../../models/seed-data.js";

// Import your models
import { Seller } from "../../models/Seller.js";
import { Cart } from "../../models/Cart.js";
import User from "../../models/User.js";
import Product from "../../models/Products.js";
import Order from "../../models/Order.js";
import Review from "../../models/Review.js";

const MONGO_URI = "mongodb+srv://thando:mongo@cluster0.dji6uht.mongodb.net/handcrafted-haven";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // clear collections
    await Promise.all([
      User.deleteMany({}),
      Seller.deleteMany({}),
      Product.deleteMany({}),
      Cart.deleteMany({}),
      Order.deleteMany({}),
      Review.deleteMany({}),
    ]);

    // insert seed data
    await User.insertMany(users);
    await Seller.insertMany(sellers);
    await Product.insertMany(products);
    // await Cart.insertMany(cartData);
    // await Order.insertMany([orderData]);
    await Review.insertMany(reviewData);

    console.log("🌱 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
