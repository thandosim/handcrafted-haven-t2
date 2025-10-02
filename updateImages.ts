// updateImages.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import Product from "./src/models/Products"; // adjust path as needed

const imageMap: Record<string, string> = {
  "Handwoven Basket": "https://images.unsplash.com/photo-1568651909298-94932bbe9026?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Ceramic Mug Set": "https://images.unsplash.com/photo-1495100497150-fe209c585f50?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Macrame Wall Hanging": "https://plus.unsplash.com/premium_photo-1661412814375-2f987e310e2c?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Leather Journal": "https://images.unsplash.com/photo-1677064061401-f77f966ff8a1?q=80&w=2685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Beaded Necklace": "https://images.unsplash.com/photo-1742137189378-1788397cf778?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Wooden Toy Set": "https://plus.unsplash.com/premium_photo-1702597749448-ba435d39d115?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Hand-painted Canvas": "https://plus.unsplash.com/premium_photo-1667668222192-1b8755497ea2?q=80&w=2625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Crochet Blanket": "https://plus.unsplash.com/premium_photo-1705346743803-f7e6c51d5438?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Hand-carved Spoon Set": "https://images.unsplash.com/photo-1723361750447-c25cb9027421?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Woven Coasters": "https://images.pexels.com/photos/9173943/pexels-photo-9173943.jpeg",
  "Hand-dyed Scarf": "https://images.unsplash.com/photo-1500241770736-a3f62bbc8717?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Clay Plant Pot": "https://images.unsplash.com/photo-1487268113661-a75c49688467?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};
async function updateProductImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const products = await Product.find({});

    for (const product of products) {
      const newUrl = imageMap[product.title];
      if (newUrl) {
        product.images[0].url = newUrl;
        await product.save();
        console.log(`✅ Updated image for: ${product.title}`);
      } else {
        console.log(`⚠️ No image found for: ${product.title}`);
      }
    }

    console.log("🎉 Image update complete.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error updating product images:", err);
  }
}

updateProductImages();
