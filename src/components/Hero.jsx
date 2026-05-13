import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

function MagneticButton({ children, strength = 0.35, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy, ...(props.style || {}) }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/zakirkhan-code', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/zakirkhan-blockchain-developer', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:mrzakikhan007@gmail.com', label: 'Email' },
  { icon: <SiWhatsapp />, href: 'https://wa.me/923164747689', label: 'WhatsApp' },
];

function ConstellationNetwork() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width / dpr;
    const H = () => canvas.height / dpr;

    const count = Math.min(80, Math.floor((W() * H()) / 18000));
    const points = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.6,
      pulse: Math.random() * Math.PI * 2,
    }));

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('mouseleave', handleLeave);

    const LINK_DIST = 140;
    const MOUSE_DIST = 180;

    const animate = (time) => {
      ctx.clearRect(0, 0, W(), H());

      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W()) p.vx *= -1;
        if (p.y < 0 || p.y > H()) p.vy *= -1;
        p.pulse += 0.02;
      });

      // Lines between close points
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.18;
            ctx.strokeStyle = `rgba(255, 107, 0, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }

        // Mouse-to-point line (cursor magnetism)
        const mdx = points[i].x - mouseRef.current.x;
        const mdy = points[i].y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < MOUSE_DIST) {
          const alpha = (1 - mdist / MOUSE_DIST) * 0.45;
          ctx.strokeStyle = `rgba(255, 140, 58, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      }

      // Points with pulse
      points.forEach((p) => {
        const pulseScale = 1 + Math.sin(p.pulse) * 0.3;
        const r = p.r * pulseScale;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        grad.addColorStop(0, 'rgba(255, 140, 58, 0.7)');
        grad.addColorStop(1, 'rgba(255, 107, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 170, 90, 0.85)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  );
}

export default function Hero() {
  const titleWords = ['Blockchain', '&', 'Web3', 'Developer'];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '60px',
      }}
    >
      {/* Background gradient orbs — breathing */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.10) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{
            position: 'absolute', bottom: '-20%', left: '-10%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,140,58,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <ConstellationNetwork />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: `linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            background: 'var(--orange-glow)',
            border: '1px solid rgba(255,107,0,0.3)',
            borderRadius: '50px',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: 'var(--orange-light)', letterSpacing: '2px' }}>
            &#9670; AVAILABLE FOR HIRE
          </span>
        </motion.div>

        <div style={{ marginBottom: '1.5rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: 'var(--text-secondary)', marginBottom: '0.8rem', fontWeight: 300 }}
          >
            Hello, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Zakir <span style={{ color: 'var(--orange-primary)' }}>Khan</span>
          </motion.h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2rem' }}>
          {titleWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5, type: 'spring', stiffness: 100 }}
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                fontWeight: word === '&' ? 300 : 600,
                color: word === '&' ? 'var(--text-muted)' : 'var(--text-secondary)',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            maxWidth: 650,
            margin: '0 auto 2.5rem',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            fontWeight: 300,
          }}
        >
          4+ years building DeFi protocols, smart contracts & full-stack dApps
          across Ethereum, Arbitrum, Polygon & BSC. Specializing in Solidity,
          security auditing & multi-chain architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}
        >
          <MagneticButton
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--orange-glow-strong)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.9rem 2rem',
              background: 'var(--orange-primary)',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
            }}
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            whileHover={{ scale: 1.05, borderColor: 'var(--orange-primary)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.9rem 2rem',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-hover)',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'border-color 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            Get In Touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem' }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: 'var(--orange-primary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              style={{ fontSize: '1.3rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
              title={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '-4rem', left: '50%', transform: 'translateX(-50%)', color: 'var(--text-muted)', fontSize: '1.3rem' }}
        >
          <FiArrowDown />
        </motion.div>
      </div>
    </section>
  );
}
