"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessagesSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  time: string;
  isTyping?: boolean;
}

// Render markdown-like bold text (**text**)
function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold underline decoration-blue-500/40 underline-offset-2">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// WhatsApp-style animated typing dots
function TypingDots({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={`w-2 h-2 rounded-full ${isDark ? "bg-blue-400" : "bg-blue-600"}`}
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// Persistent session generator
function getSessionId(): string {
  if (typeof window === "undefined") return "visitor_init";
  const key = "omar_portfolio_session";
  let sid = localStorage.getItem(key);
  if (!sid) {
    sid = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(key, sid);
  }
  return sid;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === "dark";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t.chat.welcome,
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sessionId = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message if language changes before conversation starts
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === "1") {
      setMessages([
        {
          id: "1",
          text: t.chat.welcome,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [language, t.chat.welcome]);

  useEffect(() => {
    sessionId.current = getSessionId();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const botMsgs = messages.filter((m) => m.sender === "bot" && !m.isTyping);
      setUnread(botMsgs.length > 1 ? 1 : 0);
    } else {
      setUnread(0);
    }
  }, [isOpen, messages]);

  const sendMessageText = (textToSend: string) => {
    if (!textToSend.trim() || isSubmitting) return;

    const userText = textToSend.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSubmitting(true);

    // Typing indicator
    const typingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: typingId, text: "", sender: "bot", time: "", isTyping: true },
    ]);

    fetch("https://xbot-n8n.ga4gut.easypanel.host/webhook/protofolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText, sessionId: sessionId.current }),
    })
      .then((res) => res.text())
      .then((aiReply) => {
        setIsSubmitting(false);
        if (!aiReply || !aiReply.trim()) {
          setMessages((prev) => prev.filter((m) => m.id !== typingId));
          return;
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === typingId
              ? {
                  ...m,
                  text: aiReply,
                  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  isTyping: false,
                }
              : m
          )
        );
      })
      .catch(() => {
        setIsSubmitting(false);
        setMessages((prev) => prev.filter((m) => m.id !== typingId));
      });
  };

  const handleSend = () => {
    sendMessageText(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: t.chat.restarted,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* ── Floating Launcher Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center group cursor-pointer shadow-2xl overflow-hidden ${
              language === "ar" ? "left-6" : "right-6"
            }`}
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #06b6d4 100%)",
              boxShadow: "0 10px 35px rgba(59,130,246,0.55)",
            }}
            aria-label={t.chat.openAria}
          >
            {/* Shimmer line */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center">
              <MessagesSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </div>

            {/* Unread badge */}
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                {unread}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Modal Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={`fixed bottom-4 sm:bottom-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[610px] max-h-[88vh] flex flex-col rounded-3xl overflow-hidden border shadow-2xl backdrop-blur-2xl ${
              language === "ar" ? "left-4 sm:left-6" : "right-4 sm:right-6"
            }`}
            style={{
              background: isDark ? "rgba(11, 12, 19, 0.96)" : "rgba(255, 255, 255, 0.97)",
              borderColor: isDark ? "rgba(96,165,250,0.22)" : "rgba(37,99,235,0.18)",
              boxShadow: isDark
                ? "0 25px 70px rgba(0,0,0,0.75), 0 0 40px rgba(59,130,246,0.20)"
                : "0 25px 70px rgba(0,0,0,0.15), 0 0 40px rgba(37,99,235,0.10)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between flex-shrink-0 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
              }}
            >
              {/* Header Mesh Light */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/20 blur-2xl rounded-full pointer-events-none" />

              <div className="flex items-center gap-3.5 relative z-10">
                <div className="relative">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                      boxShadow: "0 4px 16px rgba(6,182,212,0.4)",
                    }}
                  >
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  {/* Glowing online status indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-blue-900 shadow-md">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-white text-sm tracking-tight">{t.chat.title}</h3>
                  <p className="text-blue-100/80 text-[11.5px] font-medium flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3 text-cyan-300 inline" />
                    <span>{t.chat.subtitle}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 relative z-10">
                <button
                  onClick={clearChat}
                  title="Reset conversation"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-header status bar */}
            <div
              className="px-4 py-2 flex items-center justify-between text-[11px] font-semibold border-b flex-shrink-0"
              style={{
                background: isDark ? "rgba(15, 17, 26, 0.90)" : "rgba(241, 245, 249, 0.90)",
                borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                color: isDark ? "#94a3b8" : "#475569",
              }}
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{t.chat.securityStatus}</span>
              </div>
            </div>

            {/* ── Messages Container ── */}
            <div
              className="flex-1 px-4 py-3 overflow-y-auto flex flex-col gap-3"
              style={{
                background: isDark ? "#08090e" : "#f8fafc",
                scrollbarWidth: "thin",
                scrollbarColor: isDark ? "#1e293b transparent" : "#cbd5e1 transparent",
              }}
            >
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                    className={`flex items-start gap-2.5 max-w-[90%] ${
                      isUser ? "self-end flex-row-reverse" : "self-start flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0 mt-1">
                      {isUser ? (
                        <div
                          className="w-7 h-7 rounded-xl flex items-center justify-center text-white shadow-md"
                          style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}
                        >
                          <User className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shadow-md border ${
                            isDark
                              ? "bg-slate-900 border-slate-800 text-cyan-400"
                              : "bg-white border-blue-200 text-blue-600"
                          }`}
                        >
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Bubble */}
                    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-4 py-3 text-xs md:text-sm leading-relaxed shadow-sm backdrop-blur-md ${
                          isUser
                            ? "text-white font-medium shadow-blue-500/10"
                            : isDark
                            ? "bg-[#11131f] text-slate-200 border border-slate-800/90"
                            : "bg-white text-slate-800 border border-slate-200 shadow-slate-200/50"
                        }`}
                        style={{
                          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                          background: isUser
                            ? "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)"
                            : undefined,
                        }}
                      >
                        {msg.isTyping ? (
                          <TypingDots isDark={isDark} />
                        ) : (
                          <span className="whitespace-pre-line break-words">
                            {renderText(msg.text)}
                          </span>
                        )}
                      </div>
                      {!msg.isTyping && msg.time && (
                        <span className={`text-[10px] mt-1 px-1 font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                          {msg.time}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input Box Container ── */}
            <div
              className="px-3.5 py-3 flex-shrink-0 border-t"
              style={{
                background: isDark ? "#0e1017" : "#ffffff",
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
              }}
            >
              <div
                className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 border transition-all focus-within:ring-2 ${
                  isDark
                    ? "bg-[#161825] border-slate-800 focus-within:border-blue-500/50 focus-within:ring-blue-500/20"
                    : "bg-slate-50 border-slate-200 focus-within:border-blue-500/40 focus-within:ring-blue-500/10"
                }`}
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t.chat.placeholder}
                  rows={1}
                  className={`flex-1 bg-transparent border-none focus:outline-none resize-none text-xs md:text-sm py-1.5 min-h-[30px] max-h-24 custom-scrollbar font-medium ${
                    isDark ? "text-white placeholder:text-slate-500" : "text-slate-900 placeholder:text-slate-400"
                  }`}
                  style={{ lineHeight: "1.4" }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isSubmitting}
                  className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-30 cursor-pointer shadow-md"
                  style={{
                    background: input.trim()
                      ? "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)"
                      : isDark ? "#1e293b" : "#cbd5e1",
                    boxShadow: input.trim() ? "0 4px 14px rgba(59,130,246,0.40)" : "none",
                  }}
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

