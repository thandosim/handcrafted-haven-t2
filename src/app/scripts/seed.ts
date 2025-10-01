import mongoose from "mongoose";
import { users, sellers, products, cartData, orderData, reviewData } from "../../models/seed-data";

// Import your models
import { Seller } from "../../models/Seller";
import { Cart } from "../../models/Cart";
import User from "../../models/User";
import Product from "../../models/Products";
import Order from "../../models/Order";
import Review from "../../models/Review";

const MONGO_URI = "mongodb://127.0.0.1:27017/handcrafted-haven";

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
    await Cart.insertMany(cartData);
    await Order.insertMany([orderData]);
    await Review.insertMany(reviewData);

    console.log("🌱 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
