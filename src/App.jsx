import React, { useState, useEffect } from "react";
import ChatbotIcon from "./components/chatbotIcon";
import ChatForm from "./components/chatform";
import ChatMessage from "./components/ChatMessage";
import { companyInfo } from "./components/companyInfo";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello there 👋 This is CYBROVA AI assistant, how can I help you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    const chatBody = document.querySelector(".chat-body");
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBotResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();

    if (lower.includes("offer") || lower.includes("bingwa")) {
      return "Here are some Bingwa Sokoni data offers:\n• Daily bundles\n• Weekly bundles\n• Monthly bundles\nTell me your budget and I’ll recommend the best one.";
    }

    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hello 👋 Welcome to CYBROVA TECH SOLUTIONS!\n\nI am your official digital assistant, here to help you access all our services quickly and efficiently. Whether you're a student, business owner, or individual, I am here to guide you through our digital solutions.";
    }

    if (lower.includes("help")) {
      return "I can help you with data offers, product questions, and general support. What would you like to know?";
    }

    // For now, no fallback text. We'll integrate real Gemini API responses later.
    return "";
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText || !messageText.trim()) return;

    const trimmed = messageText.trim();

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: trimmed,
        timestamp: formatTimestamp(),
      },
    ]);

    // Show typing indicator
    setIsTyping(true);

    try {
      let botText = "";
      let responseSuccessful = false;

      // 1. Prepare keys from environment variables (comma-separated lists)
      const groqKeysStr = import.meta.env.VITE_GROQ_API_KEYS || "";
      const geminiKeysStr = import.meta.env.VITE_GEMINI_API_KEYS || import.meta.env.VITE_API_URL || import.meta.env.VITE_GEMINI_API_KEY || "";

      const groqKeys = groqKeysStr.split(',').map(k => k.trim()).filter(Boolean);
      const geminiKeys = geminiKeysStr.split(',').map(k => k.trim()).filter(Boolean);

      if (groqKeys.length === 0 && geminiKeys.length === 0) {
        throw new Error("No API keys found in .env file.");
      }

      // 2. Try GROQ First (Primary - Fast)
      if (groqKeys.length > 0) {
        // Build Groq history (OpenAI format)
        const groqHistory = messages
          .filter(msg => msg.id !== 1 && !msg.text.includes("Error connecting"))
          .map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          }));

        groqHistory.push({ role: "user", content: trimmed });

        const systemPrompt = `You are the official digital assistant for CYBROVA TECH SOLUTIONS. \nYou are helpful, friendly, and professional. \n\nCRITICAL RULES:\n1. Base your answers ONLY on the provided Company Information.\n2. If a user asks a question that cannot be answered using the Company Information, politely tell them that you are an assistant for CYBROVA TECH SOLUTIONS and can only help with our services.\n3. Format your answers beautifully using Markdown (bolding, lists, etc) so it is easy to read.\n4. When a user first says hi or hello, your FIRST RESPONSE MUST BE EXACTLY this text and nothing else: "Hello 👋 Welcome to CYBROVA TECH SOLUTIONS!\n\nI am your official digital assistant, here to help you access all our services quickly and efficiently. Whether you're a student, business owner, or individual, I am here to guide you through our digital solutions."\n\nCOMPANY INFORMATION:\n${companyInfo}`;

        // Loop through all available Groq keys
        for (let i = 0; i < groqKeys.length; i++) {
          try {
            console.log(`Trying Groq Key ${i + 1}/${groqKeys.length}...`);
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${groqKeys[i]}`
              },
              body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Fast and highly capable model
                messages: [
                  { role: "system", content: systemPrompt },
                  ...groqHistory
                ]
              })
            });

            if (response.ok) {
              const data = await response.json();
              if (data.choices && data.choices.length > 0) {
                botText = data.choices[0].message.content;
                responseSuccessful = true;
                break; // Success! Exit the Groq key loop
              }
            } else {
              console.warn(`Groq key ${i + 1} failed with status: ${response.status}`);
            }
          } catch (err) {
            console.warn(`Groq key ${i + 1} encountered an error:`, err);
          }
        }
      }

      // 3. Try GEMINI Second (Fallback)
      if (!responseSuccessful && geminiKeys.length > 0) {
        console.log("Groq unavailable or all keys exhausted. Falling back to Gemini...");

        // Build Gemini history
        const geminiHistory = messages
          .filter(msg => msg.id !== 1 && !msg.text.includes("Error connecting"))
          .map(msg => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          }));

        geminiHistory.push({ role: "user", parts: [{ text: trimmed }] });

        const systemInstructionText = `You are the official digital assistant for CYBROVA TECH SOLUTIONS. \nYou are helpful, friendly, and professional. \n\nCRITICAL RULES:\n1. Base your answers ONLY on the provided Company Information.\n2. If a user asks a question that cannot be answered using the Company Information, politely tell them that you are an assistant for CYBROVA TECH SOLUTIONS and can only help with our services.\n3. Format your answers beautifully using Markdown (bolding, lists, etc) so it is easy to read.\n4. When a user first says hi or hello, your FIRST RESPONSE MUST BE EXACTLY this text and nothing else: "Hello 👋 Welcome to CYBROVA TECH SOLUTIONS!\n\nI am your official digital assistant, here to help you access all our services quickly and efficiently. Whether you're a student, business owner, or individual, I am here to guide you through our digital solutions."\n\nCOMPANY INFORMATION:\n${companyInfo}`;

        // Loop through all available Gemini keys
        for (let i = 0; i < geminiKeys.length; i++) {
          try {
            console.log(`Trying Gemini Key ${i + 1}/${geminiKeys.length}...`);
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": geminiKeys[i]
              },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: systemInstructionText }]
                },
                contents: geminiHistory
              })
            });

            if (response.ok) {
              const data = await response.json();
              if (data.candidates && data.candidates.length > 0) {
                botText = data.candidates[0].content.parts[0].text;
                responseSuccessful = true;
                break; // Success! Exit the Gemini key loop
              }
            } else {
              console.warn(`Gemini key ${i + 1} failed with status: ${response.status}`);
            }
          } catch (err) {
            console.warn(`Gemini key ${i + 1} encountered an error:`, err);
          }
        }
      }

      // 4. Final Verification
      if (!responseSuccessful) {
        throw new Error("All API keys configured for Groq and Gemini failed or were rate-limited. Please try again later.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botText,
          timestamp: formatTimestamp(),
        },
      ]);
    } catch (error) {
      console.error("Chat API Error details:", error.message);
      const fallbackText = getBotResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: fallbackText || `Error connecting to AI: ${error.message}`,
          timestamp: formatTimestamp(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`container ${isOpen ? "show-chatbot" : ""}`}>
      <button
        className="chatbot-toggler"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot visibility"
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded close-icon">close</span>
      </button>

      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">chatbot</h2>
          </div>
          <button
            className="material-symbols-rounded"
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot"
          >
            keyboard_arrow_down
          </button>
        </div>

        <div className="chat-body">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              sender={message.sender}
              text={message.text}
              timestamp={message.timestamp}
            />
          ))}

          {isTyping && (
            <div className="message bot-message thinking-message">
              <ChatbotIcon />
              <div className="typing-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="thinking-text">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-footer">
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
