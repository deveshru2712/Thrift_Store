import express from "express";
import { signup, login, logout, me } from "../controllers/auth.controller.js";
import { signupSchema, loginSchema } from "../utils/auth.schema.js";
import authValidator from "../validator/authValidator.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", authValidator(signupSchema), signup);
router.post("/login", authValidator(loginSchema), login);
router.post("/logout", logout);

router.get("/me", protectRoute, me);

export default router;
