import React from "react";
import ReactMarkdown from "react-markdown";
import ChatbotIcon from "./chatbotIcon";

function ChatMessage({ sender, text, timestamp }) {
  const isBot = sender === "bot";

  return (
    <div className={`message ${isBot ? "bot-message" : "user-message"}`}>
      {isBot && <ChatbotIcon />}
      <div className="message-content">
        <div className="message-text">
          {isBot ? <ReactMarkdown>{text}</ReactMarkdown> : <p>{text}</p>}
        </div>
        <span className="message-timestamp">{timestamp}</span>
      </div>
    </div>
  );
}

export default ChatMessage;

