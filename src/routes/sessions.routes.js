import { Router } from 'express';
import { registerUser, loginUser, currentUser, logoutUser } from '../controllers/sessions.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', authMiddleware, currentUser);
router.post('/logout', logoutUser);

export default router;