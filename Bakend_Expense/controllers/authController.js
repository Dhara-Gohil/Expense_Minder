import Shopkeeper from "../models/Shopkeeper.js";
import Supplier from "../models/Supplier.js";
import bcrypt from "bcryptjs";

// Shopkeeper Signup
export const signupShopkeeper = async (req, res) => {
  const { name, email, password, shopName } = req.body;

  try {
    const existing = await Shopkeeper.findOne({ email });
    if (existing) return res.status(400).json({ message: "Shopkeeper already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Shopkeeper({ name, email, password: hashedPassword, shopName });
    await newUser.save();

    res.status(201).json({ message: "Shopkeeper registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Supplier Signup
export const signupSupplier = async (req, res) => {
  const { name, email, password, companyName } = req.body;

  try {
    const existing = await Supplier.findOne({ email });
    if (existing) return res.status(400).json({ message: "Supplier already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Supplier({ name, email, password: hashedPassword, companyName });
    await newUser.save();

    res.status(201).json({ message: "Supplier registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
