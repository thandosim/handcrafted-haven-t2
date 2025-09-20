import mongoose from "mongoose";
const Schema = mongoose.Schema;

const variantSchema = new Schema({
  name: String,
  options: [{
    value: String,
    priceDelta: Number,
    stock: Number
  }]
});

const ProductSchema = new Schema({
  sellerId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  title: String,
  slug: { type: String, unique: true, index: true },
  description: String,
  price: Number,
  currency: String,
  images: [{ url: String, alt: String }],
  stock: Number,
  tags: [String],
  materials: [String],
  status: { type: String, enum: ["draft","active","suspended"], default: "draft" },
  ratingAvg: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  ratingSum: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() },
  variants: [variantSchema],
  defaultVariant: String
});



export default mongoose.models.Product || mongoose.model("Product", ProductSchema);