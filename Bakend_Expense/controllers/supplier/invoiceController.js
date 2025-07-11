import Invoice from '../../models/supplier/Invoice.js';
import mongoose from 'mongoose';
<<<<<<< HEAD

// Create Invoice
=======
import { generateInvoicePdfBuffer } from '../../utils/generateInvoicePdf.js';
import transporter from '../../config/nodemailer.js';

// Create Invoice and Email PDF
>>>>>>> 11a971a (latest commit , added few changes like email related , etc)
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
<<<<<<< HEAD
       paymentStatus: "Unpaid",
    });

    await invoice.save();
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  }catch (err) {
  console.error('❌ Failed to create invoice:', err); // change here
  res.status(500).json({ error: 'Failed to create invoice', details: err.message });
}
};

// controllers/invoiceController.js

=======
      paymentStatus: "Unpaid",
    });

    await invoice.save();

    // Generate PDF buffer
    const pdfBuffer = await generateInvoicePdfBuffer(invoice);

    // Send email with PDF attached
    await transporter.sendMail({
      from: '"Expense Minder" <no-reply@expenseminder.com>',
      to: email,
      subject: `Invoice ${invoiceNumber} from ${supplierName}`,
      text: `Hello,\n\nPlease find attached the invoice ${invoiceNumber}.\n\nThank you.`,
      attachments: [
        {
          filename: `Invoice_${supplierName.replace(/\s/g, '_')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    res.status(201).json({ message: 'Invoice created and emailed successfully', invoice });
  } catch (err) {
    console.error('❌ Failed to create and email invoice:', err);
    res.status(500).json({ error: 'Failed to create and email invoice', details: err.message });
  }
};

// Mark invoice as paid
>>>>>>> 11a971a (latest commit , added few changes like email related , etc)
export const markInvoiceAsPaid = async (req, res) => {
  const { invoiceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      { paymentStatus: "Paid" },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice marked as paid", invoice: updatedInvoice });
  } catch (err) {
    console.error("Error updating invoice:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

<<<<<<< HEAD

// Get All Invoices (Supplier-side)
=======
// Get all invoices
>>>>>>> 11a971a (latest commit , added few changes like email related , etc)
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

<<<<<<< HEAD
// Get Invoices for Specific Shopkeeper
  // Path to your Invoice model


=======
// Get invoices for a specific shopkeeper
>>>>>>> 11a971a (latest commit , added few changes like email related , etc)
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
<<<<<<< HEAD

=======
>>>>>>> 11a971a (latest commit , added few changes like email related , etc)
    res.status(200).json(invoices);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
