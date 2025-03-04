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
    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (!decode) {
      const error = new Error("Unauthorized - invalid token");
      error.status = 401;
      throw error;
    }

    //checking for the user
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    req.userId = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default protectRoute;
