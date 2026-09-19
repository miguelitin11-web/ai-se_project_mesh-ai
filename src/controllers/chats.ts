import type { Request, Response } from 'express';

export const getChats = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: [{id: "chat_001",
title: "New Chat",
createdAt: "2026-01-01T00:00:00Z"}], 
    error: null
  });
};

export const createChat = (req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {
      id: "chat_01",
      title: "New Chat",
      createdAt: "2026-01-01T00:00:00Z"
    },
    error: null
  });
};

export const getChatById = (req: Request, res: Response): void => {
  const chatId = req.params.id;

  res.status(200).json({
    success: true,
    data: {
      id: chatId,
      title: "New Chat",
      createdAt: "2026-01-01T00:00:00Z"
    },
    error: null
  });
};

export const deleteChat = (req: Request, res: Response): void => {
  const chatId = req.params.id;

  res.status(204).json({
    success: true,
    data: {},
    error: null
  });
};

export const sendMessage = (req: Request, res: Response): void => {
  const chatId = req.params.id;

  res.status(201).json({
    success: true,
    data: {
      chatId: chatId,
      message:"Hello, chat_01",
      createdAt:"2026-01-01T00:00:00Z"
    },
    error: null
  });
};