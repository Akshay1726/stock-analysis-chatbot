
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Sender } from '../types';
import { INITIAL_BOT_MESSAGE, PRODUCT_DATABASE } from '../constants';
import { getStockAnalysis } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import { SendIcon } from './icons/SendIcon';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_BOT_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: Sender.USER,
      text: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponseData = await getStockAnalysis(trimmedInput, PRODUCT_DATABASE);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: Sender.BOT,
        text: botResponseData.naturalResponse,
        data: botResponseData,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to get stock analysis:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: Sender.BOT,
        text: "Apologies, I'm having trouble connecting to my brain right now. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="relative max-w-3xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about product stock..."
            disabled={isLoading}
            className="w-full pl-4 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-cyan-500 hover:text-white disabled:hover:bg-transparent disabled:text-gray-600 disabled:cursor-not-allowed transition duration-300"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
