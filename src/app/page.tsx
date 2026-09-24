'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  // Global Scroll for parallax and transitions
  const { scrollYProgress } = useScroll();

  // DEMO 01: Cinematic Text Reveal
  const textRevealRef = useRef(null);
  const { scrollYProgress: textScroll } = useScroll({
    target: textRevealRef,
    offset: ["start end", "center center"]
  });
  const textBlur = useTransform(textScroll, [0, 1], ["blur(10px)", "blur(0px)"]);
  const textOpacity = useTransform(textScroll, [0, 1], [0, 1]);
  const textScale = useTransform(textScroll, [0, 1], [0.95, 1]);

  // DEMO 02: Horizontal Scroll
  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalScroll } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });
  const horizontalX = useTransform(horizontalScroll, [0, 1], ["0%", "-80%"]);

  // DEMO 03: 3D Card Depth
  const depthRef = useRef(null);
  const { scrollYProgress: depthScroll } = useScroll({
    target: depthRef,
    offset: ["start end", "end start"]
  });

  // DEMO 04: Pinned AI Workflow
  const workflowRef = useRef(null);
  const { scrollYProgress: workflowScroll } = useScroll({
    target: workflowRef,
    offset: ["start start", "end end"]
  });
  
  // DEMO 05: Before/After Reveal
  const beforeAfterRef = useRef(null);
  const { scrollYProgress: baScroll } = useScroll({
    target: beforeAfterRef,
    offset: ["start center", "end center"]
  });
  const clipPathWidth = useTransform(baScroll, [0, 1], ["0%", "100%"]);

  // DEMO 06: Parallax Layer System
  const parallaxRef = useRef(null);
  const { scrollYProgress: plScroll } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const ySlow = useTransform(plScroll, [0, 1], ["0%", "20%"]);
  const yMedium = useTransform(plScroll, [0, 1], ["0%", "-30%"]);
  const yFast = useTransform(plScroll, [0, 1], ["0%", "-80%"]);

  // DEMO 07: Text Morph
  const morphRef = useRef(null);
  const { scrollYProgress: morphScroll } = useScroll({
    target: morphRef,
    offset: ["start center", "end center"]
  });

  // DEMO 08: AI Network Growth
  const networkRef = useRef(null);
  const { scrollYProgress: netScroll } = useScroll({
    target: networkRef,
    offset: ["start center", "end center"]
  });

  // DEMO 09: Scroll-driven 3D Object
  const objectRef = useRef(null);
  const { scrollYProgress: objScroll } = useScroll({
    target: objectRef,
    offset: ["start center", "end center"]
  });
  const objRotateY = useTransform(objScroll, [0, 1], [0, 360]);
  const objScale = useTransform(objScroll, [0, 0.5, 1], [1, 1.5, 2]);
  const objOpacity = useTransform(objScroll, [0, 0.5, 1], [1, 0.8, 0]);

  // DEMO 10: Cinematic Transition
  const transitionRef = useRef(null);
  const { scrollYProgress: transScroll } = useScroll({
    target: transitionRef,
    offset: ["start end", "center center"]
  });
  const transOpacity = useTransform(transScroll, [0, 1], [0, 1]);
  const transScale = useTransform(transScroll, [0, 1], [0.9, 1]);

  // Canvas Background Setup
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const particles: any[] = [];
    for (let i = 0; i < 50; i++) particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, size: Math.random() * 2 + 1 });
    let mouseX = width / 2, mouseY = height / 2;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      particles.forEach(p => {
        const dxMouse = mouseX - p.x; const dyMouse = mouseY - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) { p.x -= dxMouse * 0.01; p.y -= dyMouse * 0.01; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1; if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          if (dx * dx + dy * dy < 15000) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
        }
      }
      requestAnimationFrame(render);
    };
    render();
    const handleResize = () => { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; };
    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('resize', handleResize); window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove); }
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <Navigation />

      {/* Hero Canvas */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />
        
        {/* DEMO 01 — CINEMATIC TEXT REVEAL */}
        <div ref={textRevealRef} style={{ height: '150vh', position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '1rem' }}>SCROLL INTERACTION 01</div>
            <motion.h1 
              style={{ fontSize: '6rem', textAlign: 'center', filter: textBlur, opacity: textOpacity, scale: textScale }}
            >
              Build. Redesign.<br/><span className="text-gradient">Automate. Grow.</span>
            </motion.h1>
            <p style={{ color: 'var(--secondary)', marginTop: '2rem' }}>Scroll to experience responsive cinematic typography.</p>
          </div>
        </div>
      </section>

      {/* DEMO 02 — HORIZONTAL SCROLL */}
      <section ref={horizontalRef} style={{ height: '400vh', position: 'relative', borderTop: '1px solid var(--border)' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', top: '10%', left: '5%', color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '2px' }}>SCROLL INTERACTION 02 - HORIZONTAL</div>
          <motion.div style={{ x: horizontalX, display: 'flex', gap: '5rem', padding: '0 10vw' }}>
            {['WEBSITE', 'DESIGN', 'AI', 'AGENTS', 'AUTOMATION', 'GROWTH'].map((title, i) => (
              <div key={i} className="glass-panel" style={{ minWidth: '60vw', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', fontWeight: 800 }}>
                {title}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DEMO 03 — 3D CARD DEPTH */}
      <section ref={depthRef} style={{ minHeight: '150vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px' }}>
        <div style={{ position: 'absolute', top: '5%', color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '2px' }}>SCROLL INTERACTION 03 - 3D DEPTH</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '80%', maxWidth: '1000px' }}>
            {[1, 2, 3, 4].map((i) => {
                const z = useTransform(depthScroll, [0, 0.5, 1], [-1000 + i * 200, 0, 1000 - i * 200]);
                const rotateX = useTransform(depthScroll, [0, 0.5, 1], [45, 0, -45]);
                const opacity = useTransform(depthScroll, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
                return (
                    <motion.div key={i} className="glass-panel" style={{ z, rotateX, opacity, height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3>Service {i}</h3>
                    </motion.div>
                )
            })}
        </div>
      </section>

      {/* DEMO 04 — PINNED AI WORKFLOW */}
      <section ref={workflowRef} style={{ height: '300vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '2rem' }}>SCROLL INTERACTION 04 - PINNED WORKFLOW</div>
           <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>How AI transforms a workflow.</h2>
           
           <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              {['REQUEST', 'AGENT', 'PROCESS', 'RESULT'].map((step, i) => {
                  const isActive = useTransform(workflowScroll, [i * 0.25, (i + 1) * 0.25], [0.3, 1]);
                  const scale = useTransform(workflowScroll, [i * 0.25, (i + 1) * 0.25], [0.9, 1.1]);
                  return (
                      <motion.div key={i} style={{ opacity: isActive, scale, padding: '2rem', border: '1px solid var(--border)', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
                          {step}
                      </motion.div>
                  )
              })}
           </div>
        </div>
      </section>

      {/* DEMO 05 — BEFORE / AFTER REVEAL */}
      <section ref={beforeAfterRef} style={{ height: '150vh', position: 'relative' }}>
         <div style={{ position: 'sticky', top: '10vh', height: '80vh', width: '90%', margin: '0 auto', overflow: 'hidden', borderRadius: '24px', border: '1px solid var(--border)' }}>
             <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10, color: 'var(--accent)' }}>SCROLL INTERACTION 05 - REVEAL</div>
             {/* OLD */}
             <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'monospace' }}>
                 <h1>OLD EXPERIENCE</h1>
             </div>
             {/* NEW (Clipped) */}
             <motion.div style={{ position: 'absolute', inset: 0, background: 'var(--background)', clipPath: useTransform(clipPathWidth, w => \`inset(0 0 0 \${100 - parseFloat(w)}%)\`), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ textAlign: 'center' }}>
                     <h1 className="text-gradient" style={{ fontSize: '4rem' }}>NEW EXPERIENCE</h1>
                     <p>Modern typography and layout.</p>
                 </div>
             </motion.div>
         </div>
      </section>

      {/* DEMO 06 — PARALLAX LAYER SYSTEM */}
      <section ref={parallaxRef} style={{ height: '150vh', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', top: '10%', left: '5%', color: 'var(--accent)', zIndex: 10 }}>SCROLL INTERACTION 06 - PARALLAX</div>
         <motion.div style={{ position: 'absolute', inset: -200, background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rV7928GhgYGBgYEAAgwAAyGAy9B4y4DAAAAAElFTkSuQmCC) repeat', opacity: 0.1, y: ySlow }} />
         <motion.div style={{ position: 'absolute', top: '30%', left: '20%', width: '300px', height: '300px', border: '1px solid var(--border)', borderRadius: '50%', y: yMedium }} />
         <motion.div style={{ position: 'absolute', top: '50%', right: '20%', width: '150px', height: '150px', background: 'var(--accent)', borderRadius: '50%', filter: 'blur(100px)', y: yFast }} />
         <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <h2 style={{ fontSize: '4rem' }}>Digital Ecosystem</h2>
         </div>
      </section>

      {/* DEMO 07 — TEXT MORPH */}
      <section ref={morphRef} style={{ height: '200vh', position: 'relative' }}>
         <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
             <div style={{ color: 'var(--accent)', marginBottom: '2rem' }}>SCROLL INTERACTION 07 - MORPH</div>
             <div style={{ position: 'relative', height: '100px', width: '400px', display: 'flex', justifyContent: 'center' }}>
                 {['BUILD', 'DESIGN', 'CONNECT', 'AUTOMATE'].map((word, i) => {
                     const opacity = useTransform(morphScroll, [i * 0.25, i * 0.25 + 0.1, (i + 1) * 0.25, (i + 1) * 0.25 + 0.1], [0, 1, 1, 0]);
                     return (
                         <motion.h2 key={i} style={{ position: 'absolute', fontSize: '5rem', opacity, filter: useTransform(opacity, o => \`blur(\${(1 - parseFloat(o.toString())) * 10}px)\`) }}>
                             {word}
                         </motion.h2>
                     )
                 })}
             </div>
         </div>
      </section>

      {/* DEMO 08 — AI NETWORK GROWTH */}
      <section ref={networkRef} style={{ height: '200vh', position: 'relative' }}>
         <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ position: 'absolute', top: '10%', color: 'var(--accent)' }}>SCROLL INTERACTION 08 - NETWORK GROWTH</div>
             <div style={{ position: 'relative', width: '500px', height: '500px' }}>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '1.5rem', background: 'var(--background)', border: '1px solid var(--accent)', borderRadius: '50%', zIndex: 2, boxShadow: '0 0 30px rgba(37,99,235,0.3)' }}>
                     NEXORA AI
                 </div>
                 {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                     const distance = 200;
                     const x = Math.cos(angle * Math.PI / 180) * distance;
                     const y = Math.sin(angle * Math.PI / 180) * distance;
                     const progress = useTransform(netScroll, [0, 1], [0, 1]); // Simplified for demo
                     return (
                         <motion.div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%', x, y, opacity: progress }} />
                     )
                 })}
             </div>
         </div>
      </section>

      {/* DEMO 09 — SCROLL-DRIVEN 3D OBJECT */}
      <section ref={objectRef} style={{ height: '200vh', position: 'relative' }}>
         <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ position: 'absolute', top: '10%', color: 'var(--accent)' }}>SCROLL INTERACTION 09 - 3D OBJECT</div>
             <motion.div style={{ width: '200px', height: '200px', border: '2px solid var(--border)', borderRadius: '10px', rotateY: objRotateY, scale: objScale, opacity: objOpacity, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3>Intelligence</h3>
             </motion.div>
         </div>
      </section>

      {/* DEMO 10 — CINEMATIC SECTION TRANSITION */}
      <section ref={transitionRef} style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', top: '10%', left: '5%', color: 'var(--accent)' }}>SCROLL INTERACTION 10 - CINEMATIC TRANSITION</div>
         <motion.div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--surface))', opacity: transOpacity }} />
         <motion.div className="container" style={{ position: 'relative', zIndex: 1, scale: transScale, opacity: transOpacity, paddingTop: '20vh' }}>
             <h2 style={{ fontSize: '4rem' }}>Our Work</h2>
             <p style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>Premium case studies and implementations.</p>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem' }}>
                 <div className="glass-panel" style={{ height: '400px' }}>Project Alpha</div>
                 <div className="glass-panel" style={{ height: '400px' }}>Project Beta</div>
             </div>
         </motion.div>
      </section>

      {/* Footer & Chat */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 5%', background: 'var(--background)', marginTop: '4rem' }}>
         <div className="container text-center text-secondary">
             © {new Date().getFullYear()} NEXORA AI. All rights reserved.
         </div>
      </footer>
      <AIAssistant />
    </main>
  );
}
