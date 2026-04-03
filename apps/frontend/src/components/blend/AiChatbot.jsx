import React, { useState } from "react";
import { Sparkles, Send, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const quickActions = [
  "Suggest Blend",
  "Optimize for longevity",
  "Show YSL Bestsellers",
  "Remove gourmand notes"
];

export default function AiChatbot({ onSuggest }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Ready to help you create the perfect blend. Ask me anything!" }
  ]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: "Based on your current selection, I recommend increasing Woody notes to 80% for better longevity. Shall I apply this?"
      }]);
    }, 800);
  };

  return (
    <motion.div
      className="mx-6 mt-4 glass-card-strong rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-white">AI Agent</p>
          <p className="text-[10px] text-emerald-400 uppercase tracking-wider">Ready</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      {/* Expanded Chat */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Messages */}
            <div className="px-4 pb-3 max-h-48 overflow-y-auto space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${
                      msg.role === "user"
                        ? "bg-[#D4AF37] text-black"
                        : "bg-neutral-800/80 text-neutral-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-4 pb-3 flex gap-2 overflow-x-auto">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => onSuggest?.(action)}
                  className="px-3 py-1.5 rounded-full bg-neutral-800/60 border border-neutral-700 text-[10px] text-neutral-400 whitespace-nowrap hover:bg-neutral-700 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-neutral-900/80 rounded-xl px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask AI for suggestions..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-neutral-600 outline-none"
                />
                <button className="w-6 h-6 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-neutral-700">
                  <Mic className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.5} />
                </button>
              </div>
              <button
                onClick={handleSend}
                className="w-8 h-8 rounded-xl bg-[#D4AF37] flex items-center justify-center hover:bg-[#B38728] transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-black" strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}