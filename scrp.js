import mongoose from "mongoose";

// Replace with your actual MongoDB URI
const MONGODB_URI = "mongodb+srv://tola1_db_user:D11iPvazMjM5kDiX@haven.zrptql2.mongodb.net/?retryWrites=true&w=majority";

// Define the User schema (adjust fields as needed)
const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model("User", userSchema);

async function getSellers() {
  try {
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ Connected to MongoDB");

    const sellers = await User.find({ role: "seller" }).lean();
    console.log("📦 Sellers found:", sellers.length);
    console.dir(sellers, { depth: null });

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error fetching sellers:", err);
    process.exit(1);
  }
}

getSellers();
