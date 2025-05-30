/** @format */

import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
}) => (
  <div
    className={`
      bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 rounded-xl
      ${
        hover
          ? "hover:border-gray-700/80 hover:bg-gray-900/60 transition-all duration-300"
          : ""
      }
      ${className}
    `}
  >
    {children}
  </div>
);

export default Card;
