import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/genToken.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const error = new Error("Email is already in use!");
      error.status = 400;
      throw error;
    }

    //encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //generating token for future auth
    genToken(res, newUser._id);

    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      message: "User created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //checking for user
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Email is not associated with any account");
      error.status = 401;
      throw error;
    }
    //comparing the password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      const error = new Error("Wrong Password");
      error.status = 401;
      throw error;
    }

    genToken(res, user._id);
    res.status(200).json({
      success: true,
      id: user._id,
      username: user.username,
      message: "Logged in successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    //clearing the cookie
    res.cookie("authToken", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};
