'use client';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Basic canvas background for hero
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number, y: number, vx: number, vy: number, size: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // draw lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (dx * dx + dy * dy < 20000) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>ANTIGRAVITY</div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--secondary)' }}>
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">AI Solutions</a>
          <a href="#">Our Work</a>
          <a href="#">About</a>
        </div>
        <button className="btn-primary">Start a Project</button>
      </nav>

      {/* Hero Section */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px' }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '1rem' }}>
            Digital Experiences • AI Systems • Intelligent Automation
          </div>
          <h1 style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>
            Build. Redesign. <br/> <span className="text-gradient">Automate. Grow.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            We build modern digital experiences and AI-powered solutions that help businesses work smarter, serve customers better, and evolve for what’s next.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-primary">Start a Project</button>
            <button className="btn-secondary">Explore Our Services</button>
          </div>
        </div>
      </section>

      {/* Section 01 - What We Do */}
      <section className="section" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '4rem' }}>Digital solutions built <br/> <span className="text-gradient">around your business.</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Website Development</h3>
              <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>From frontend experiences to backend systems, we build scalable websites and web applications designed around your business.</p>
              <ul style={{ color: 'var(--secondary)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '2' }}>
                <li>Frontend Development</li>
                <li>Backend Development</li>
                <li>Database Integration</li>
              </ul>
            </div>
            <div className="glass-panel">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>UI/UX Design</h3>
              <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Transform outdated digital experiences into modern, intuitive and conversion-focused interfaces.</p>
              <ul style={{ color: 'var(--secondary)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '2' }}>
                <li>UI/UX Design</li>
                <li>Website Redesign</li>
                <li>Design Systems</li>
              </ul>
            </div>
            <div className="glass-panel">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI & Automation</h3>
              <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Integrate AI into your business and turn repetitive workflows into intelligent systems.</p>
              <ul style={{ color: 'var(--secondary)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '2' }}>
                <li>AI Agents</li>
                <li>Workflow Automation</li>
                <li>AI Integrations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Floating AI Assistant */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
        <button style={{ background: 'var(--primary)', color: 'var(--background)', padding: '1rem 1.5rem', borderRadius: '100px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 30px rgba(255,255,255,0.2)' }}>
          <span style={{ fontSize: '1.2rem' }}>✦</span> Ask our AI
        </button>
      </div>

    </main>
  );
}
