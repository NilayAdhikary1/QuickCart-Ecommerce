import express from 'express';
import { getUserById, getUserProfiles, updateUser, deleteUser } from '../controllers/admin-controllers/adminController.js';
import { isAuthUser } from '../middleware/isAuthUser.js';
import { isAuthAdmin } from '../middleware/isAuthAdmin.js';

const router = express.Router();


// This means to perform these operations, you HAVE TO BE AN ADMIN AS WELL AS A VALID USER...
router.get('/', isAuthUser, isAuthAdmin, getUserProfiles);
router.get('/:userId', isAuthUser, isAuthAdmin, getUserById);
router.put('/:userId', isAuthUser, isAuthAdmin, updateUser);
router.delete('/:userId', isAuthUser, isAuthAdmin, deleteUser);

export default router;