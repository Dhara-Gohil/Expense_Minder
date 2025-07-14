import Contact from '../models/Contact.js';

export const createContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const contact = new Contact({ firstName, lastName, email, message });
    await contact.save();

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
