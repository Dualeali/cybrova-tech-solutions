import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import ChatbotIcon from "./ChatbotIcon";

function ChatMessage({ sender, text, timestamp }) {
  const isBot = sender === "bot";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`message ${isBot ? "bot-message" : "user-message"}`}
    >
      {isBot && <ChatbotIcon />}
      <div className="message-content">
        <div className="message-text">
          {isBot ? (
            <>
              <button
                className="copy-btn"
                onClick={handleCopy}
                aria-label="Copy message"
                title="Copy message"
              >
                {copied ? <Check size={12} strokeWidth={3} /> : <Copy size={12} strokeWidth={2.5} />}
              </button>
              <ReactMarkdown>{text}</ReactMarkdown>
            </>
          ) : (
            <p>{text}</p>
          )}
        </div>
        <span className="message-timestamp">{timestamp}</span>
      </div>
    </motion.div>
  );
}

export default ChatMessage;
