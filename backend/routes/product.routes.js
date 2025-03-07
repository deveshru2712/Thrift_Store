import express from "express";
import {
  searchProducts,
  getProductById,
  getProducts,
  updateCart,
  // createProducts,
} from "../controllers/product.controller.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getProductById);
router.get("/", protectRoute, getProducts);
router.get("/search", protectRoute, searchProducts);

router.post("/cart/:id", protectRoute, updateCart);

// router.post("/create", createProducts);

export default router;
