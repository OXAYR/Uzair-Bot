/** @format */

import { FC } from "react";
import { Bot } from "lucide-react";

import { HeroSectionProps } from "../types/types";
import Badge from "./Badge";
import Card from "./Card";

const HeroSection: FC<HeroSectionProps> = ({ displayText, isTyping }) => (
  <section className="min-h-[80vh] flex items-center justify-center px-6">
    <div className="max-w-4xl mx-auto text-center">
      {/* Status indicator */}
      <div className="inline-flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-gray-800/60">
        <div className="relative">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
        </div>
        <span className="text-sm text-emerald-400 font-medium">
          Available for hire
        </span>
      </div>

      {/* Main heading */}
      <div className="space-y-6 mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <div className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            Full-Stack
          </div>
          <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            Developer
          </div>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Building scalable web applications and mobile experiences with modern
          technologies. Specialized in React ecosystem and AI integration.
        </p>
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {["React", "Next.js", "TypeScript", "React Native", "Node.js"].map(
          (tech: string) => (
            <Badge key={tech} variant="accent">
              {tech}
            </Badge>
          )
        )}
      </div>

      {/* AI Assistant Card */}
      <Card className="max-w-2xl mx-auto p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-white">AI Assistant</h3>
              <Badge variant="success">Online</Badge>
            </div>
            <div className="font-mono text-gray-300">
              {displayText}
              {isTyping && (
                <span className="animate-pulse text-blue-400">|</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  </section>
);

export default HeroSection;
