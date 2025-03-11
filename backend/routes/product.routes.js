import express from "express";
import {
  searchProducts,
  getProductById,
  getProducts,
  // createProducts,
} from "../controllers/product.controller.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getProductById);
router.get("/", protectRoute, getProducts);
router.get("/search/:title", protectRoute, searchProducts);

export default router;
