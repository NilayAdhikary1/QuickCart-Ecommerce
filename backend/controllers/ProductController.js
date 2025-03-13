import asyncHandler from "../middleware/asyncHandler.js";
import { Product } from "../models/ProductModel.js";

// Since all the Model operations are Promise-based, so you can use anyncHandler function to make the code shorter and you dont have to write the try-catch and error poritions by your own

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


// @desc Fetch All Products
// @route GET /products
// @access Pubic
const getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({});
    res.json(products);
});


// @desc Fetch Selected Product
// @route GET /products/:prodId
// @access Pubic
const getSelectedProduct = asyncHandler(async (req, res, next) => {
  // Find the adventure with the given `id`, or `null` if not found
  const id = req.params.prodId;
  const selectedPrduct = await Product.findById(id).exec();

  if (selectedPrduct) {
    res.json(selectedPrduct);
  } else {
    res.status(404);
    throw new Error("Resource Not found!!");
  }
});

export { getAllProducts, getSelectedProduct };
