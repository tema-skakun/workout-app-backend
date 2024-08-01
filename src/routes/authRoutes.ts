import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validateRegistration } from '../middleware/validationMiddleware';

const router = Router();
router.post('/register', validateRegistration, register);
router.post('/login', login);

export default router;
