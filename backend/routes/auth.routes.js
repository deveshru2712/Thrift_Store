import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { signupSchema, loginSchema } from "../utils/auth.schema.js";
import authValidator from "../validator/authValidator.js";

const router = express.Router();

router.post("/signup", authValidator(signupSchema), signup);
router.post("/login", authValidator(loginSchema), login);
router.post("/", logout);

export default router;
