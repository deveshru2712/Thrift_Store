import { json } from "express";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { decodeBase64 } from "bcryptjs";

export const getProducts = async (req, res, next) => {
  try {
    // let { pageNo } = req.query;
    // pageNo = parseInt(pageNo);
    // let limit = 9;

    //checking for valid page number
    // if (isNaN(pageNo) || pageNo < 1) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Unable to fetch products",
    //   });
    //   }
    //this is help in making pagination

    // const product = await Product.find()
    //   .skip((pageNo - 1) * limit)
    //   .limit(limit);

    //this is going to generate random products
    // const product = await Product.aggregate([{ $sample: { size: 10 } }]);

    const product = await Product.find({});

    res.status(200).json({ productList: product });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

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

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

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
    // const loggedUser = await User.findOne(user._id).populate("cart.product");
    const loggedUser = await User.findOne({ _id: user._id }).populate(
      "cart.product"
    );
    console.log(loggedUser);
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

// export const createProducts = async (req, res, next) => {
//   try {
//     const { title, price, description, image, category, rate, count } =
//       req.body;
//     if (!title && !price && !category) {
//       console.log("please provide all field");
//     }

//     const productRating = {
//       rate: rate || 0,
//       count: count || 0,
//     };

//     const product = await Product.create({
//       title,
//       price,
//       description,
//       image,
//       category,
//       rating: productRating,
//     });

//     return res.status(201).json({
//       product,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
