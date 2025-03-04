import jwt from "jsonwebtoken";

const genToken = (res, userId, next) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    //setting up the cookie
    res.cookie("key", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development",
    });
  } catch (error) {
    next(error);
  }
};

export default genToken;
