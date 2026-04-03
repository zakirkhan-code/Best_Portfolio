import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCode, FiShield, FiLayers, FiGlobe } from 'react-icons/fi';

const highlights = [
  { icon: <FiCode />, title: 'Smart Contracts', desc: 'Solidity, Foundry, Hardhat' },
  { icon: <FiShield />, title: 'Security', desc: 'Auditing, Slither, Mythril' },
  { icon: <FiLayers />, title: 'DeFi Protocols', desc: 'AMMs, Lending, Yield' },
  { icon: <FiGlobe />, title: 'Multi-Chain', desc: 'ETH, Arbitrum, Polygon, BSC' },
];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Built' },
  { value: '4+', label: 'Chains Deployed' },
  { value: '8+', label: 'Smart Contracts' },
];

function CountUp({ value }) {
  return <span>{value}</span>;
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="orange-line" />
          <h2 className="section-title">
            About <span className="accent">Me</span>
          </h2>
          <p className="section-subtitle">Building the decentralized future, one contract at a time</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Left - Bio */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
            className="about-left"
          >
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)', fontWeight: 300 }}>
              I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Zakir Khan</strong>, a Blockchain & Full-Stack Web3 Developer from Pakistan
              with over 3 years of experience in designing, developing, and deploying decentralized applications.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)', fontWeight: 300 }}>
              My expertise spans the entire Web3 stack — from writing gas-optimized Solidity smart contracts
              and conducting security audits, to building responsive React frontends and React Native mobile apps
              that interact seamlessly with on-chain protocols.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)', fontWeight: 300 }}>
              I've worked on DeFi lending platforms, DEXs, RWA tokenization systems, NFT marketplaces,
              and healthcare dApps — deploying across Ethereum, Arbitrum, Polygon, and BSC networks.
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: 'var(--orange-primary)',
                  }}>
                    <CountUp value={stat.value} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.3 }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="about-right">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4, type: 'spring' }}
                whileHover={{
                  y: -5,
                  borderColor: 'var(--orange-primary)',
                  boxShadow: '0 8px 30px var(--orange-glow)',
                }}
                style={{
                  padding: '1.5rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  color: 'var(--orange-primary)',
                  marginBottom: '0.8rem',
                  width: 42, height: 42,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--orange-glow)',
                  borderRadius: '10px',
                }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.3rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .section-container > div { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .about-left div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
