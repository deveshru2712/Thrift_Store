import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    //getting the token
    const token = req.cookies.key;
    if (!token) {
      const error = new Error("Unauthorized - no token exists.");
      error.status = 401;
      throw error;
    }

    //verifying the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      const error = new Error("Unauthorized - invalid token");
      error.status = 401;
      throw error;
    }

    //checking for the user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default protectRoute;
