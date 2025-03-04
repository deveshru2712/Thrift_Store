import Product from "../models/product.route.js";

export const getProducts = async (req, res, next) => {
  try {
    let { pageNo } = req.query;
    pageNo = parseInt(pageNo);
    let limit = 10;

    //checking for valid page number
    if (isNaN(pageNo) || pageNo < 1) {
      return res.status(404).json({
        success: false,
        message: "Unable to fetch products",
      });
    }

    //this is help in making pagination
    const product = await Product.find()
      .skip((pageNo - 1) * limit)
      .limit(limit);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    let { id } = req.query;

    const product = await Product.find({ id });

    if (!product) {
      return res.status(404).json({
        success: "false",
        message: "Unable to find the product",
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
