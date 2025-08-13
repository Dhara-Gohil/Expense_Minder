import Shopkeeper from "../models/Shopkeeper.js";
import Supplier from "../models/Supplier.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Shopkeeper Signup
export const signupShopkeeper = async (req, res) => {
  const { name, email, password, shopName } = req.body;

  try {
    const existing = await Shopkeeper.findOne({ email });
    if (existing) return res.status(400).json({ message: "Shopkeeper already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Shopkeeper({ name, email, password: hashedPassword, shopName });
    await newUser.save();

    res.status(201).json({ message: "Shopkeeper registered successfully please Login to continue" });
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

// Login as Shopkeeper
export const loginShopkeeper = async (req, res) => {
  const { email, password } = req.body;

  try {
    const shopkeeper = await Shopkeeper.findOne({ email });
    if (!shopkeeper) return res.status(404).json({ message: "Shopkeeper not found" });

    const isMatch = await bcrypt.compare(password, shopkeeper.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: shopkeeper._id, userType: "shopkeeper" }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful as Shopkeeper",
      user: shopkeeper,
      token,
      userType: "shopkeeper"
    });
  } catch (err) {
    console.log("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login as Supplier
export const loginSupplier = async (req, res) => {
  const { email, password } = req.body;

  try {
    const supplier = await Supplier.findOne({ email });
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });

    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: supplier._id, userType: "supplier" }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful as Supplier",
      user: supplier,
      token,
      userType: "supplier"
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};