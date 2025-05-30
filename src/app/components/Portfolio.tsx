/** @format */
"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import InteractiveBackground from "./InteractiveBackground";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ChatInterface from "./ChatInterface";
import SkillsSection from "./SkillsSection";

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

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: "bot",
        content:
          "Thanks for your question! I'm currently being configured with Uzair's data. Once integrated, I'll provide detailed answers about his experience, projects, and skills.",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  // Optional: input change handler with types
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      <InteractiveBackground mousePosition={mousePosition} />
      <Header />
      <HeroSection displayText={displayText} isTyping={isTyping} />
      <ChatInterface
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onInputChange={handleInputChange} // Pass if your ChatInterface uses it
      />
      <SkillsSection />
    </div>
  );
};

export default Portfolio;
