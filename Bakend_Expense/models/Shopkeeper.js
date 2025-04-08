import mongoose from "mongoose";

const shopkeeperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopName: { type: String }, // Example additional field
  createdAt: { type: Date, default: Date.now }
});

const Shopkeeper = mongoose.model("Shopkeeper", shopkeeperSchema);
export default Shopkeeper;
