/** @format */
"use client";

import React, { FC, useState } from "react";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";
import Button from "./Button";

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
              href="https://github.com/oxayr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              Projects
            </a>
            <a
              href="https://medium.com/@uzairmaqsood451"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              Blog
            </a>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/oxayr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/uzair-maqsood-se1a6050267/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:uzairmaqsood451@gmail.com"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="relative md:hidden">
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Menu
            </Button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-950 border border-gray-800 rounded-lg shadow-lg">
                <div className="py-2">
                  <a
                    href="https://github.com/oxayr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Projects
                  </a>
                  <a
                    href="https://medium.com/@uzairmaqsood451"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </a>
                  <div className="h-px bg-gray-800 my-2" />
                  <a
                    href="https://github.com/oxayr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/uzair-maqsood-se1a6050267/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="mailto:uzairmaqsood451@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Mail size={16} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
