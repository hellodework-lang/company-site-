'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting right now. You can still tell us about your project through the contact form." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting right now. You can still tell us about your project through the contact form." }]);
    }
    
    setIsLoading(false);
  };

  const quickPrompts = [
    "What can NEXORA AI do?",
    "How can AI help my business?",
    "I need a new website",
    "I want to redesign my website",
    "I need an AI agent"
  ];

  return (
    <>
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} style={{ background: 'var(--primary)', color: 'var(--background)', padding: '1rem 1.5rem', borderRadius: '100px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 30px rgba(255,255,255,0.2)', transition: 'all 0.3s ease' }}>
            <span style={{ fontSize: '1.2rem' }}>✦</span> Ask our AI
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem', width: '380px', height: '600px',
              background: 'rgba(18, 18, 18, 0.85)', backdropFilter: 'blur(20px)',
              border: '1px solid var(--border)', borderRadius: '24px', zIndex: 100,
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-heading)' }}>NEXORA AI</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', margin: 0 }}>Your AI guide to digital transformation.</p>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ color: 'var(--secondary)', fontSize: '1.5rem', padding: '0.5rem' }}>×</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                  {quickPrompts.map((prompt, i) => (
                    <button key={i} onClick={() => handleSend(prompt)} style={{
                      textAlign: 'left', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border)', borderRadius: '12px', fontSize: '0.9rem',
                      color: 'var(--foreground)', transition: 'background 0.2s'
                    }}>
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
              
              {messages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    padding: '0.8rem 1.2rem',
                    borderRadius: '16px',
                    background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    color: msg.role === 'user' ? 'var(--background)' : 'var(--foreground)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                    fontSize: '0.95rem',
                    lineHeight: '1.5'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', padding: '0.8rem 1.2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <span style={{ animation: 'blink 1.4s infinite both' }}>.</span>
                  <span style={{ animation: 'blink 1.4s infinite both', animationDelay: '0.2s' }}>.</span>
                  <span style={{ animation: 'blink 1.4s infinite both', animationDelay: '0.4s' }}>.</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(input); }}
                  placeholder="Ask anything..."
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                    borderRadius: '100px', padding: '0.8rem 1.2rem', color: 'var(--foreground)',
                    outline: 'none', fontFamily: 'inherit'
                  }}
                />
                <button onClick={() => handleSend(input)} style={{
                  background: 'var(--primary)', color: 'var(--background)', width: '45px', height: '45px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  ↑
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
