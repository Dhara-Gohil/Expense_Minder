import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  supplier: String,
  message: String,
  sender: String, // 'Shopkeeper' or 'Supplier'
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
