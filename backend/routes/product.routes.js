import express from "express";
import {
  searchProducts,
  getProductById,
  getProducts,
  // createProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getProductById);
router.get("/", getProducts);
router.get("/search", searchProducts);

// router.post("/create", createProducts);

export default router;
