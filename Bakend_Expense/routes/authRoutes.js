import express from "express";
import {
  signupShopkeeper,
  signupSupplier
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup/shopkeeper", signupShopkeeper);
router.post("/signup/supplier", signupSupplier);

export default router;
