import React, { useState, useRef, useEffect } from "react";
import styles from "./AppChatBox.module.css";

function AppChatBox({ user, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const userImage = user.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  // Initial greeting
  useEffect(() => {
    const initialMsg = {
      sender: "bot",
      text: `Hey! 😊 I'm ${user.username}. Nice to meet you!`
    };
    setTimeout(() => setMessages([initialMsg]), 1000);
  }, [user.username]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Bot smart responses
  const getBotResponse = (text) => {
    text = text.toLowerCase();

    if (/(marry|wedding|husband|wife)/.test(text))
      return "Marriage is a big step, but imagine a cozy beach ceremony at sunset 🌅. What do you think?";
    if (/(date|meet|coffee|hang out)/.test(text))
      return `I'd love to! Maybe we could grab coffee ☕. Are you more spontaneous or a planner?`;
    if (/(cute|beautiful|love|handsome)/.test(text)) {
      const replies = [
        "Aww, that's sweet! 😄",
        "You're making me blush! 😉",
        "Haha, you really know how to charm someone!"
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }
    if (/(hobby|fun|passion|free time)/.test(text))
      return "I enjoy weekend trips and trying new foods 🍕. What about you?";
    if (/(age|years|live|location|city)/.test(text))
      return `I'm ${user.age} and live in ${user.city}. 📍 Old soul alert though!`;
    if (/(how are you|doing|up to)/.test(text))
      return "Doing great! 😄 Just enjoying this chat. How's your day going?";

    // Fallbacks
    const fallbacks = [
      "Tell me more about that! ✨",
      "Haha, really? 😅",
      "Interesting! What else?",
      "You're fun to chat with! 😎",
      "Curious... what caught your eye on my profile? 😉"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  // Send message
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const botReply = getBotResponse(input);
    const typingDelay = Math.min(Math.max(botReply.length * 50, 1200), 3500);

    setTimeout(() => setIsTyping(true), 300);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, typingDelay);
  };

  return (
    <div className={styles.appChatbox}>
      {/* Header */}
      <div className={styles.appChatboxHeader}>
        <div className={styles.headerProfile}>
          <img src={userImage} alt="avatar" className={styles.headerAvatar} />
          <div className={styles.headerInfo}>
            <strong className={styles.headerName}>{user.username}</strong>
            <span className={styles.onlineStatus}>Online • Chatting 💬</span>
          </div>
        </div>
        <button onClick={onClose} className={styles.closeBtn}>✕</button>
      </div>

      {/* Messages */}
      <div className={styles.appChatboxMessages}>
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? styles.userRow : styles.botRow}>
            {msg.sender === "bot" && <img src={userImage} className={styles.msgAvatar} alt="bot" />}
            <div className={`${styles.appChatBubble} ${msg.sender === "user" ? styles.userBubble : styles.botBubble}`}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className={styles.botRow}>
            <img src={userImage} className={styles.msgAvatar} alt="bot" />
            <div className={styles.typingIndicator}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.appChatboxInputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className={styles.chatInput}
        />
        <button onClick={sendMessage} disabled={!input.trim()} className={styles.sendBtn}>➤</button>
      </div>
    </div>
  );
}

export default AppChatBox;