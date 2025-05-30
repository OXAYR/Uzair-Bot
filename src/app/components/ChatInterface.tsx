/** @format */
"use client";

import React, {
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  FC,
} from "react";
import { Zap, ChevronRight, Bot, User, Send } from "lucide-react";

import { Message, ChatInterfaceProps } from "../types/types";
import Button from "./Button";
import Card from "./Card";

const ChatInterface: FC<ChatInterfaceProps> = ({
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
}) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickQuestions = [
    "What's your experience with React?",
    "Show me your latest projects",
    "What AI technologies do you use?",
    "Tell me about your mobile apps",
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ask Me Anything
          </h2>
          <p className="text-gray-400">
            Powered by AI • Get instant answers about my work
          </p>
        </div>

        <Card className="overflow-hidden">
          {/* Chat header */}
          <div className="bg-gray-900/60 border-b border-gray-800/60 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">AI Chat</div>
                  <div className="text-xs text-gray-500">
                    Trained on Uzair's portfolio data
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500/80 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500/80 rounded-full" />
                <div className="w-3 h-3 bg-green-500/80 rounded-full" />
              </div>
            </div>
          </div>

          {/* Quick questions */}
          <div className="px-6 py-4 bg-gray-950/40 border-b border-gray-800/40">
            <div className="text-sm text-gray-500 mb-3">Try asking:</div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="text-xs bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 px-3 py-2 rounded-lg transition-colors border border-gray-700/50 flex items-center gap-1"
                >
                  {question}
                  <ChevronRight size={12} />
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto px-6 py-4 space-y-4 bg-gray-950/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "bot" && (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] ${
                    message.type === "user" ? "order-1" : ""
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800/80 text-gray-200 border border-gray-700/50"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
                {message.type === "user" && (
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 bg-gray-900/40 border-t border-gray-800/60">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about my experience, projects, or skills..."
                className="flex-1 bg-gray-950/60 border border-gray-800/60 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
              <Button onClick={onSendMessage} variant="accent">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ChatInterface;
