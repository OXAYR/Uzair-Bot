/** @format */

import React, { FC } from "react";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";
import Button from "./Button";

const Header: FC = () => (
  <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-gray-800/50">
    <div className="max-w-6xl mx-auto px-6 py-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Terminal size={18} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-gray-950" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">uzair.dev</div>
            <div className="text-xs text-gray-500 font-mono">~/portfolio</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#about"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            About
          </a>
          <a
            href="#projects"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Skills
          </a>
          <div className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <Button variant="accent" size="sm" className="md:hidden">
          Menu
        </Button>
      </nav>
    </div>
  </header>
);

export default Header;
