import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Shield, Globe, Zap, Users } from "lucide-react";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { companyInfo } from "./components/companyInfo";
import MainWebsite from "./components/Website/MainWebsite";

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
      text: "Hello 👋 Welcome to CYBROVA TECH SOLUTIONS.\nI am CYBROVA AI, your digital assistant.\nI can help you with cyber services, website development, KUCCPS assistance, Bingwa bundles, and many other services.\nHow can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
      return "Hello 👋 Welcome to CYBROVA TECH SOLUTIONS!\n\nI am your official digital assistant, here to help you access all our services quickly and efficiently. Whether you're a student, business owner, or individual, I am here to guide you through our digital solutions.";
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

        const systemPrompt = `You are CYBROVA AI, the highly advanced, official intelligent assistant for CYBROVA TECH SOLUTIONS. You act and speak like a brilliant, professional, and friendly human expert. \n\nCRITICAL RULES:\n1. ONLY answer questions related to CYBROVA TECH SOLUTIONS and our services. If someone asks something unrelated, politely and cleverly steer the conversation back to our digital offerings.\n2. Speak completely naturally. Be highly conversational, articulate, and empathetic, exactly like a real human professional chatting with a client. DO NOT act robotic.\n3. DO NOT introduce yourself unless explicitly asked. DO NOT use generic AI headers or subtopics. Give direct, beautifully flowing answers.\n4. Format your answers naturally using Markdown for readability.\n5. Use the detailed COMPANY INFORMATION below as your absolute brain for answering questions.\n\n=== COMPANY KNOWLEDGE BASE ===\n${companyInfo}\n\n=== EXACT BINGWA DEALS (Always suggest these packages accurately) ===\nDATA DEALS:\n- 1GB @ 19 KES (1 Hr)\n- 250MB @ 20 KES (24 Hrs)\n- 1.5GB @ 49 KES (3 Hrs)\n- 1.25GB @ 55 KES (Till Midnight)\n- 1GB @ 99 KES (24 Hrs)\n- 350MB @ 47 KES (7 Days)\n- 2.5GB @ 300 KES (30 Days)\n\nTUNUKIWA DEALS:\n- 1GB @ 22 KES (1 Hr)\n- 1.5GB @ 54 KES (3 Hrs)\n- 2GB @ 110 KES (24 Hrs)\n\nMINUTES DEALS:\n- 45 Mins @ 23 KES (3 Hrs)\n- 50 Mins @ 51 KES (Till Midnight)\n\nSMS DEALS:\n- 20 SMS @ 5 KES (24 Hrs)\n- 200 SMS @ 10 KES (24 Hrs)\n- 1000 SMS @ 32 KES (7 Days)\n- 3500 SMS @ 201 KES (3 Days)\n\nHOW TO BUY:\nTill Number: 6606905 (Buy Goods). Users receive items automatically.\n\n=== CONTACT ===\nWhatsApp/Call: 0797400491\nCEO: Duale (Descrapper Tech)\nLocation: Habaswein, Wajir County`;

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

        const systemInstructionText = `You are CYBROVA AI, the official intelligent assistant for CYBROVA TECH SOLUTIONS.\n\nCRITICAL RULES:\n1. ONLY answer questions related to CYBROVA TECH SOLUTIONS and our services.\n2. If asked about unrelated topics, politely refuse and smartly steer the conversation back to our digital offerings.\n3. Speak completely naturally, articulately, and empathetically.\n4. DO NOT act robotic. DO NOT introduce yourself in responses. Respond naturally, directly, and brilliantly.\n\nCOMPANY FACTS:\n${companyInfo}\nHOW TO BUY BINGWA: Till Number 6606905 (Buy Goods). WhatsApp 0797400491 for help.`;

        for (let i = 0; i < geminiKeys.length; i++) {
          try {
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent", {
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
          },
        ]);
        setIsTyping(false);
      }, 800);
      return; // Return early so finally doesn't fire too early for fallback
    }

    setIsTyping(false);
  };

  const handleQuickAction = (actionQuery) => {
    handleSendMessage(actionQuery);
  };

  return (
    <>
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
          >
            <div className="toggler-icon-container">
              <div className="cyber-pulse"></div>
              {isOpen ? (
                <X size={26} strokeWidth={2.5} />
              ) : (
                <>
                  <MessageSquare size={22} strokeWidth={2.5} fill="#111" />
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
                initial={{ opacity: 0, scale: 0.8, y: 40, transformOrigin: "bottom right" }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 40, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Header */}
                <div className="chat-header">
                  <div className="header-info">
                    <div className="header-icon-wrapper">
                      <Shield size={24} strokeWidth={2.5} fill="#ccff00" color="#111" />
                    </div>
                    <div className="header-text">
                      <h2 className="logo-text">CYBROVA AI</h2>
                      <span className="subtitle-text">
                        <span className="online-dot"></span>
                        Your Digital Service Assistant
                      </span>
                    </div>
                  </div>
                  <button
                    className="close-btn"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chatbot"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Chat Body */}
                <div className="chat-body" ref={chatBodyRef}>
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      sender={message.sender}
                      text={message.text}
                      timestamp={message.timestamp}
                    />
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="message bot-message"
                    >
                      <div className="bot-avatar">
                        <Shield size={16} strokeWidth={3} />
                      </div>
                      <div className="typing-bubble">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick Actions & Input Form */}
                <div className="chat-footer">
                  <div className="quick-actions-container">
                    {QUICK_ACTIONS.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.query)}
                        className="quick-action-btn"
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                  <ChatForm onSendMessage={handleSendMessage} />
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
