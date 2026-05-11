import React from "react";
import { Sparkles } from "lucide-react";

function ChatbotIcon({ className = "" }) {
  return (
    <div className={`bot-avatar ${className}`}>
      <Sparkles size={16} strokeWidth={2.5} color="#111" />
    </div>
  );
}

export default ChatbotIcon;
