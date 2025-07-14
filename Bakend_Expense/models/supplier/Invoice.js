// models/supplier/Invoice.js
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
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid'
  },
  shopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shopkeeper",
    required: true,
  },
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
