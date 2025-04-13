import Chat from '../models/Chat.js';

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
};

export const saveChat = async (req, res) => {
  try {
    const { supplierName, shopkeeperName, item, quantity, timestamp } = req.body;
    const newChat = new Chat({ supplierName, shopkeeperName, item, quantity, timestamp });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save chat' });
  }
};
// Backend chatController.js (for supplier)
export const saveSupplierReply = async (req, res) => {
  try {
    const { shopkeeperName, supplierName, item, quantity, reply, timestamp } = req.body;
    const newReply = new Chat({
      supplierName,
      shopkeeperName,
      item,
      quantity,
      reply,
      timestamp
    });
    await newReply.save();
    res.status(201).json(newReply);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save reply' });
  }
};

export const updateChatStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};
