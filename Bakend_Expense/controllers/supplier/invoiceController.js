import Invoice from '../../models/supplier/Invoice.js';

// Add a new invoice
export const createInvoice = async (req, res) => {
  try {
    const { supplierName, email, items, totalAmount } = req.body; 

    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const invoice = new Invoice({
      supplierName,
      email,
      items,
      totalAmount,
      invoiceNumber,
    });

    await invoice.save();
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
};

// Get all invoices
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};
