/** @format */

import React, { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className = "" }) => (
  <div
    className={`bg-gray-950/80 border border-gray-800/60 rounded-lg p-4 font-mono text-sm ${className}`}
  >
    <div className="flex items-center gap-2 mb-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="text-gray-500 text-xs">terminal</div>
    </div>
    <div className="text-gray-300">{children}</div>
  </div>
);

export default CodeBlock;
