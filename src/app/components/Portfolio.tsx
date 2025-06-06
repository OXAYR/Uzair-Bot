/** @format */
"use client";
import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import InteractiveBackground from "./InteractiveBackground";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ChatInterface from "./ChatInterface";
import SkillsSection from "./SkillsSection";
import { generateResponse } from "../lib/ai";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
}

const Portfolio: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });
  const [displayText, setDisplayText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hi! I'm Uzair's AI assistant. Ask me anything about his experience, projects, or skills.",
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");

  const introText: string =
    "Hi! I'm Uzair's AI assistant. Ask me anything about his experience, projects, or skills.";

  // Instant mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < introText.length) {
        setDisplayText(introText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [introText]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      // Get AI response
      const aiResponse = await generateResponse(inputValue);

      // Add AI response
      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: aiResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content:
          "I apologize, but I'm having trouble processing your request right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Optional: input change handler with types
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground mousePosition={mousePosition} />
      <div className="relative z-10">
        <Header />
        <HeroSection displayText={displayText} isTyping={isTyping} />
        <ChatInterface
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={handleSendMessage}
          onInputChange={handleInputChange}
        />
        <SkillsSection />
      </div>
    </div>
  );
};

export default Portfolio;
