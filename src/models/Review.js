import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", index: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  text: String,
  isVerifiedBuyer: { type: Boolean, default: false },
  moderatedStatus: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);