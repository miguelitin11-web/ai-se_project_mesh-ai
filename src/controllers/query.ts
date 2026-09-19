import type { Request, Response } from 'express';

export const askQuestion = (req: Request, res: Response) => {
  const { question } = req.body;

  res.status(200).json({
    success: true,
    data: {
      question,
      answer: 'This is a placeholder answer.',
    },
    error: null,
  });
};