import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import ChatbotIcon from "./ChatbotIcon";

function ChatMessage({ sender, text, timestamp, animated }) {
  const isBot = sender === "bot";
  const [copied, setCopied] = useState(false);
  const hasAnimated = React.useRef(!animated);
  const [displayedText, setDisplayedText] = useState(hasAnimated.current ? text : "");

  React.useEffect(() => {
    if (!isBot || hasAnimated.current) {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 4; // Reveal 4 characters at a time for blazing speed
      setDisplayedText(text.slice(0, i));
      
      const chatBody = document.querySelector(".chat-body");
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }

      if (i >= text.length) {
        clearInterval(interval);
        hasAnimated.current = true;
      }
    }, 5);
    
    return () => clearInterval(interval);
  }, [text, isBot]);

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
              <ReactMarkdown>{displayedText}</ReactMarkdown>
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
