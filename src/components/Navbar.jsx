import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '0.8rem 2rem' : '1.2rem 2rem',
        background: scrolled ? 'rgba(17,17,17,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
          }}
        >
          ZK<span style={{ color: 'var(--orange-primary)' }}>.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              whileHover={{ color: 'var(--orange-primary)' }}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                letterSpacing: '0.5px',
                transition: 'color 0.2s',
              }}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="/Zakir_Khan_Resume.pdf"
            download
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--orange-glow-strong)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.5rem 1.2rem',
              background: 'var(--orange-primary)',
              color: '#fff',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-toggle"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
            style={{
              overflow: 'hidden',
              background: 'rgba(17,17,17,0.98)',
              borderTop: '1px solid var(--border-color)',
              marginTop: '0.8rem',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '1rem 1.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
