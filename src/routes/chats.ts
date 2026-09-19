import { Router } from 'express';
import { getChats , createChat, deleteChat, getChatById, sendMessage} from '../controllers/chats.js';
const chatsRouter = Router();

chatsRouter.get('/', getChats);
chatsRouter.post('/', createChat);
chatsRouter.get('/:id', getChatById);
chatsRouter.delete('/:id', deleteChat);
chatsRouter.post('/:id/messages', sendMessage);

export { chatsRouter};