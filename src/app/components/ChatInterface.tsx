/** @format */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { generateResponse } from "../lib/ai";
import { Message } from "../types/types";
import { Send, Loader2 } from "lucide-react";

interface ChatInterfaceProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  onInputChange,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to generate AI response
  const generateAIResponse = async (query: string): Promise<string> => {
    setIsTyping(true);

    try {
      const aiResponse = await generateResponse(query);
      return aiResponse;
    } catch (error) {
      console.error("Error generating response:", error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
    } finally {
      setIsTyping(false);
    }
  };

  // Handle message sending
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    onSendMessage();

    // Generate AI response
    const response = await generateAIResponse(inputValue);

    // Add AI response to messages
    const newMessage: Message = {
      id: messages.length + 1,
      type: "bot",
      content: response,
    };

    // Update messages (you'll need to implement this in your parent component)
    // For now, we'll just log it
    console.log("AI Response:", newMessage);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] z-50">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-800 flex flex-col h-full">
        {/* Chat header */}
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-white font-semibold">Chat with Uzair's AI</h3>
          <p className="text-gray-400 text-sm">
            Ask me anything about Uzair's experience and skills
          </p>
        </div>

        {/* Messages container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-100 rounded-lg p-3">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={onInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
