import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let updatedUser;

    const checkCart = user.cart
      .map((item) => item.product.toString())
      .includes(id);

    if (checkCart) {
      updatedUser = await User.findOneAndUpdate(
        { _id: user._id, "cart.product": id },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(402).json({
          success: false,
          message: "unable to add to cart",
        });
      }
    } else {
      updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        {
          $push: { cart: { product: id } },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(402).json({
          success: false,
          message: "unable to add to cart",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Product added to the cart",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFromCart = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { cart: { product: id } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(402).json({
        success: false,
        message: "unable to remove from cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted from  cart",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  const user = req.user;
  try {
    const loggedUser = await User.findOne({ _id: user._id }).populate(
      "cart.product"
    );

    if (!loggedUser) {
      return res.status(404).json({
        success: false,
        message: "Unable to fetch the cart",
      });
    }
    const cart = loggedUser.cart;

    return res.status(200).json({
      success: true,
      cart: cart,
    });
  } catch (error) {
    next(error);
  }
};
