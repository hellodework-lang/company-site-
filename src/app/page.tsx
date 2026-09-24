'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  const [navHeight, setNavHeight] = useState(80);
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      setNavHeight(nav.offsetHeight);
      const resizeObserver = new ResizeObserver(() => setNavHeight(nav.offsetHeight));
      resizeObserver.observe(nav);
      return () => resizeObserver.disconnect();
    }
  }, []);
  const { scrollYProgress } = useScroll();

  // 1. Cinematic Text Reveal
  const textRevealRef = useRef(null);
  const { scrollYProgress: textScroll } = useScroll({ target: textRevealRef, offset: ["start end", "center center"] });
  const textBlur = useTransform(textScroll, [0, 1], ["blur(12px)", "blur(0px)"]);
  const textOpacity = useTransform(textScroll, [0, 1], [0, 1]);
  const textScale = useTransform(textScroll, [0, 1], [0.92, 1]);

  // 3. 3D Service Cards
  const depthRef = useRef(null);
  const { scrollYProgress: depthScroll } = useScroll({ target: depthRef, offset: ["start end", "end start"] });

  // 2. Horizontal Scroll (Moved down)
  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalScroll } = useScroll({ target: horizontalRef, offset: ["start start", "end end"] });
  const horizontalX = useTransform(horizontalScroll, [0, 1], ["0%", "-85%"]);

  // 4. Pinned AI Workflow
  const workflowRef = useRef(null);
  const { scrollYProgress: workflowScroll } = useScroll({ target: workflowRef, offset: ["start start", "end end"] });
  
  // 5. Before/After Reveal
  const beforeAfterRef = useRef(null);
  const { scrollYProgress: baScroll } = useScroll({ target: beforeAfterRef, offset: ["start center", "end center"] });
  const clipPathWidth = useTransform(baScroll, [0, 1], ["0%", "100%"]);

  // 6. Parallax Layer System
  const parallaxRef = useRef(null);
  const { scrollYProgress: plScroll } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const ySlow = useTransform(plScroll, [0, 1], ["0%", "15%"]);
  const yMedium = useTransform(plScroll, [0, 1], ["0%", "-20%"]);
  const yFast = useTransform(plScroll, [0, 1], ["0%", "-40%"]);

  // 7. Text Morph
  const morphRef = useRef(null);
  const { scrollYProgress: morphScroll } = useScroll({ target: morphRef, offset: ["start center", "end center"] });

  // 8. AI Network Growth
  const networkRef = useRef(null);
  const { scrollYProgress: netScroll } = useScroll({ target: networkRef, offset: ["start center", "end center"] });

  // 9. 3D AI Object
  const objectRef = useRef(null);
  const { scrollYProgress: objScroll } = useScroll({ target: objectRef, offset: ["start center", "end center"] });
  const objRotateY = useTransform(objScroll, [0, 1], [0, 360]);
  const objScale = useTransform(objScroll, [0, 0.5, 1], [1, 1.5, 2]);
  const objOpacity = useTransform(objScroll, [0, 0.5, 1], [1, 0.8, 0]);

  // 10. Cinematic Transition
  const transitionRef = useRef(null);
  const { scrollYProgress: transScroll } = useScroll({ target: transitionRef, offset: ["start end", "center center"] });
  const transOpacity = useTransform(transScroll, [0, 1], [0, 1]);
  const transScale = useTransform(transScroll, [0, 1], [0.95, 1]);

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
    for (let i = 0; i < 40; i++) particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 2 + 1 });
    let mouseX = width / 2, mouseY = height / 2;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
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
    <main style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', overflowX: 'hidden' }}>
      <Navigation />

      {/* 1. HERO */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '5rem', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>NEXORA AI</h1>
            <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', marginTop: '1rem' }}>Digital Experiences • AI Systems • Intelligent Automation</p>
        </div>
      </section>

      {/* 2. CINEMATIC TEXT REVEAL */}
      <section ref={textRevealRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div style={{ filter: textBlur, opacity: textOpacity, scale: textScale, textAlign: 'center' }}>
              <h2 style={{ fontSize: '4rem', fontFamily: 'var(--font-heading)' }}>Digital experiences<br/>built for <span className="text-gradient">what’s next.</span></h2>
          </motion.div>
      </section>

      {/* 4. 3D SERVICE CARDS */}
      <section ref={depthRef} style={{ minHeight: '150vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>Everything your business needs to move forward.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '80%', maxWidth: '1000px' }}>
            {[
              { t: 'WEBSITE DEVELOPMENT', d: 'Custom web platforms.' },
              { t: 'UI/UX & REDESIGN', d: 'Modernize existing systems.' },
              { t: 'AI INTEGRATION', d: 'Connect intelligence.' },
              { t: 'AI AGENTS & AUTOMATION', d: 'Automate repetitive workflows.' }
            ].map((srv, i) => {
                const z = useTransform(depthScroll, [0, 0.5, 1], [-500 + i * 100, 0, 500 - i * 100]);
                const rotateX = useTransform(depthScroll, [0, 0.5, 1], [30, 0, -30]);
                const opacity = useTransform(depthScroll, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
                return (
                    <motion.div key={i} className="glass-panel" style={{ z, rotateX, opacity, height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{srv.t}</h3>
                        <p style={{ color: 'var(--secondary)' }}>{srv.d}</p>
                    </motion.div>
                )
            })}
        </div>
      </section>

      {/* 5. HORIZONTAL DIGITAL JOURNEY */}
      <section ref={horizontalRef} style={{ height: '400vh', position: 'relative', borderTop: '1px solid var(--border)' }}>
        <div style={{ position: 'sticky', top: navHeight, height: `calc(100vh - ${navHeight}px)`, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ padding: '0 10vw', marginBottom: '4rem' }}>
             <h2 style={{ fontSize: '3rem' }}>From idea to intelligent system.</h2>
          </div>
          <motion.div style={{ x: horizontalX, display: 'flex', gap: '5rem', padding: '0 10vw', width: 'max-content' }}>
            {[
              { num: '01', title: 'IDEA', desc: 'Understand the business problem.' },
              { num: '02', title: 'DESIGN', desc: 'Create the right digital experience.' },
              { num: '03', title: 'DEVELOP', desc: 'Build the technology.' },
              { num: '04', title: 'CONNECT', desc: 'Connect systems and data.' },
              { num: '05', title: 'AI', desc: 'Introduce intelligent capabilities.' },
              { num: '06', title: 'AUTOMATE', desc: 'Turn repetitive workflows into systems.' },
              { num: '07', title: 'LAUNCH', desc: 'Deploy and continuously improve.' }
            ].map((card, i) => (
              <div key={i} className="glass-panel" style={{ minWidth: '40vw', height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '1rem' }}>{card.num}</span>
                <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>{card.title}</h3>
                <p style={{ fontSize: '1.2rem', color: 'var(--secondary)' }}>{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. AI WORKFLOW */}
      <section ref={workflowRef} style={{ height: '300vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>See how intelligence moves through a business.</h2>
           
           <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['CUSTOMER REQUEST', 'AI AGENT', 'UNDERSTAND', 'PROCESS', 'ACTION', 'RESULT'].map((step, i) => {
                  const isActive = useTransform(workflowScroll, [i * 0.15, (i + 1) * 0.15], [0.25, 1]);
                  const scale = useTransform(workflowScroll, [i * 0.15, (i + 1) * 0.15], [0.95, 1.05]);
                  return (
                      <motion.div key={i} style={{ opacity: isActive, scale, padding: '1.5rem 2rem', border: '1px solid var(--border)', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', textAlign: 'center' }}>
                          <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>Step 0{i+1}</span>
                          {step}
                      </motion.div>
                  )
              })}
           </div>
           <motion.p style={{ marginTop: '3rem', color: 'var(--accent)', opacity: useTransform(workflowScroll, [0.8, 1], [0, 1]) }}>Intelligent workflow complete.</motion.p>
        </div>
      </section>

      {/* 7. WEBSITE REDESIGN BEFORE / AFTER */}
      <section ref={beforeAfterRef} style={{ height: '150vh', position: 'relative' }}>
         <div style={{ position: 'sticky', top: '10vh', height: '80vh', width: '90%', margin: '0 auto', overflow: 'hidden', borderRadius: '24px', border: '1px solid var(--border)' }}>
             <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10, color: 'var(--accent)' }}>Don't replace what works. Improve it.</div>
             {/* OLD */}
             <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'monospace' }}>
                 <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', letterSpacing: '0px' }}>OLD EXPERIENCE</h1>
                    <p>Poor spacing • Outdated typography</p>
                 </div>
             </div>
             {/* NEW (Clipped) */}
             <motion.div style={{ position: 'absolute', inset: 0, background: 'var(--background)', clipPath: useTransform(clipPathWidth, (w: any) => `inset(0 0 0 ${100 - parseFloat(w)}%)`), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ textAlign: 'center' }}>
                     <h1 className="text-gradient" style={{ fontSize: '4rem', fontFamily: 'var(--font-heading)' }}>NEW EXPERIENCE</h1>
                     <p style={{ color: 'var(--secondary)' }}>Modern typography • Better hierarchy • Clean spacing</p>
                 </div>
             </motion.div>
             <div style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center', color: 'var(--secondary)' }}>Scroll to transform</div>
         </div>
      </section>

      {/* 8. AI PARALLAX ENVIRONMENT */}
      <section ref={parallaxRef} style={{ height: '150vh', position: 'relative', overflow: 'hidden' }}>
         <motion.div style={{ position: 'absolute', inset: -200, background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rV7928GhgYGBgYEAAgwAAyGAy9B4y4DAAAAAElFTkSuQmCC) repeat', opacity: 0.1, y: ySlow }} />
         <motion.div style={{ position: 'absolute', top: '30%', left: '15%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', y: yMedium }}>CUSTOMERS</motion.div>
         <motion.div style={{ position: 'absolute', top: '60%', right: '15%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', y: yMedium }}>SALES</motion.div>
         <motion.div style={{ position: 'absolute', top: '20%', right: '25%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', y: yFast }}>CRM</motion.div>
         <motion.div style={{ position: 'absolute', top: '70%', left: '25%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', y: yFast }}>DATA</motion.div>
         <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <h2 style={{ fontSize: '4rem', filter: 'blur(0.5px)' }}>Digital Ecosystem</h2>
         </div>
      </section>

      {/* 9. AI WORD MORPH */}
      <section ref={morphRef} style={{ height: '200vh', position: 'relative' }}>
         <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
             <div style={{ position: 'relative', height: '150px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                 {['BUILD', 'DESIGN', 'CONNECT', 'INTELLIGENCE', 'AUTOMATE', 'TRANSFORM'].map((word, i) => {
                     const step = 1 / 6;
                     const opacity = useTransform(morphScroll, [i * step, i * step + 0.05, (i + 1) * step, (i + 1) * step + 0.05], [0, 1, 1, 0]);
                     return (
                         <motion.h2 key={i} style={{ position: 'absolute', fontSize: '6rem', fontFamily: 'var(--font-heading)', opacity, filter: useTransform(opacity, (o: any) => `blur(${(1 - parseFloat(o.toString())) * 10}px)`) }}>
                             {word}
                         </motion.h2>
                     )
                 })}
             </div>
             <p style={{ color: 'var(--secondary)' }}>Technology that evolves with your business.</p>
         </div>
      </section>

      {/* 10. AI NETWORK ECOSYSTEM */}
      <section ref={networkRef} style={{ height: '200vh', position: 'relative' }}>
         <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
             <h2 style={{ fontSize: '2rem', marginBottom: '4rem' }}>One intelligent layer across your business.</h2>
             <div style={{ position: 'relative', width: '600px', height: '400px' }}>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '1.5rem', background: 'var(--background)', border: '1px solid var(--accent)', borderRadius: '50%', zIndex: 2, boxShadow: '0 0 30px rgba(37,99,235,0.3)' }}>
                     NEXORA AI
                 </div>
                 {['Customers', 'Sales', 'Support', 'Marketing', 'CRM', 'Operations', 'Data', 'Team'].map((label, i) => {
                     const angle = i * 45;
                     const distance = 250;
                     const x = Math.cos(angle * Math.PI / 180) * distance;
                     const y = Math.sin(angle * Math.PI / 180) * distance;
                     const step = i * 0.1;
                     const opacity = useTransform(netScroll, [step, step + 0.2], [0, 1]); 
                     return (
                         <motion.div key={i} style={{ position: 'absolute', top: '50%', left: '50%', x, y, opacity, padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                            {label}
                         </motion.div>
                     )
                 })}
             </div>
         </div>
      </section>

      {/* 11. 3D AI OBJECT */}
      <section ref={objectRef} style={{ height: '200vh', position: 'relative' }}>
         <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem' }}>
             <motion.div style={{ width: '250px', height: '250px', border: '1px solid var(--accent)', borderRadius: '50%', rotateY: objRotateY, scale: objScale, opacity: objOpacity, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 50px rgba(37,99,235,0.2)' }}>
                <div style={{ width: '100px', height: '100px', border: '1px dashed var(--secondary)', borderRadius: '50%', animation: 'spin 10s linear infinite' }}></div>
             </motion.div>
             <div style={{ height: '50px', position: 'relative', width: '300px' }}>
                {['INTELLIGENCE', 'INTEGRATION', 'AUTOMATION', 'TRANSFORMATION'].map((word, i) => {
                     const step = 0.25;
                     const opacity = useTransform(objScroll, [i * step, i * step + 0.1, (i + 1) * step, (i + 1) * step + 0.1], [0, 1, 1, 0]);
                     return <motion.h3 key={i} style={{ position: 'absolute', fontSize: '2rem', opacity }}>{word}</motion.h3>
                })}
             </div>
         </div>
      </section>

      {/* 12. CINEMATIC SECTION TRANSITION -> OUR WORK */}
      <section ref={transitionRef} style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
         <motion.div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--background), var(--surface))', opacity: transOpacity }} />
         <motion.div className="container" style={{ position: 'relative', zIndex: 1, scale: transScale, opacity: transOpacity, paddingTop: '20vh', filter: useTransform(transOpacity, (o: any) => `blur(${(1 - parseFloat(o.toString())) * 10}px)`) }}>
             <h2 style={{ fontSize: '4rem' }}>Our Work</h2>
             <p style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>Premium implementations of digital experiences and AI automation.</p>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem' }}>
                 <div className="glass-panel" style={{ height: '400px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
                     <h3 style={{ fontSize: '2rem' }}>Project Alpha</h3>
                 </div>
                 <div className="glass-panel" style={{ height: '400px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
                     <h3 style={{ fontSize: '2rem' }}>Project Beta</h3>
                 </div>
             </div>
         </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '8rem 0', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
         <div className="container text-center">
             <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Start a Project</h2>
             <p style={{ color: 'var(--secondary)', marginBottom: '3rem' }}>Contact us to discuss your digital and AI requirements.</p>
             <button style={{ background: 'var(--primary)', color: 'var(--background)', padding: '1rem 2rem', borderRadius: '100px', fontSize: '1.2rem', fontWeight: 600 }}>Get in Touch</button>
         </div>
      </section>

      {/* Footer & Chat */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 5%', background: 'var(--background)' }}>
         <div className="container text-center text-secondary">
             © {new Date().getFullYear()} NEXORA AI. All rights reserved.
         </div>
      </footer>
      <AIAssistant />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </main>
  );
}
