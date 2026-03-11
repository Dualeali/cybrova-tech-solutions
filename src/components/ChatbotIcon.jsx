import React from "react";
import { Bot } from "lucide-react";

function ChatbotIcon({ className = "" }) {
  return (
    <div className={`bot-avatar ${className}`}>
      <Bot size={20} strokeWidth={2.5} color="#111" />
    </div>
  );
}

export default ChatbotIcon;
