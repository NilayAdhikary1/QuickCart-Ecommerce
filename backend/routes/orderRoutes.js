import express from "express";
import { isAuthUser } from "../middleware/isAuthUser.js";
import { isAuthAdmin } from "../middleware/isAuthAdmin.js";
import { cancelOrder } from "../controllers/order-controllers/cancelOrder.js";
import { createOrder } from "../controllers/order-controllers/createOrder.js";
import { getMyOrders } from "../controllers/order-controllers/getMyOrders.js";
import { updateOrderToPaid } from "../controllers/order-controllers/updateOrderToPaid.js";
import { getOrderById } from "../controllers/order-controllers/getOrderById.js";

const router = express.Router();

router.delete("/:orderId", isAuthUser, cancelOrder);
router.post("/", isAuthUser, createOrder);
router.get("/myorders", isAuthUser, getMyOrders);
router.get("/:orderId", isAuthUser, getOrderById);
router.put("/:orderId/pay", isAuthUser, updateOrderToPaid);

export default router;
