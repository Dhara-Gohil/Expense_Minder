import Invoice from '../../models/supplier/Invoice.js';
import mongoose from 'mongoose';

// Create Invoice
export const createInvoice = async (req, res) => {
  try {
    const { supplierName, email, items, totalAmount, shopkeeperId } = req.body;

    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const invoice = new Invoice({
      supplierName,
      email,
      items,
      totalAmount,
      invoiceNumber,
      shopkeeperId,
    });

    await invoice.save();
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  }catch (err) {
  console.error('❌ Failed to create invoice:', err); // change here
  res.status(500).json({ error: 'Failed to create invoice', details: err.message });
}
};

// Get All Invoices (Supplier-side)
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

// Get Invoices for Specific Shopkeeper
  // Path to your Invoice model


export const getShopkeeperInvoices = async (req, res) => {
  const { shopkeeperId } = req.query;

  if (!shopkeeperId) {
    return res.status(400).json({ message: "Shopkeeper ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(shopkeeperId)) {
    return res.status(400).json({ message: "Invalid Shopkeeper ID format" });
  }

  try {
    const invoices = await Invoice.find({ shopkeeperId }).sort({ createdAt: -1 });

    res.status(200).json(invoices);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
