import express from 'express';
import { isAuthUser } from '../middleware/isAuthUser.js';
import { loginUser } from '../controllers/user-controllers/loginController.js';
import { logoutUser } from '../controllers/user-controllers/logoutController.js';
import { registerUser } from '../controllers/user-controllers/signupUser.js';
import { getUserProfile } from '../controllers/user-controllers/getUserProfileController.js';
import { updateUserProfile } from '../controllers/user-controllers/updateUserController.js';


const router = express.Router();

// Here isAuthUser middleware ensures whether the user is autorized to perform next tasks!!
router.post('/login', loginUser);
router.post('/signup', registerUser);
router.post('/logout', logoutUser);
router.get('/profile', isAuthUser, getUserProfile);
router.put('/profile', isAuthUser, updateUserProfile);

export default router;