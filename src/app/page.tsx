'use client';
import { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import AIAssistant from '@/components/AIAssistant';
import AnimationDemos from '@/components/AnimationDemos';
import { motion } from 'framer-motion';

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
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      
      particles.forEach(p => {
        // slight mouse interaction
        const dxMouse = mouseX - p.x;
        const dyMouse = mouseY - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
            p.x -= dxMouse * 0.01;
            p.y -= dyMouse * 0.01;
        }

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
          if (dx * dx + dy * dy < 15000) {
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
    const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section id="home" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
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
      <section id="services" className="section" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '4rem' }}>Technology built <br/> <span className="text-gradient">around your business.</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <motion.div 
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="glass-panel" 
              style={{ perspective: '1000px', transformOrigin: 'top', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>01</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Website Development</h3>
              <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Build modern, scalable digital experiences from frontend to backend.</p>
              <ul style={{ color: 'var(--secondary)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '2' }}>
                <li>Frontend Development</li>
                <li>Backend Development</li>
                <li>Database Systems</li>
                <li>API Integration</li>
              </ul>
              <div style={{ marginTop: '2rem', color: 'var(--accent)', fontWeight: 600 }}>Explore Website Development →</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="glass-panel" 
              style={{ perspective: '1000px', transformOrigin: 'top', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>02</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>UI/UX Design & Redesign</h3>
              <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Transform outdated websites into modern digital experiences.</p>
              <ul style={{ color: 'var(--secondary)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '2' }}>
                <li>UI Design & UX Research</li>
                <li>Design Systems</li>
                <li>Responsive Design</li>
                <li>Website Redesign</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="glass-panel" 
              style={{ perspective: '1000px', transformOrigin: 'top', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>03</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Integration</h3>
              <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Bring AI into existing business systems seamlessly.</p>
              <ul style={{ color: 'var(--secondary)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '2' }}>
                <li>AI Chatbots & Assistants</li>
                <li>AI Search</li>
                <li>AI Content Systems</li>
                <li>AI API Integration</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="glass-panel" 
              style={{ perspective: '1000px', transformOrigin: 'top', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>04</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Agents & Automation</h3>
              <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Create intelligent agents that can perform business tasks.</p>
              <ul style={{ color: 'var(--secondary)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '2' }}>
                <li>Customer Support Agents</li>
                <li>Sales & Lead Agents</li>
                <li>Workflow Automation</li>
                <li>CRM Automation</li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section - AI Transformation */}
      <section id="ai-solutions" className="section" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
         <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>Your business. <span className="text-gradient">Connected to AI.</span></h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
              We analyze existing business processes and identify where AI and automation can improve workflows and save time.
            </p>
            {/* Abstract Diagram Container */}
            <div style={{ height: '400px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ zIndex: 2, padding: '2rem', background: 'var(--background)', border: '1px solid var(--accent)', borderRadius: '50%', boxShadow: '0 0 50px rgba(37,99,235,0.2)' }}>
                    <h3 style={{ margin: 0 }}>NEXORA AI</h3>
                </div>
                {/* Simulated Nodes */}
                <div style={{ position: 'absolute', top: '15%', left: '20%', background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '100px', border: '1px solid var(--border)' }}>Sales</div>
                <div style={{ position: 'absolute', bottom: '15%', right: '20%', background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '100px', border: '1px solid var(--border)' }}>Customer Support</div>
                <div style={{ position: 'absolute', top: '20%', right: '25%', background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '100px', border: '1px solid var(--border)' }}>CRM</div>
                <div style={{ position: 'absolute', bottom: '20%', left: '25%', background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '100px', border: '1px solid var(--border)' }}>Data Operations</div>
            </div>
         </div>
      </section>

      {/* Process & Setup Sections */}
      <section className="section" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="container" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
             <div style={{ flex: 1, minWidth: '300px' }}>
                 <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '1rem' }}>New Business</div>
                 <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Building something new?</h2>
                 <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>We help new businesses create a strong digital foundation from day one — combining design, development, AI and automation into one connected system.</p>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--secondary)' }}>
                     <div>01. Strategy & Design</div>
                     <div>02. Development</div>
                     <div>03. AI Integration</div>
                     <div>04. Launch</div>
                 </div>
                 <button className="btn-primary" style={{ marginTop: '2rem' }}>Build With Us</button>
             </div>
             
             <div style={{ flex: 1, minWidth: '300px' }}>
                 <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '1rem' }}>Existing Business</div>
                 <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Improve what already works.</h2>
                 <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>We don't replace what works. We analyze your current website, tools and processes, and identify practical opportunities to introduce AI and automation.</p>
                 <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                     <div style={{ color: 'var(--secondary)' }}>Existing Business</div>
                     <div style={{ margin: '1rem 0' }}>↓</div>
                     <div style={{ color: 'var(--accent)' }}>NEXORA AI Integration</div>
                     <div style={{ margin: '1rem 0' }}>↓</div>
                     <div>Smarter Workflows & Better Experience</div>
                 </div>
             </div>
          </div>
      </section>

      {/* AI Agents */}
      <section className="section">
         <div className="container">
            <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '4rem' }}>Meet your digital <span className="text-gradient">workforce.</span></h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {[
                  { title: "Customer Support Agent", desc: "Answers customer questions and handles common requests automatically 24/7." },
                  { title: "Sales Agent", desc: "Helps qualify leads, organize sales enquiries, and guide visitors to the right products." },
                  { title: "Appointment Agent", desc: "Handles appointment-related conversations and scheduling workflows." },
                  { title: "Operations Agent", desc: "Helps automate repetitive internal processes and organizes data." },
                ].map((agent, i) => (
                   <motion.div 
                      key={i} 
                      initial={{ opacity: 0, rotateX: -90 }}
                      whileInView={{ opacity: 1, rotateX: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                      style={{ perspective: '1000px', transformOrigin: 'top', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', background: 'rgba(255,255,255,0.02)' }}
                   >
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{agent.title}</h3>
                      <p style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>{agent.desc}</p>
                   </motion.div>
                ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
               <button className="btn-secondary">Build an AI Agent</button>
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ backgroundColor: 'var(--surface)' }}>
         <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Let's build <span className="text-gradient">what's next.</span></h2>
                <p style={{ color: 'var(--secondary)' }}>Start a conversation about your project requirements.</p>
            </div>
            
            <form className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <input type="text" placeholder="Name" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '12px', color: '#fff' }} />
                    <input type="email" placeholder="Email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '12px', color: '#fff' }} />
                </div>
                <input type="text" placeholder="Company / Website" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '12px', color: '#fff' }} />
                <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '12px', color: '#a1a1aa' }}>
                    <option value="">Select Service</option>
                    <option value="web">Website Development</option>
                    <option value="redesign">Website Redesign</option>
                    <option value="ui">UI/UX Design</option>
                    <option value="ai">AI Integration / Agents</option>
                </select>
                <textarea placeholder="Message" rows={5} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '12px', color: '#fff', fontFamily: 'inherit' }}></textarea>
                <button type="button" className="btn-primary" style={{ marginTop: '1rem' }}>Start a Conversation</button>
            </form>
         </div>
      </section>

      <AnimationDemos />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 5%', background: 'var(--background)' }}>
         <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
            <div>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>NEXORA AI</h3>
               <p style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Digital Experiences • AI Systems • Intelligent Automation</p>
            </div>
            <div>
               <h4 style={{ marginBottom: '1rem' }}>Services</h4>
               <ul style={{ listStyle: 'none', color: 'var(--secondary)', fontSize: '0.9rem', lineHeight: '2' }}>
                  <li>Website Development</li>
                  <li>UI/UX Design</li>
                  <li>AI Integration</li>
                  <li>AI Agents</li>
                  <li>Automation</li>
               </ul>
            </div>
            <div>
               <h4 style={{ marginBottom: '1rem' }}>Company</h4>
               <ul style={{ listStyle: 'none', color: 'var(--secondary)', fontSize: '0.9rem', lineHeight: '2' }}>
                  <li>About</li>
                  <li>Our Work</li>
                  <li>Insights</li>
                  <li>Contact</li>
               </ul>
            </div>
         </div>
         <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', color: 'var(--secondary)', fontSize: '0.85rem' }}>
            <div>© {new Date().getFullYear()} NEXORA AI. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <a href="#">Privacy Policy</a>
               <a href="#">Terms of Service</a>
            </div>
         </div>
      </footer>

      <AIAssistant />
    </main>
  );
}
