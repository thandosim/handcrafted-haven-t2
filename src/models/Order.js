import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  buyerId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    qty: Number,
    price: Number,
    title: String
  }],
  total: Number,
  status: { 
    type: String, 
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"], 
    default: "pending" 
  },
  payment: {
    provider: String,
    intentId: String,
    status: { type: String, enum: ["pending", "succeeded", "failed"] }
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);