import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // Load environment variables

import mongoose from "mongoose";
import Seller from "@/models/Seller"; // Ensure this model is registered correctly

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-");        // replace spaces with hyphens
}

async function updateSellerSlugs() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("❌ MONGODB_URI is not defined in .env.local");
  }

  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  const sellers = await Seller.find({});
  let updatedCount = 0;

  for (const seller of sellers) {
    if (!seller.slug) {
      seller.slug = generateSlug(seller.name);
      await seller.save();
      updatedCount++;
      console.log(`✅ Updated seller: ${seller.name} → ${seller.slug}`);
    } else {
      console.log(`⏩ Skipped seller: ${seller.name} (already has slug)`);
    }
  }

  console.log(`🎉 Slug update complete. ${updatedCount} sellers updated.`);
  mongoose.connection.close();
}

updateSellerSlugs().catch((err) => {
  console.error("❌ Error updating seller slugs:", err);
  mongoose.connection.close();
});
