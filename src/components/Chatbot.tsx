"use client";

import { useState, useRef, useEffect, useMemo, FormEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

/* ─── SVG Icons (no emojis) ─── */


function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#070707" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function UtensilsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/* ─── Markdown Renderer ─── */

function processInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(
        <strong key={`${keyPrefix}-b-${i}`} style={{ color: "#C8A97E", fontWeight: 600 }}>
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(<em key={`${keyPrefix}-i-${i}`}>{match[3]}</em>);
    }
    lastIndex = match.index + match[0].length;
    i++;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

function renderMarkdown(text: string): ReactNode[] {
  const lines = text.split("\n");
  const elements: ReactNode[] = [];
  let listItems: string[] = [];
  let listKey = 0;

  const flushList = (key: string) => {
    if (listItems.length === 0) return;
    elements.push(
      <ul key={key} style={{ paddingLeft: "18px", margin: "6px 0", listStyleType: "disc" }}>
        {listItems.map((item, j) => (
          <li key={j} style={{ marginBottom: "3px", color: "#E0E0E0" }}>
            {processInline(item, `${key}-${j}`)}
          </li>
        ))}
      </ul>
    );
    listItems = [];
    listKey++;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      flushList(`list-${listKey}`);
      elements.push(
        <h4 key={`h-${i}`} style={{ color: "#C8A97E", margin: "10px 0 4px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.02em" }}>
          {processInline(trimmed.slice(4), `h-${i}`)}
        </h4>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList(`list-${listKey}`);
      elements.push(
        <h3 key={`h-${i}`} style={{ color: "#C8A97E", margin: "10px 0 4px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.02em" }}>
          {processInline(trimmed.slice(3), `h-${i}`)}
        </h3>
      );
    } else if (trimmed.startsWith("# ")) {
      flushList(`list-${listKey}`);
      elements.push(
        <h3 key={`h-${i}`} style={{ color: "#C8A97E", margin: "10px 0 4px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.02em" }}>
          {processInline(trimmed.slice(2), `h-${i}`)}
        </h3>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      listItems.push(trimmed.slice(2));
    } else if (trimmed === "") {
      flushList(`list-${listKey}`);
    } else {
      flushList(`list-${listKey}`);
      elements.push(
        <p key={`p-${i}`} style={{ margin: "4px 0", lineHeight: 1.55 }}>
          {processInline(trimmed, `p-${i}`)}
        </p>
      );
    }
  }

  flushList(`list-${listKey}`);
  return elements;
}

/* ─── Chatbot Component ─── */

export default function Chatbot() {
  const { t, locale } = useTranslation();

  const suggestions = useMemo(() => [
    { icon: <UtensilsIcon />, text: t("chatbot.suggestion.0") },
    { icon: <ClockIcon />, text: t("chatbot.suggestion.1") },
    { icon: <CalendarIcon />, text: t("chatbot.suggestion.2") },
  ], [t]);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showSuggestions = messages.length === 0 && !isLoading;

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  // Tooltip: appear after 4s, stay 3s, then disappear
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 4000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Hide tooltip when chat opens
  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  // Mobile blur toggle
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isOpen && isMobile) {
      document.body.classList.add("chatbot-blur-active");
    } else {
      document.body.classList.remove("chatbot-blur-active");
    }
    return () => {
      document.body.classList.remove("chatbot-blur-active");
    };
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: content.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, locale }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content || "";
              accumulated += token;
              setStreamingContent(accumulated);
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: accumulated },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chatbot.error"),
        },
      ]);
    } finally {
      setStreamingContent("");
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ─── Mobile Backdrop (blur) ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── Chat Modal ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid #1A1A1A",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="chatbot-online-dot" />
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#F5F5F5",
                      fontFamily: "var(--font-body)",
                      lineHeight: 1.3,
                    }}
                  >
                    {t("chatbot.title")}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#6DBF6D",
                      fontFamily: "var(--font-body)",
                      marginTop: "2px",
                    }}
                  >
                    {t("chatbot.online")}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#A3A3A3",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A3A3A3")}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {/* Welcome message */}
              <div className="chatbot-msg chatbot-msg-assistant">
                <div className="chatbot-md">
                  {renderMarkdown(t("chatbot.welcome"))}
                </div>
              </div>

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chatbot-msg chatbot-msg-${msg.role}`}
                >
                  {msg.role === "assistant" ? (
                    <div className="chatbot-md">
                      {renderMarkdown(msg.content)}
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              ))}

              {/* Streaming */}
              {streamingContent && (
                <div className="chatbot-msg chatbot-msg-assistant">
                  <div className="chatbot-md">
                    {renderMarkdown(streamingContent)}
                  </div>
                  <span className="chatbot-cursor" />
                </div>
              )}

              {/* Loading dots */}
              {isLoading && !streamingContent && (
                <div className="chatbot-msg chatbot-msg-assistant">
                  <div className="chatbot-typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: "0 16px 12px",
                }}
              >
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s.text)}
                    className="chatbot-suggestion"
                  >
                    <span style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                      {s.icon}
                    </span>
                    <span style={{ fontSize: "12.5px", color: "#D4D4D4", textAlign: "left" }}>
                      {s.text}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} style={{ padding: "12px 16px 16px" }}>
              <div className="chatbot-input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("chatbot.placeholder")}
                  disabled={isLoading}
                  className="chatbot-input"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="chatbot-send-btn"
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Tooltip Message ─── */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            className="chatbot-tooltip"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {t("chatbot.tooltip")}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Sphere ─── */}
      <button
        className="chatbot-sphere"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("chatbot.openChat")}
      >
        {/* Fluid blobs */}
        <div className="sphere-fluid">
          <div className="fluid-blob fluid-blob-1" />
          <div className="fluid-blob fluid-blob-2" />
          <div className="fluid-blob fluid-blob-3" />
        </div>

        {/* 3D glass overlay */}
        <div className="sphere-glass" />

        {/* X icon when open */}
        <AnimatePresence>
          {isOpen && (
            <motion.span
              className="sphere-close-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
