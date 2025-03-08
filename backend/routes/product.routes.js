import express from "express";
import {
  searchProducts,
  getProductById,
  getProducts,
  addToCart,
  getCart,
  // createProducts,
} from "../controllers/product.controller.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getProductById);
router.get("/", protectRoute, getProducts);
router.get("/search", protectRoute, searchProducts);

router.post("/cart/update/:id", protectRoute, addToCart);
router.get("/cart", protectRoute, getCart);

// router.post("/create", createProducts);

export default router;
