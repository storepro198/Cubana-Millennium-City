import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Cubana Millennium City. I am your personal concierge. How may I assist you with your investment today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await sendMessageToGemini(userMsg);

    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gold text-obsidian p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2 hover:bg-white transition-colors"
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <MessageSquare size={24} />
        <span className="hidden md:inline font-bold uppercase text-xs tracking-wider">Cubana Concierge</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-[#121212] rounded-2xl shadow-2xl border border-gold/20 flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="bg-[#1A1A1A] p-4 flex justify-between items-center border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold to-yellow-200 flex items-center justify-center">
                            <Sparkles size={16} className="text-obsidian" />
                        </div>
                        <div>
                            <h4 className="text-white font-serif text-sm">Millennium Concierge</h4>
                            <p className="text-gold text-[10px] uppercase tracking-wider flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                Online Now
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-obsidian">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-gold text-obsidian font-medium rounded-br-none' 
                                : 'bg-[#1A1A1A] text-gray-200 border border-white/5 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-[#1A1A1A] p-3 rounded-xl rounded-bl-none border border-white/5">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-[#1A1A1A] border-t border-white/5">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about pricing, location..."
                            className="w-full bg-black text-white rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 border border-white/10 placeholder-gray-600"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-obsidian hover:bg-white transition-colors disabled:opacity-50"
                        >
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Concierge;
