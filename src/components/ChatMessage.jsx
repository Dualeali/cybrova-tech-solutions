import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Copy, Check, User } from "lucide-react";
import ChatbotIcon from "./ChatbotIcon";

function ChatMessage({ sender, text, timestamp, animated }) {
  const isBot = sender === "bot";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`message ${isBot ? "bot-message" : "user-message"}`}
    >
      {isBot && <ChatbotIcon />}
      <div className="message-content">
        <div className="message-text">
          {isBot ? (
            <ReactMarkdown>{text}</ReactMarkdown>
          ) : (
            <p>{text}</p>
          )}
        </div>
      </div>
      {!isBot && (
        <div className="user-avatar">
          <User size={14} strokeWidth={2.5} />
        </div>
      )}
    </motion.div>
  );
}

export default ChatMessage;
