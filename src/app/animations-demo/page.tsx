'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';

export default function AnimationsDemo() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // For Animation 5: Parallax
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // For Animation 9: Horizontal Scroll
  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalScrollProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });
  const xTransform = useTransform(horizontalScrollProgress, [0, 1], ["0%", "-75%"]);

  // For Animation 10: Background Color Change
  const bgRef = useRef(null);
  const { scrollYProgress: bgScrollProgress } = useScroll({
    target: bgRef,
    offset: ["start center", "end center"]
  });
  const backgroundColor = useTransform(
    bgScrollProgress,
    [0, 0.5, 1],
    ["var(--background)", "#1e1e1e", "var(--background)"]
  );

  return (
    <main style={{ overflowX: 'hidden' }}>
      <Navigation />
      
      <div style={{ paddingTop: '150px', paddingBottom: '50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontFamily: 'var(--font-heading)' }}>10 Scrolling Animations</h1>
        <p style={{ color: 'var(--secondary)' }}>Scroll down to view different animation techniques.</p>
      </div>

      <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '150px', paddingBottom: '150px' }}>
        
        {/* 1. Fade Up */}
        <section className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-panel"
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>01. Fade Up Reveal</h2>
            <p style={{ color: 'var(--secondary)' }}>A smooth fade and upward slide as the element enters the viewport.</p>
          </motion.div>
        </section>

        {/* 2. Scale In */}
        <section className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="glass-panel"
            style={{ border: '1px solid var(--accent)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>02. Spring Scale In</h2>
            <p style={{ color: 'var(--secondary)' }}>Element scales up from 80% to 100% with a slight spring effect.</p>
          </motion.div>
        </section>

        {/* 3. Slide In Left */}
        <section className="container">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-panel"
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>03. Slide In From Left</h2>
            <p style={{ color: 'var(--secondary)' }}>Draws attention from the left side of the screen.</p>
          </motion.div>
        </section>

        {/* 4. Slide In Right */}
        <section className="container">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-panel"
            style={{ marginLeft: 'auto', maxWidth: '800px' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>04. Slide In From Right</h2>
            <p style={{ color: 'var(--secondary)' }}>Draws attention from the right side of the screen.</p>
          </motion.div>
        </section>

        {/* 5. Parallax Image */}
        <section className="container" style={{ position: 'relative', height: '400px', overflow: 'hidden', borderRadius: '24px' }}>
          <motion.div 
            style={{ 
              position: 'absolute', top: '-20%', left: 0, right: 0, bottom: '-20%',
              background: 'linear-gradient(45deg, #121212 0%, #2563eb 100%)',
              y: parallaxY
            }} 
          />
          <div style={{ position: 'relative', zIndex: 1, padding: '4rem', color: '#fff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>05. Parallax Depth</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '500px' }}>Background moves at a different speed than the foreground content, creating a sense of 3D depth.</p>
          </div>
        </section>

        {/* 6. Staggered List */}
        <section className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>06. Staggered Item Reveal</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
          >
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="glass-panel"
              >
                <h3>Item 0{i}</h3>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 7. Text Mask Reveal */}
        <section className="container">
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              style={{ fontSize: '4rem', fontFamily: 'var(--font-heading)' }}
            >
              07. Masked Text Reveal
            </motion.h2>
          </div>
          <p style={{ color: 'var(--secondary)' }}>Text smoothly slides up from behind an invisible mask.</p>
        </section>

        {/* 8. 3D Flip */}
        <section className="container">
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-panel"
            style={{ perspective: '1000px', transformOrigin: 'top' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>08. 3D Flip In</h2>
            <p style={{ color: 'var(--secondary)' }}>Element rotates into view using 3D transforms.</p>
          </motion.div>
        </section>

      </div>

      {/* 9. Horizontal Sticky Scroll */}
      <section ref={horizontalRef} style={{ height: '300vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: '150px', height: '400px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <motion.div style={{ x: xTransform, display: 'flex', gap: '4rem', padding: '0 5%' }}>
            <div style={{ minWidth: '40vw' }}>
              <h2 style={{ fontSize: '3rem' }}>09. Sticky Horizontal Scroll</h2>
              <p style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>Scroll down to move left and right through horizontal content.</p>
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-panel" style={{ minWidth: '400px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '2rem' }}>Card {i}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 10. Background Color Transition */}
      <motion.section ref={bgRef} style={{ backgroundColor, padding: '8rem 0', transition: 'background-color 0.5s ease' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>10. Dynamic Background</h2>
          <p style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>Background changes color as you scroll through this section.</p>
        </div>
      </motion.section>

    </main>
  );
}
