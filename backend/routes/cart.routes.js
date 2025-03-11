import express from "express";
import {
  getCart,
  addToCart,
  deleteFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/add/:id", protectRoute, addToCart);
router.post("/:method/:id", protectRoute, updateQuantity);

export default router;
