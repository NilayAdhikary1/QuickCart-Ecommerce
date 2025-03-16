import asyncHandler from "../../middleware/asyncHandler.js";
import { Product } from "../../models/ProductModel.js";

// @desc Feching Selected Product
// @route Get /products/:prodId
// @access Public

const getSelectedProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.prodId;
  const fetchedProd = await Product.findById(id).exec();
  if (fetchedProd) {
    res.json(fetchedProd);
  } else {
    res.status(404);
    throw new Error("Resource Not found!!");
  }
});

export default getSelectedProduct;
