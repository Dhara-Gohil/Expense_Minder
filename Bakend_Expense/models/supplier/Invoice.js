import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
});

const invoiceSchema = new mongoose.Schema({
  supplierName: String,
  email: String,
  items: [itemSchema],
  totalAmount: Number,
  invoiceNumber: String,
  date: { type: Date, default: Date.now },
  shopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shopkeeper",  // Reference to the Shopkeeper model
    required: true,
  },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
