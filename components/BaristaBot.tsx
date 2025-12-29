import React, { useState, useRef, useEffect } from 'react';
import { getBaristaRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

const BaristaBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Mr. Beans. I'm your Virtual Barista. How are you feeling today? Or what flavors are you craving?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const responseText = await getBaristaRecommendation(userText);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the coffee spirits. Try again?", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="barista-ai" className="py-24 bg-coffee-900 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">The Virtual Barista</h2>
          <div className="w-16 h-1 bg-gold-DEFAULT mx-auto mb-6"></div>
          <p className="text-stone-400 max-w-lg mx-auto">
            Not sure what to order? Tell our AI Barista about your mood, the weather, or your cravings, and let us curate the perfect cup for you.
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-stone-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gold-600 text-white rounded-tr-none' 
                      : 'bg-stone-800 text-stone-200 rounded-tl-none border border-stone-700'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-2 mb-2 text-gold-DEFAULT text-xs font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 bg-gold-DEFAULT rounded-full animate-pulse"></span>
                      Mr. Beans AI
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-800 p-4 rounded-2xl rounded-tl-none border border-stone-700">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-stone-900 border-t border-stone-800 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., I need energy and love caramel..."
              className="flex-1 bg-black border border-stone-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-DEFAULT transition-colors placeholder-stone-600"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-gold-DEFAULT text-black px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-wider hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BaristaBot;