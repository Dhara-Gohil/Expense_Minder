import express from "express";
import { loginShopkeeper, loginSupplier } from "../controllers/authController.js";


import {
  signupShopkeeper,
  signupSupplier
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup/shopkeeper", signupShopkeeper);
router.post("/signup/supplier", signupSupplier);


router.post("/login/shopkeeper", loginShopkeeper);
router.post("/login/supplier", loginSupplier);

export default router;