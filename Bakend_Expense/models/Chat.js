import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  shopkeeperName: String,
  supplierName: String,
  item: String,
  quantity: String,
  timestamp: String,
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Delivered'],
  }
});

export default mongoose.model('Chat', chatSchema);
