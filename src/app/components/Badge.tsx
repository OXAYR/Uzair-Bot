/** @format */

import React, { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "accent";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default" }) => {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-gray-800/80 text-gray-300 border-gray-700/50",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    accent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
