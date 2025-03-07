import Product from "../models/product.model.js";
import User from "../models/user.model.js";

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

export const updateCart = async (req, res, next) => {
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

    // const checkCart = user.cart.includes(id);
    const checkCart = user.cart
      .map((item) => item.productId.toString())
      .includes(id);
    //checking if the product is already in the user cart

    if (checkCart) {
      updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $pull: { cart: { productId: id } } },
        { new: true } // in order to return the new document
      );

      if (!updatedUser) {
        return res.status(500).json({
          success: false,
          message: "Failed to update cart",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product removed from the cart",
        user: updatedUser,
      });
    } else {
      updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { cart: { productId: id } } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(500).json({
          success: false,
          message: "Failed to update cart",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product added to the cart",
        user: updatedUser,
      });
    }
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
