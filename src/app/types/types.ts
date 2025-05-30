/** @format */

// src/types.ts

export interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

// For ChatInterface props
export interface ChatInterfaceProps {
  messages: Message[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSendMessage: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// For HeroSection props
export interface HeroSectionProps {
  displayText: string;
  isTyping: boolean;
}

// For InteractiveBackground props
export interface InteractiveBackgroundProps {
  mousePosition: MousePosition;
}
