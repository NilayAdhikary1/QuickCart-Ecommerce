import express from 'express';
import { getUserById, getUserProfiles, updateUser, deleteUser } from '../controllers/admin-controllers/adminController.js';
const router = express.Router();

router.get('/', getUserProfiles);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;