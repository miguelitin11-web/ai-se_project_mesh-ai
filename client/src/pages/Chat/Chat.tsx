import "./Chat.css";
import { getChats, createChat, getChat, sendMessage } from "../../utils/api";
import type {Chat as ChatType, Message} from  "../../utils/api"
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {useOutletContext} from "react-router-dom";

type MobileContext = {
 isMobileMenuOpen: boolean;
 setIsMobileMenuOpen: (open: boolean) => void;
};

export default function Chat() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useOutletContext<MobileContext>();
  const [chats, setChats] =useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] =useState<string | null>(null);
  const [chatsError, setChatsError] =useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] =useState<boolean>(true);
  const [isCreatingChat, setIsCreatingChat] =useState<boolean>(false);
  const [newChatTitle, setNewChatTitle] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] =useState<boolean>(false);
  const [messagesError, setMessagesError] =useState<string>("");
const [input, setInput] = useState<string>("");
const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
  const load = async () => {
    try {
      const res = await getChats();
setChats(res.data || []);
          } catch {
       setChatsError('Failed to load chats.');
    } finally {
      setIsLoadingChats(false); 
    }
  };

  load();
}, []);
useEffect(() => {
  if (!activeChatId) return;

  const load = async () => {
    setMessages([]);
    setIsLoadingMessages(true);
    setMessagesError("");
    try {
      const res = await getChat(activeChatId);
      setMessages(res.data?.messages || []);
    } catch {
      setMessagesError('Failed to load messages.');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  load();
}, [activeChatId]);
async function handleCreateChat() {
  const res = await createChat(newChatTitle);
   setChats((prev) => [res.data!, ...prev]);
  setActiveChatId(res.data!._id);
  setIsMobileMenuOpen(false);
  setIsCreatingChat(false);
setNewChatTitle('');
}
const handleSend = async () => {
 const text = input.trim();
 if (!text || !activeChatId || isSending) return;

 const userMessage: Message = {
   _id: Date.now().toString(),
   chatId: activeChatId,
   role: "user",
   content: text,
   createdAt: new Date().toISOString(),
 };

 setMessages((prev) => [...prev, userMessage]);
setInput('');
setIsSending(true);

 try {
   const res = await sendMessage(activeChatId, text);
   if (res.data) {
     setMessages((prev) => [...prev, res.data!]);
   }
 } catch {
   const errorMessage: Message = {
  _id: Date.now().toString(),
  chatId: activeChatId,
  role: 'assistant',
  content: 'Something went wrong. Please try again.',
  createdAt: new Date().toISOString(),
};
setMessages((prev) => [...prev, errorMessage]);
 } finally {
 setIsSending(false);
 }
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
 if (e.key === "Enter" && !e.shiftKey) {
   e.preventDefault();
   handleSend();
 }
};

  return (
  <div className="chat">
    <aside className={`chat__sidebar${isMobileMenuOpen ? ' chat__sidebar_open' : ''}`}>
      <button className="chat__new-btn" type="button" onClick={() => setIsCreatingChat(true)}>+ New Chat
      </button>

      {isCreatingChat && (
  <input
    className="chat__title-input"
    type="text"
    placeholder="Chat name"
    value={newChatTitle}
    onChange={(e) => setNewChatTitle(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') handleCreateChat();
      if (e.key === 'Escape') {
        setIsCreatingChat(false);
        setNewChatTitle('');
      }
    }}
    autoFocus
  />
)}

      {isLoadingChats && <p className="chat__sidebar-message">Loading…</p>}
      {chatsError && <p className="chat__sidebar-message">{chatsError}</p>}

      <ul className="chat__list">
        {chats.map((c) => (
  <li
    key={c._id}
    className={
      c._id === activeChatId
        ? 'chat__item chat__item_active'
        : 'chat__item'
    }
    onClick={() => {
 setActiveChatId(c._id);
 setIsMobileMenuOpen(false);
}}
  >
    {c.title}
  </li>
))}
      </ul>
    </aside>

    <div className="chat__main">
  {!messagesError && !isLoadingMessages && !activeChatId && (
    <div className="chat__no-messages">
      <p>No chat selected</p>
      <button onClick={() => {
 setIsCreatingChat(true);
 setIsMobileMenuOpen(true);
}}>Start new chat</button>
    </div>
  )}
  
  {!messagesError && !isLoadingMessages && activeChatId && messages.length === 0 && (
    <div className="chat__no-messages">
      <p>No messages yet</p>
    </div>
  )}

  {activeChatId && isLoadingMessages && (
    <p className="chat__no-messages">loading message</p>
  )}

  {activeChatId && messagesError && (
    <div className="chat__error">
      <p>{messagesError}</p>
     
    </div>
  )}

  {activeChatId && !isLoadingMessages && !messagesError && (
   <> <ul className="chat__messages">
      {messages.map((msg) => (
  <li key={msg._id} className={
    msg.role === 'user'
      ? 'chat__message chat__message_user'
      : 'chat__message chat__message_assistant'}
      >
    {msg.role === 'user' ? <span>{msg.content}</span> : <span><ReactMarkdown>{msg.content}</ReactMarkdown></span>}
  </li>
))}
      {/* See styling hints below. */}
    </ul>
    <div className="chat__input-bar">
  <textarea
    className="chat__input"
    placeholder="Ask any question"
    rows={1}
    value={input}
 onChange={(e) => setInput(e.target.value)}
 onKeyDown={handleKeyDown}
  />
  <button
    className="chat__send"
    aria-label="Send message" type="button" disabled={!input.trim() || isSending} onClick={() => handleSend()}
  ></button>
</div></>
  )}
</div>
  </div>
);}