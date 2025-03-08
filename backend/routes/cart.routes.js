import express from "express";
import {
  getCart,
  addToCart,
  deleteFromCart,
} from "../controllers/cart.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/add/:id", protectRoute, addToCart);

export default router;
