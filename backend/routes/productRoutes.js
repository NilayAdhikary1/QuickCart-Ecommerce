import express from "express";
import getAllProducts from "../controllers/product-controllers/getAllProducts.js";
import getSelectedProduct from "../controllers/product-controllers/getSelectedProduct.js";


const router = express.Router();

// to get all the products....................
router.get("/", getAllProducts);

// Fetch the selected product form a backend dummy products file...
router.get("/:prodId", getSelectedProduct);

export default router;
