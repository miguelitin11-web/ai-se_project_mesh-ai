import type { Request, Response } from 'express';
import { Router } from 'express';
import { authRouter} from './auth.js';
import { chatsRouter } from './chats.js';
import { documentsRouter } from './documents.js';
import queryRouter from './query.js';

const router = Router();

router.use('/chats', chatsRouter);

router.use('/auth', authRouter);

router.use('/documents', documentsRouter);

router.use('/query', queryRouter);

export default router;


export const getCurrentUser = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      userId: "user_001",
      email: "user@example.com",
      name: "John Doe",
      createdAt: "2026-01-01T00:00:00Z"
    },
    error: null
  });
};