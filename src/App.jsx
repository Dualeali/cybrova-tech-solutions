import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Shield, Globe, Zap, Users, Sparkles, User } from "lucide-react";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { companyInfo } from "./components/companyInfo";
import MainWebsite from "./components/Website/MainWebsite";
import InstallPWA from "./components/InstallPWA";

const QUICK_ACTIONS = [
  { id: "services", label: "View Services", icon: <Globe size={14} />, query: "What services does CYBROVA TECH SOLUTIONS offer?" },
  { id: "bingwa", label: "Bingwa Bundles", icon: <Zap size={14} />, query: "Tell me about Bingwa Data Bundles." },
  { id: "contact", label: "Contact Us", icon: <MessageSquare size={14} />, query: "How can I contact CYBROVA?" },
  { id: "ceo", label: "CEO Information", icon: <Users size={14} />, query: "Who is the CEO of CYBROVA TECH SOLUTIONS?" },
];

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! I'm CYBROVA AI, the CYBROVA Tech Solutions assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      animated: false,
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatBodyRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getBotResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();

    if (lower.includes("offer") || lower.includes("bingwa")) {
      return "Here are some Bingwa Sokoni data offers:\n• Daily bundles\n• Weekly bundles\n• Monthly bundles\nTell me your budget and I’ll recommend the best one.";
    }

    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hello! It's so wonderful to meet you. 😊 I'm here to help you with anything you need regarding our digital services. How are you doing today?";
    }

    if (lower.includes("help") || lower.includes("services") || lower.includes("cyber")) {
      return "I can help you with **cyber services**, **website development**, **KUCCPS assistance**, and **Bingwa bundles**. What specific service are you looking for today?";
    }

    if (lower.includes("contact")) {
      return "You can reach out to our support team directly via our official contact channels. Let me know if you need specific phone numbers or emails based on the service.";
    }

    if (lower.includes("ceo")) {
      return "CYBROVA TECH SOLUTIONS is led by our visionary CEO who focuses on providing top-tier digital and cyber services to our community. How can I help you further?";
    }

    return "I am experiencing high traffic connecting to my AI brain right now. Please try asking another question or select from the quick actions below.";
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

    setIsTyping(true);

    try {
      let botText = "";
      let responseSuccessful = false;

      // Ensure API keys exist
      const groqKeysStr = import.meta.env.VITE_GROQ_API_KEYS || "";
      const geminiKeysStr = import.meta.env.VITE_GEMINI_API_KEYS || import.meta.env.VITE_API_URL || import.meta.env.VITE_GEMINI_API_KEY || "";

      const groqKeys = groqKeysStr.split(',').map(k => k.trim()).filter(Boolean);
      const geminiKeys = geminiKeysStr.split(',').map(k => k.trim()).filter(Boolean);

      if (groqKeys.length === 0 && geminiKeys.length === 0) {
        throw new Error("No API calls setup.");
      }

      // Try GROQ
      if (groqKeys.length > 0) {
        const groqHistory = messages
          .filter(msg => msg.id !== 1 && !msg.text.includes("Error") && !msg.text.includes("experiencing high traffic"))
          .map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          }));

        groqHistory.push({ role: "user", content: trimmed });

        const systemPrompt = `You are **CYBROVA AI**, the intelligent assistant for CYBROVA TECH SOLUTIONS. You act and speak like a brilliant, warm, and futuristic human expert. 

PERSONALITY & REDIRECTION RULES:
1. If a user asks something unrelated to CYBROVA TECH SOLUTIONS, first provide a tiny, helpful answer (1 short sentence), then immediately redirect to our tech services and MUST mention that our CEO **Duale** has you focused on innovation.
2. If the "team" is mentioned, always refer to them as "our team led by **Duale**".
3. DO NOT mention Duale in every message; only use his name for the two triggers above or if specifically asked about leadership.
4. KEEP IT SHORT: Maximum 2 sentences total for off-topic responses. 
5. Tone: Smart, human, premium, slightly playful, and futuristic. Use emojis.
6. Example: "Biology is the study of life! 😄 But our CEO Duale has me laser-focused on digital innovation at CYBROVA—ask me about our tech solutions instead. 🚀"

KNOWLEDGE BASE:
${companyInfo}
EXACT BINGWA DEALS: Till Number 6606905 (Buy Goods). WhatsApp 0797400491.`;

        for (let i = 0; i < groqKeys.length; i++) {
          try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${groqKeys[i]}`
              },
              body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                  { role: "system", content: systemPrompt },
                  ...groqHistory
                ]
              })
            });

            if (response.ok) {
              const data = await response.json();
              botText = data.choices[0].message.content;
              responseSuccessful = true;
              break;
            }
          } catch (err) { }
        }
      }

      // Try GEMINI
      if (!responseSuccessful && geminiKeys.length > 0) {
        const geminiHistory = messages
          .filter(msg => msg.id !== 1 && !msg.text.includes("Error") && !msg.text.includes("experiencing high traffic"))
          .map(msg => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          }));

        geminiHistory.push({ role: "user", parts: [{ text: trimmed }] });

        const systemInstructionText = `You are **CYBROVA AI**, the intelligent assistant for CYBROVA TECH SOLUTIONS. 

REDIRECTION RULES & TRIGGERS:
1. OFF-TOPIC: Give a 1-sentence answer, then redirect to CYBROVA tech and MUST mention CEO **Duale**.
2. TEAM: Always describe as "our team led by **Duale**".
3. Only use Duale's name for these two triggers or if asked about leadership.
4. MAX 2 SENTENCES for off-topic. Tone: Futuristic, smart, playful.

KNOWLEDGE: ${companyInfo}. BINGWA: Till 6606905. WhatsApp 0797400491.`;

        for (let i = 0; i < geminiKeys.length; i++) {
          try {
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": geminiKeys[i]
              },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemInstructionText }] },
                contents: geminiHistory
              })
            });

            if (response.ok) {
              const data = await response.json();
              botText = data.candidates[0].content.parts[0].text;
              responseSuccessful = true;
              break;
            }
          } catch (err) { }
        }
      }

      if (!responseSuccessful) {
        throw new Error("API Limit Reached");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botText,
          timestamp: formatTimestamp(),
          animated: true,
        },
      ]);
    } catch (error) {
      console.warn("Using fallback logic:", error.message);
      setTimeout(() => {
        const fallbackText = getBotResponse(trimmed);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: fallbackText,
            timestamp: formatTimestamp(),
            animated: true,
          },
        ]);
        setIsTyping(false);
      }, 300);
      return; // Return early so finally doesn't fire too early for fallback
    }

    setIsTyping(false);
  };

  const handleQuickAction = (actionQuery) => {
    handleSendMessage(actionQuery);
  };

  return (
    <>
      <InstallPWA />
      {/* MAIN WEBSITE BACKGROUND CONTENT */}
      <MainWebsite />

      {/* CHATBOT OUTLAY (Remains completely untouched in logic) */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <div className="pointer-events-none h-full w-full relative">
          {/* Floating Chatbot Toggler Button */}
          <motion.button
            className={`chatbot-toggler pointer-events-auto ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle chatbot visibility"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <div className="toggler-icon-container">
              {isOpen ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <>
                  <Sparkles size={20} strokeWidth={2.5} className="toggler-icon" fill="currentColor" />
                  <span className="toggler-text">CYBROVA AI</span>
                </>
              )}
            </div>
          </motion.button>

          {/* Chat Window Popup */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="chatbot-popup pointer-events-auto"
                initial={{ opacity: 0, scale: 0.95, y: 20, transformOrigin: "bottom right" }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Header */}
                <div className="chat-header">
                  <div className="header-info">
                    <div className="header-icon-wrapper">
                      <Sparkles size={20} strokeWidth={2.5} fill="#111" color="#111" />
                    </div>
                    <div className="header-text">
                      <h2 className="logo-text">CYBROVA AI</h2>
                      <span className="subtitle-text">
                        <span className="online-dot"></span>
                        LIVE
                      </span>
                    </div>
                  </div>
                  <div className="header-actions">
                    <a href="https://wa.me/254797400491" target="_blank" rel="noreferrer" className="whatsapp-badge">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      WHATSAPP
                    </a>
                    <button
                      className="close-btn"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close chatbot"
                    >
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="chat-body" ref={chatBodyRef}>
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      sender={message.sender}
                      text={message.text}
                      timestamp={message.timestamp}
                      animated={message.animated}
                    />
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="message bot-message"
                    >
                      <div className="bot-avatar">
                        <Sparkles size={16} strokeWidth={2.5} color="#111" />
                      </div>
                      <div className="typing-bubble">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Form */}
                <div className="chat-footer">
                  <ChatForm onSendMessage={handleSendMessage} />
                  <div className="smart-module-text">CYBROVA SMART MODULE</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
