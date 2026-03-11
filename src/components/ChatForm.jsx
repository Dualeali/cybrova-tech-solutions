import React, { useState } from "react";
import { Send } from "lucide-react";

function ChatForm({ onSendMessage }) {
  const [value, setValue] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    if (typeof onSendMessage === "function") {
      onSendMessage(trimmed);
    }

    setValue("");
  };

  return (
    <form action="#" className="input-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="message"
        placeholder="Type your message..."
        className="message-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        className="send-button"
        disabled={!value.trim()}
        aria-label="Send message"
      >
        <Send size={18} strokeWidth={2.5} />
      </button>
    </form>
  );
}

export default ChatForm;
