import { Router } from 'express';
import { getCurrentUser } from '../controllers/auth.js';
import { login } from '../controllers/auth.js';
import { register } from '../controllers/auth.js';

const authRouter = Router();

authRouter.get('/me', getCurrentUser);

authRouter.post('/register', register);
authRouter.post('/login', login);
export { authRouter};