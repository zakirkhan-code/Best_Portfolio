import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

const contactInfo = [
  { icon: <FiMail />, label: 'Email', value: 'mrzakikhan007@gmail.com', href: 'mailto:mrzakikhan007@gmail.com' },
  { icon: <SiWhatsapp />, label: 'WhatsApp / WeChat', value: '+92 316 4747689', href: 'https://wa.me/923164747689' },
  { icon: <FiMapPin />, label: 'Location', value: 'Lahore, Pakistan', href: null },
];

const socialLinks = [
  { icon: <FiGithub />, href: 'https://github.com/zakirkhan-code', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/zakirkhan-blockchain-developer', label: 'LinkedIn' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" style={{ padding: '7rem 0' }}>
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <div className="orange-line" style={{ margin: '0 auto 1.5rem' }} />
          <h2 className="section-title">
            Let's <span className="accent">Connect</span>
          </h2>
          <p className="section-subtitle">Have a project in mind? Let's build something amazing together.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: 900, margin: '0 auto' }} className="contact-grid">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Get in Touch
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <div style={{
                    width: 42, height: 42,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--orange-glow)',
                    borderRadius: '10px',
                    color: 'var(--orange-primary)',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>{info.label}</p>
                    {info.href ? (
                      <a href={info.href} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {info.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, background: 'var(--orange-primary)', color: '#fff', borderColor: 'var(--orange-primary)' }}
                  style={{
                    width: 42, height: 42,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div
              style={{
                padding: '2rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--orange-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--orange-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project..."
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--orange-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 25px var(--orange-glow-strong)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '0.8rem',
                    background: 'var(--orange-primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontFamily: 'inherit',
                  }}
                >
                  <FiSend /> Send Message
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
