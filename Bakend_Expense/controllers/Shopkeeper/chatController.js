import Chat from '../../models/Chat.js';
import Supplier from '../../models/Shopkeeper/supplierModel.js'; // ✅ Import Supplier

// ✅ Get all chats
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
};

// ✅ Insert default suppliers
export const insertSuppliers = async (req, res) => {
  try {
    await Supplier.insertMany([
      { name: 'Ramesh & Co.' },
      { name: 'BuildMate' },
      { name: 'Urban Furnish' }
    ]);
    res.json({ message: 'Suppliers added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Insert failed' });
  }
};
// ✅ Save chat to DB
export const saveChat = async (req, res) => {
    try {
      const { supplier, item, quantity, timestamp } = req.body;
      const newChat = new Chat({ supplier, item, quantity, timestamp });
      await newChat.save();
      res.status(201).json(newChat);
    } catch (err) {
      res.status(500).json({ error: 'Failed to save chat' });
    }
  };
  
