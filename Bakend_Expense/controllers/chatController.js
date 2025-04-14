import Chat from '../models/Chat.js';

// Function to get all chats
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
};

// Function to save a new chat message from a supplier
export const saveChat = async (req, res) => {
  try {
    const { supplierName, shopkeeperName, item, quantity, timestamp } = req.body;
    
    // Ensure the shopkeeper's real name is passed correctly
    const newChat = new Chat({
      supplierName,
      shopkeeperName, // Make sure this is coming from the request and not hardcoded
      item,
      quantity,
      timestamp
    });
    
    // Save the chat to the database
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save chat' });
  }
};

// Function to save a reply from the supplier
export const saveSupplierReply = async (req, res) => {
  try {
    const { shopkeeperName, supplierName, item, quantity, reply, timestamp } = req.body;

    // Ensure the correct shopkeeper name is used here
    const newReply = new Chat({
      supplierName,
      shopkeeperName, // Ensure this is being passed correctly
      item,
      quantity,
      reply,
      timestamp
    });
    
    // Save the reply to the database
    await newReply.save();
    res.status(201).json(newReply);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save reply' });
  }
};

// Function to update chat status (e.g., for marking order as complete)
export const updateChatStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // If no chat found, return error
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};
