'use client';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      padding: '1.5rem 5%', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      zIndex: 100, 
      backdropFilter: scrolled ? 'blur(20px)' : 'none', 
      backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>NEXORA AI</div>
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem', color: 'var(--secondary)' }} className="desktop-nav">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#ai-solutions">AI Solutions</a>
        <a href="#work">Our Work</a>
        <a href="#insights">Insights</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <button className="btn-primary">Start a Project</button>
    </nav>
  );
}
