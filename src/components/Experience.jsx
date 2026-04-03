import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBriefcase, FiCode } from 'react-icons/fi';

const experiences = [
  {
    role: 'Smart Contract Engineer',
    company: 'AspirexLLC',
    period: '2025 — Present',
    type: 'Contract-Based',
    location: 'Remote',
    description: 'Leading smart contract development for DeFi protocols and RWA tokenization platforms, building AI-powered blockchain solutions and secure multi-chain deployments.',
    highlights: [
      'Developed ERC-3643 compliant RWA tokenization platform with marketplace and escrow functionality, deploying 12 smart contracts on Arbitrum mainnet including IdentityRegistry and KYCRegistry',
      'Built AI-powered credential verification system using Soulbound NFTs (ERC-5192) for educational certificate validation with AI image analysis on Sepolia testnet',
      'Architected full-stack P2P DeFi lending platform with Solidity smart contracts, escrow system, React Native mobile app, Node.js/Express backend, and MongoDB integration deployed on Sepolia',
      'Developed Monero cryptocurrency wallet application in React Native with background blockchain sync, stealth address generation, encrypted storage, and cross-platform iOS/Android support',
      'Created DeFi yield aggregator with multi-chain support, automated strategy optimization, and liquidity pool management across Ethereum, BSC, and Polygon',
      'Architected supply chain tracking DApp integrating React frontend, Node.js backend, and Ethereum smart contracts with AI-powered delay prediction',
      'Implemented secure smart contract patterns achieving zero critical vulnerabilities across 15+ production deployments with comprehensive unit and integration testing',
    ],
  },
  {
    role: 'Blockchain Developer',
    company: 'Deep Ring Technologies',
    period: '2024 — 2025',
    type: 'Contract-Based',
    location: 'Remote',
    description: 'Architected multi-chain DeFi protocols and cross-chain bridge solutions with focus on scalability, security, and cost optimization.',
    highlights: [
      'Architected multi-chain DeFi protocols supporting Ethereum, BSC, and Polygon with 99.9% uptime and robust error handling',
      'Developed cross-chain bridge functionality and Layer 2 scaling solutions reducing transaction costs by 85%',
      'Built automated yield optimization contracts managing $2M+ TVL with advanced security implementations',
      'Created multi-chain DEX aggregator with 40+ protocol integrations and NFT lending protocol',
    ],
  },
  {
    role: 'Full Stack Blockchain Developer',
    company: 'Interware PVT',
    period: '2023 — 2024',
    type: 'Contract-Based',
    location: 'Remote',
    description: 'Designed production-ready smart contracts and responsive DApp frontends with focus on gas optimization and multi-chain deployment security.',
    highlights: [
      'Designed 15+ production-ready smart contracts with comprehensive testing and gas optimization achieving 30-40% cost reductions',
      'Built responsive DApp frontends with React and Web3 integration implementing EIP-2612 permit functionality',
      'Developed custom tokenomics models with deflationary mechanisms and reward distribution systems',
      'Handled 10,000+ transactions with zero critical vulnerabilities across multi-chain deployments',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" style={{ padding: '7rem 0', background: 'var(--bg-secondary)' }}>
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="orange-line" />
          <h2 className="section-title">
            Work <span className="accent">Experience</span>
          </h2>
          <p className="section-subtitle">My professional journey in the Web3 space</p>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 800 }}>
          {/* Timeline line */}
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              position: 'absolute',
              left: 20,
              top: 0,
              width: 2,
              background: 'linear-gradient(180deg, var(--orange-primary), var(--orange-primary)20)',
            }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
              style={{ position: 'relative', paddingLeft: 60, marginBottom: '2.5rem' }}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.2, type: 'spring' }}
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 5,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: '3px solid var(--orange-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange-primary)' }} />
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ borderColor: 'var(--orange-primary)', boxShadow: '0 4px 25px var(--orange-glow)' }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{exp.role}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--orange-light)', fontWeight: 500 }}>{exp.company}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      background: 'var(--orange-glow)',
                      borderRadius: '50px',
                      fontSize: '0.72rem',
                      color: 'var(--orange-light)',
                      fontWeight: 500,
                    }}>
                      {exp.type}
                    </span>
                    {exp.location && (
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '50px',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        fontWeight: 400,
                      }}>
                        {exp.location}
                      </span>
                    )}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}>
                      {exp.period}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem', fontWeight: 300 }}>
                  {exp.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {exp.highlights.map((h) => (
                    <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--orange-primary)', marginTop: '0.35rem', fontSize: '0.5rem' }}>&#9670;</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
