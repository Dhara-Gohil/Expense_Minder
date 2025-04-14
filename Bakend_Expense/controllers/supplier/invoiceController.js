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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create invoice' });
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
  const shopkeeperId = req.query.shopkeeperId;

  if (!shopkeeperId) {
    return res.status(400).json({ message: "Shopkeeper ID is required" });
  }

  try {
    // Convert shopkeeperId to ObjectId
    const objectIdShopkeeperId = new mongoose.Types.ObjectId(shopkeeperId);

    // Find invoices and populate the shopkeeperId field
    const invoices = await Invoice.find({ shopkeeperId: objectIdShopkeeperId })
      .populate('shopkeeperId')  // Populate the shopkeeper details
      .sort({ date: -1 });

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "No invoices found for this shopkeeper" });
    }

    res.json(invoices);  // Send the fetched invoices as response
  } catch (error) {
    console.error("Error fetching shopkeeper invoices:", error.message);
    res.status(500).json({ message: "Error fetching shopkeeper invoices", error: error.message });
  }
};

