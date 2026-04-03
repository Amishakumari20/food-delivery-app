import React, { useState, useRef, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { dataContext } from "../context/UserContext";
import { food_items } from "../food";
import { RxCross2 } from "react-icons/rx";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { BsRobot } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const suggestedQuestions = [
  "Best pizza recommendations?",
  "What veg options are available?",
  "Budget-friendly meals under ₹400?",
  "Popular non-veg dishes?",
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey there!I'm FoodieBot, your personal food assistant! I can help you find the perfect dish, suggest combos, or answer any questions about our menu. What are you craving today?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  async function sendMessage(text) {
    const messageText = text || inputText.trim();
    if (!messageText || isLoading) return;

    const newUserMessage = { role: "user", content: messageText };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setInputText("");
    setIsLoading(true);

    
    const apiMessages = updatedMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          cartItems: cartItems,
          menuItems: food_items,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having connection issues right now. Please try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared!I'm still here — what would you like to know about our menu?",
      },
    ]);
  }

  return (
    <>
    
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full 
        shadow-2xl flex items-center justify-center hover:bg-green-400 transition-all duration-300
        hover:scale-110 active:scale-95 ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open chat"
      >
        <IoChatbubbleEllipsesOutline className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-bounce text-[9px] flex items-center justify-center font-bold">
          AI
        </span>
      </button>

      <div
        className={`fixed bottom-6 right-6 z-50 w-[92vw] md:w-[400px] h-[580px] bg-white rounded-2xl
        shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right
        ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}
      >
        
        <div className="w-full bg-green-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
              <BsRobot className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">FoodieBot</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-200 animate-pulse"></span>
                <p className="text-green-100 text-xs">Always online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="text-green-100 text-xs hover:text-white transition-colors px-2 py-1 
              rounded-lg hover:bg-green-400"
            >
              Clear
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-green-100 hover:text-white transition-colors"
            >
              <RxCross2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
             
              <div
                className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1
                ${msg.role === "user" ? "bg-green-500" : "bg-slate-200"}`}
              >
                {msg.role === "user" ? (
                  <FaUser className="w-3.5 h-3.5 text-white" />
                ) : (
                  <BsRobot className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>

              
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                ${
                  msg.role === "user"
                    ? "bg-green-500 text-white rounded-tr-sm"
                    : "bg-white text-gray-700 rounded-tl-sm shadow-sm border border-gray-100"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                <BsRobot className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && !isLoading && (
          <div className="px-3 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-gray-100 bg-white">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="flex-shrink-0 text-xs bg-green-50 text-green-700 border border-green-200
                px-3 py-1.5 rounded-full hover:bg-green-100 transition-all whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="w-full px-3 py-3 bg-white border-t border-gray-100 flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about food..."
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none text-sm outline-none border border-gray-200 rounded-xl
            px-3 py-2.5 focus:border-green-400 transition-colors max-h-24 min-h-[42px]
            disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ height: "42px" }}
            onInput={(e) => {
              e.target.style.height = "42px";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 96) + "px";
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center
            hover:bg-green-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-95 flex-shrink-0"
          >
            <IoSend className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
