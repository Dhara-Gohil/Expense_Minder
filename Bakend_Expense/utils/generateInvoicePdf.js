import PDFDocument from 'pdfkit';

export const generateInvoicePdfBuffer = (invoice) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // Title
      doc.fontSize(20).text('Invoice', { align: 'center' });
      doc.moveDown();

      // Details
      doc.fontSize(12)
        .text(`Invoice Number: ${invoice.invoiceNumber}`)
        .text(`Supplier: ${invoice.supplierName}`)
        .text(`Email: ${invoice.email}`)
        .text(`Date: ${new Date(invoice.createdAt).toLocaleDateString('en-IN')}`)
        .text(`Payment Status: ${invoice.paymentStatus || "Unpaid"}`);
      doc.moveDown();

      // Table header
      doc.text('Items:', { underline: true });
      doc.moveDown(0.5);

      // Table body
      invoice.items.forEach((item, idx) => {
        doc.text(
          `${idx + 1}. ${item.name} - ${item.quantity} x ₹${item.price} = ₹${item.price * item.quantity}`
        );
      });

      doc.moveDown();
      doc.text(`Total Amount: ₹${invoice.totalAmount}`, { bold: true });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
