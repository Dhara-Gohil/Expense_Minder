import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
  