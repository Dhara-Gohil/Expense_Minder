import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String }, // Example additional field
  createdAt: { type: Date, default: Date.now }
});

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
