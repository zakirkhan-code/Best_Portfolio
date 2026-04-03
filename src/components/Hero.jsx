import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/zakirkhan-code', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/zakirkhan-blockchain-developer', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:mrzakikhan007@gmail.com', label: 'Email' },
  { icon: <SiWhatsapp />, href: 'https://wa.me/923164747689', label: 'WhatsApp' },
];

function FloatingParticles() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -400 - 100],
            opacity: [0, Math.random() * 0.4 + 0.1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: i % 3 === 0 ? 'var(--orange-primary)' : 'var(--text-muted)',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const titleWords = ['Blockchain', '&', 'Web3', 'Developer'];

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
      }}
    >
      {/* Background gradient orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,140,58,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <FloatingParticles />

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
          3+ years building DeFi protocols, smart contracts & full-stack dApps
          across Ethereum, Arbitrum, Polygon & BSC. Specializing in Solidity,
          security auditing & multi-chain architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--orange-glow-strong)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.9rem 2rem',
              background: 'var(--orange-primary)',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
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
            }}
          >
            Get In Touch
          </motion.a>
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
