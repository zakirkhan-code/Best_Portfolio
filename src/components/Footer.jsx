import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer style={{
      padding: '2rem 0',
      borderTop: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
    }}>
      <div className="section-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '1.1rem',
            fontWeight: 700,
          }}>
            ZK<span style={{ color: 'var(--orange-primary)' }}>.</span>
          </span>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            © {new Date().getFullYear()} Zakir Khan. All rights reserved.
          </p>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Built with <FiHeart style={{ color: 'var(--orange-primary)', fontSize: '0.75rem' }} /> by Zakir Khan
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {[
            { icon: <FiGithub />, href: 'https://github.com/zakirkhan-code' },
            { icon: <FiLinkedin />, href: 'https://linkedin.com/in/zakirkhan-blockchain-developer' },
            { icon: <FiMail />, href: 'mailto:mrzakikhan007@gmail.com' },
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: 'var(--orange-primary)' }}
              style={{ color: 'var(--text-muted)', fontSize: '1rem', transition: 'color 0.2s' }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
