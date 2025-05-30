/** @format */
"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import { MousePosition, InteractiveBackgroundProps } from "../types/types";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface Click {
  id: number;
  x: number;
  y: number;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  mousePosition,
}) => {
  const [clicks, setClicks] = useState<Click[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);

    // Animate particles
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y > 100 ? -5 : particle.y + particle.speed,
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newClick: Click = {
      id: Date.now(),
      x,
      y,
    };

    setClicks((prev) => [...prev, newClick]);

    setTimeout(() => {
      setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
    }, 1000);
  };

  return (
    <div className="fixed inset-0 -z-10 cursor-crosshair" onClick={handleClick}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />

      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 51, 234, 0.15) 25%, 
            rgba(16, 185, 129, 0.1) 50%, 
            transparent 70%)`,
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, ${
            0.3 + (mousePosition.x / 100) * 0.2
          }) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, ${
                             0.3 + (mousePosition.y / 100) * 0.2
                           }) 1px, transparent 1px)`,
          backgroundSize: `${20 + (mousePosition.x / 100) * 20}px ${
            20 + (mousePosition.y / 100) * 20
          }px`,
          transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${
            (mousePosition.y - 50) * 0.1
          }px)`,
        }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `scale(${particle.size})`,
            opacity: particle.opacity,
            animation: `float ${3 + particle.speed}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Ripple Effects */}
      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute pointer-events-none"
          style={{ left: `${click.x}%`, top: `${click.y}%` }}
        >
          <div className="w-4 h-4 border-2 border-blue-400/60 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" />
          <div className="w-8 h-8 border border-purple-400/40 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2 animation-delay-150" />
        </div>
      ))}

      {/* Code Snippets */}
      <FloatingCode mousePosition={mousePosition} />

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

const FloatingCode = ({ mousePosition }: { mousePosition: MousePosition }) => (
  <>
    <div
      className="absolute top-32 left-16 opacity-60 transition-all duration-500"
      style={{
        transform: `translate(${(mousePosition.x - 50) * 0.2}px, ${
          (mousePosition.y - 50) * 0.1
        }px) rotate(${12 + (mousePosition.x - 50) * 0.1}deg)`,
      }}
    >
      <div className="text-blue-400/80 font-mono text-sm hover:text-blue-300 transition-colors">
        {"<div>"}
      </div>
    </div>
    <div
      className="absolute top-64 right-24 opacity-60 transition-all duration-500"
      style={{
        transform: `translate(${(mousePosition.x - 50) * -0.15}px, ${
          (mousePosition.y - 50) * 0.2
        }px) rotate(${-12 + (mousePosition.x - 50) * -0.1}deg)`,
      }}
    >
      <div className="text-purple-400/80 font-mono text-sm hover:text-purple-300 transition-colors">
        {"{ }"}
      </div>
    </div>
    <div
      className="absolute bottom-48 left-32 opacity-60 transition-all duration-500"
      style={{
        transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${
          (mousePosition.y - 50) * -0.15
        }px) rotate(${45 + (mousePosition.x - 50) * 0.05}deg)`,
      }}
    >
      <div className="text-emerald-400/80 font-mono text-sm hover:text-emerald-300 transition-colors">
        {"[]"}
      </div>
    </div>
    <div
      className="absolute top-1/2 right-1/4 opacity-60 transition-all duration-500"
      style={{
        transform: `translate(${(mousePosition.x - 50) * -0.1}px, ${
          (mousePosition.y - 50) * 0.1
        }px) rotate(${(mousePosition.x - 50) * 0.1}deg)`,
      }}
    >
      <div className="text-cyan-400/80 font-mono text-sm hover:text-cyan-300 transition-colors">
        {"( )"}
      </div>
    </div>
  </>
);

export default InteractiveBackground;
