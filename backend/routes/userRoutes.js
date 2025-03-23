import express from 'express';
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/user-controllers/userController.js';
const router = express.Router();

router.post('/login', authUser);
router.post('/signup', registerUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

export default router;