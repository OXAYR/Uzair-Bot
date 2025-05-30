/** @format */
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MousePosition, InteractiveBackgroundProps } from "../types/types";

interface TechElement {
  id: number;
  type: "code" | "terminal" | "git" | "database";
  content: string;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  opacity: number;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  mousePosition,
}) => {
  const [techElements, setTechElements] = useState<TechElement[]>([]);
  const [isActive, setIsActive] = useState(true);

  // Tech-themed content
  const techContent = useMemo(
    () => ({
      code: [
        "const app = () => {",
        "function init() {",
        "async function fetch() {",
        "class Component {",
        "import { useState }",
        "export default",
        "try { await",
        "if (condition) {",
        "return <div>",
        "useEffect(() => {",
      ],
      terminal: [
        "npm install",
        "git commit -m",
        "docker build",
        "kubectl apply",
        "npm run dev",
        "yarn start",
        "git push",
        "docker-compose up",
        "npm test",
        "git pull",
      ],
      git: [
        "feature/",
        "bugfix/",
        "main",
        "develop",
        "release/",
        "hotfix/",
        "merge",
        "rebase",
        "stash",
        "cherry-pick",
      ],
      database: [
        "SELECT * FROM",
        "CREATE TABLE",
        "INSERT INTO",
        "UPDATE SET",
        "DELETE FROM",
        "JOIN ON",
        "GROUP BY",
        "ORDER BY",
        "WHERE",
        "HAVING",
      ],
    }),
    []
  );

  // Initialize tech elements
  useEffect(() => {
    if (!isActive) return;

    const createTechElement = (): TechElement => {
      const types: ("code" | "terminal" | "git" | "database")[] = [
        "code",
        "terminal",
        "git",
        "database",
      ];
      const type = types[Math.floor(Math.random() * types.length)];
      const content =
        techContent[type][Math.floor(Math.random() * techContent[type].length)];

      return {
        id: Date.now() + Math.random(),
        type,
        content,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        speed: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
      };
    };

    // Create initial elements
    const initialElements = Array.from({ length: 15 }, createTechElement);
    setTechElements(initialElements);

    // Animation interval
    const interval = setInterval(() => {
      setTechElements((prev) => {
        // Remove elements that have moved off screen
        const filtered = prev.filter((el) => el.y < 110);

        // Add new elements if needed
        const newElements =
          filtered.length < 15 ? [...filtered, createTechElement()] : filtered;

        // Update positions
        return newElements.map((el) => ({
          ...el,
          y: el.y + el.speed,
          rotation: el.rotation + 0.1,
        }));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, techContent]);

  // Get element styling based on type
  const getElementStyle = (element: TechElement) => {
    const baseStyle = {
      left: `${element.x}%`,
      top: `${element.y}%`,
      transform: `rotate(${element.rotation}deg)`,
      opacity: element.opacity,
    };

    switch (element.type) {
      case "code":
        return {
          ...baseStyle,
          color: "rgba(59, 130, 246, 0.5)", // blue
          fontFamily: "monospace",
        };
      case "terminal":
        return {
          ...baseStyle,
          color: "rgba(16, 185, 129, 0.5)", // green
          fontFamily: "monospace",
        };
      case "git":
        return {
          ...baseStyle,
          color: "rgba(245, 158, 11, 0.5)", // orange
          fontFamily: "monospace",
        };
      case "database":
        return {
          ...baseStyle,
          color: "rgba(139, 92, 246, 0.5)", // purple
          fontFamily: "monospace",
        };
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black opacity-90" />

      {/* Tech grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Tech elements */}
      {isActive &&
        techElements.map((element) => (
          <div
            key={element.id}
            className="absolute text-sm font-mono whitespace-nowrap pointer-events-none select-none"
            style={getElementStyle(element)}
          >
            {element.content}
          </div>
        ))}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />

      {/* Toggle button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="absolute bottom-4 right-4 px-3 py-1.5 text-xs text-gray-400 
          bg-gray-800/50 hover:bg-gray-800/70 rounded-md transition-colors
          border border-gray-700/50"
      >
        {isActive ? "Pause Animation" : "Resume Animation"}
      </button>
    </div>
  );
};

export default InteractiveBackground;
