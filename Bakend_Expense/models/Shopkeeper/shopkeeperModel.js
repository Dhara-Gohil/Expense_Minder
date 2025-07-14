import mongoose from 'mongoose';
import Shopkeeper from './shopkeeperModel.js'; 

const shopkeeperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// ✅ This avoids the overwrite error during hot reloads
export default mongoose.models.Shopkeeper || mongoose.model('Shopkeeper', shopkeeperSchema);
