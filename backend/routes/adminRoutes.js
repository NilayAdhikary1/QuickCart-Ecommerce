import express from 'express';
import { getUserById, getUserProfiles, updateUser, deleteUser, getAllOders, getOrderById, updateOrderToDelivered } from '../controllers/admin-controllers/adminController.js';
import { isAuthUser } from '../middleware/isAuthUser.js';
import { isAuthAdmin } from '../middleware/isAuthAdmin.js';

const router = express.Router();


// This means to perform these operations, you HAVE TO BE AN ADMIN AS WELL AS A VALID USER...

// user related routes...
router.get('/users', isAuthUser, isAuthAdmin, getUserProfiles);
router.get('/users/:userId', isAuthUser, isAuthAdmin, getUserById);
router.put('/users/:userId', isAuthUser, isAuthAdmin, updateUser);
router.delete('/users/:userId', isAuthUser, isAuthAdmin, deleteUser);


// order related routes...
router.get('/orders', isAuthUser, isAuthAdmin, getAllOders);
router.get('/orders/:orderId', isAuthUser, isAuthAdmin, getOrderById);
router.put('/orders/:orderId/deliver', isAuthUser, isAuthAdmin, updateOrderToDelivered);


export default router;