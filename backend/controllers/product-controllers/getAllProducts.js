// WITHOUT USING 'asyncHandler' =============================================

// router.get('/', async (req, res, next) => {
//     try {
//         const products = await Product.find({});
//         res.json(products);
//     } catch (error) {
//         console.error(error);
//         process.exit(1);
//     }
// });

// USING USING 'asyncHandler' ===============================================

// @desc Get all proucts
// @route Get /products
// @access Public
import asyncHandler from "../../middleware/asyncHandler.js";
import { Product } from "../../models/ProductModel.js";

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

export default getAllProducts;
