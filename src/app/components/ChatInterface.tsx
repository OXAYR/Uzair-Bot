/** @format */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { generateResponse } from "../lib/ai";
import { ChatInterfaceProps, Message } from "../types/types";
import { Send, Loader2, ChevronDown } from "lucide-react";

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await generateResponse(input.trim());
      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: response,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 z-50">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-800 flex flex-col">
        {/* Chat header - Clickable to collapse/expand */}
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold">Chat with Uzair's AI</h3>
              <p className="text-gray-400 text-sm">
                Ask me anything about Uzair's experience and skills
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Chat content - Collapsible */}
        <div
          className={`transition-all duration-300 ease-in-out flex flex-col ${
            isCollapsed ? "h-0 overflow-hidden" : "h-[500px]"
          }`}
        >
          {/* Messages container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Start a conversation with Uzair's AI
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] break-words rounded-lg p-3 ${
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

          {/* Input area - Always at bottom */}
          <div className="p-4 border-t border-gray-800 bg-gray-900/95 mt-auto">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
