import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, index: true },
  passwordHash: String,
  role: { type: String, enum: ["buyer","seller","admin"], default: "buyer" },
  avatar: String,
  cart: [{
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    qty: { type: Number, default: 1, min: 1 },
    addedAt: { type: Date, default: () => new Date() }
  }],
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);