import type { Request, Response } from 'express';
import Chat from '../models/chat.js';
import Message from '../models/message.js';

export const getChats = async(req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  const chats = await Chat.find({ userId });
  res.status(200).json({
    success: true,
    data: chats,
    error: null
  });
};

export const createChat = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ success: false, data: null, error: "Must have a title" });
    return;
  }

  const userId = req.user!.userId;

  const chat = await Chat.create({ userId, title });

res.status(201).json({
  success: true,
  data: chat,
  error: null
});
};
  
export const getChat = async(req: Request, res: Response): Promise<void> => {
const chatId = req.params.id;
const userId = req.user!.userId;

const chat = await Chat.findOne({ _id: chatId, userId });
if (!chat) {
  res.status(404).json({ success: false, data: null, error: "Chat not found" });
  return;
}
const messages = await Message.find({ chatId: chat._id }).sort({ createdAt: 1 });

res.status(200).json({
  success: true,
  data: { chat, messages },
  error: null
});
};

export const deleteChat = (req: Request, res: Response): void => {
  const chatId = req.params.id;

  res.status(204).json({
    success: true,
    data: {id:chatId},
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