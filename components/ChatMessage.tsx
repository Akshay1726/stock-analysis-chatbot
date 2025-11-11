
import React from 'react';
import { Message, Sender } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';
import LowStockAlert from './LowStockAlert';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;
  
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-indigo-500' : 'bg-cyan-500'}`}>
        {isUser ? <UserIcon /> : <BotIcon />}
      </div>
      <div className={`max-w-md lg:max-w-xl p-4 rounded-xl shadow-lg ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
        <p className="whitespace-pre-wrap">{message.text}</p>
        {message.sender === Sender.BOT && message.data && message.data.lowStockItems.length > 0 && (
          <LowStockAlert items={message.data.lowStockItems} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
