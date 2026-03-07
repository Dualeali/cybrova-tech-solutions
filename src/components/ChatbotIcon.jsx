import React from "react";

function ChatbotIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className="w-12 h-12 text-indigo-600"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
    >
      {/* Head - Enhanced with gradient effect */}
      <defs>
        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" stopOpacity="1" />
          <stop offset="100%" stopColor="#764ba2" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#f0f0f0" stopOpacity="1" />
        </linearGradient>
      </defs>
      
      {/* Head with rounded corners */}
      <rect 
        x="200" 
        y="300" 
        width="624" 
        height="400" 
        rx="80" 
        fill="url(#headGradient)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="4"
      />

      {/* Eyes - Enhanced with shine effect */}
      <circle 
        cx="400" 
        cy="500" 
        r="50" 
        fill="url(#eyeGradient)"
        opacity="0.95"
      />
      <circle 
        cx="400" 
        cy="500" 
        r="30" 
        fill="#667eea"
      />
      <circle 
        cx="400" 
        cy="500" 
        r="15" 
        fill="#2d3748"
      />
      <circle 
        cx="405" 
        cy="495" 
        r="6" 
        fill="#ffffff"
        opacity="0.8"
      />

      <circle 
        cx="624" 
        cy="500" 
        r="50" 
        fill="url(#eyeGradient)"
        opacity="0.95"
      />
      <circle 
        cx="624" 
        cy="500" 
        r="30" 
        fill="#667eea"
      />
      <circle 
        cx="624" 
        cy="500" 
        r="15" 
        fill="#2d3748"
      />
      <circle 
        cx="629" 
        cy="495" 
        r="6" 
        fill="#ffffff"
        opacity="0.8"
      />

      {/* Mouth - Enhanced smile */}
      <path 
        d="M 424 620 Q 512 680 600 620" 
        stroke="url(#eyeGradient)"
        strokeWidth="40" 
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* Antenna - Enhanced */}
      <rect 
        x="492" 
        y="180" 
        width="40" 
        height="120" 
        rx="20" 
        fill="url(#headGradient)"
      />
      <circle 
        cx="512" 
        cy="150" 
        r="40" 
        fill="url(#headGradient)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="3"
      />
      <circle 
        cx="512" 
        cy="150" 
        r="20" 
        fill="rgba(255,255,255,0.4)"
      />
    </svg>
  );
}

export default ChatbotIcon;
