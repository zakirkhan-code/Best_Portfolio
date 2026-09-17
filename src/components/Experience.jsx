import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBriefcase, FiCode } from 'react-icons/fi';

const experiences = [
  {
    role: 'Finance Specialist',
    company: 'Freelance — Upwork, Fiverr, PeoplePerHour',
    period: 'Mar 2026 — Present',
    type: 'Freelance',
    location: 'Lahore, Remote',
    description: 'Building SafarPay, an investor-grade cross-border remittance platform end-to-end — smart contracts, mobile app, admin dashboard, and real-time backend — as a solo blockchain and fintech engineer.',
    highlights: [
      'Built an investor-grade fintech platform solo in 6 months — 6 smart contracts, mobile app, admin operations dashboard, and WebSocket-driven backend',
      "Architected a hybrid off-chain customer flow with on-chain treasury settlement (Wise-style model with public audit trail) — ~50ms zero-gas user transfers; cross-border value settles in batched USDT (~$0.05 vs SWIFT's $30)",
      'Designed an atomic dual-pool fiat ledger handling Add Funds, internal transfers, and Cashout with prisma.$transaction guarantees',
      'Deployed 5 verified contracts — Admin Controller (role registry + pause), UserRegistry (KYC state machine), FeeManager (1%/5% cap), RateOracle (Chainlink-style staleness checks), and RemittanceEscrow — all verified on Etherscan',
    ],
  },
  {
    role: 'Blockchain Lead',
    company: 'AspireX LLC',
    period: 'Jul 2024 — Mar 2026',
    type: 'Full-Time',
    location: 'Lahore, Hybrid',
    description: 'Promoted to Blockchain Lead, owning on-chain architecture decisions across the team’s product portfolio — from RWA tokenization to AI-driven DApps.',
    highlights: [
      'Deployed an ERC-3643 RWA tokenization platform with 12 contracts on Arbitrum mainnet (escrow, marketplace, KYC, compliance)',
      'Built a Soulbound NFT (ERC-5192) credential verification system with AI-powered certificate validation on Sepolia',
      'Architected a P2P DeFi lending platform end-to-end — Solidity contracts, React Native app, Node.js backend, MongoDB',
      'Created a multi-chain DeFi yield aggregator with automated strategy optimization across Ethereum, BSC, and Polygon',
      'Delivered a cross-platform privacy-focused crypto wallet (stealth addresses, encrypted storage) and an AI-driven supply chain tracking DApp',
      "Led engineering decisions and took ownership of on-chain logic across the team's product portfolio",
    ],
  },
  {
    role: 'Blockchain Developer',
    company: 'AspireX LLC',
    period: 'Feb 2023 — Jul 2024',
    type: 'Full-Time',
    location: 'Qatar, Remote',
    description: 'Architected multi-chain DeFi protocols and cross-chain bridge solutions with focus on scalability, security, and cost optimization.',
    highlights: [
      'Architected multi-chain DeFi protocols across Ethereum, BSC, and Polygon with 99.9% uptime',
      'Built a cross-chain bridge and L2 scaling solution, reducing transaction costs by 85%',
      'Developed yield optimization contracts managing $2M+ TVL with advanced security patterns',
      'Created a multi-chain DEX aggregator with 40+ protocol integrations',
    ],
  },
  {
    role: 'Mern & Bern Stack Developer',
    company: 'Interware PVT',
    period: 'Aug 2022 — Feb 2023',
    type: 'Full-Time',
    location: 'Lahore, On-site',
    description: 'Designed production-ready smart contracts and responsive DApp frontends with focus on gas optimization and multi-chain deployment security.',
    highlights: [
      'Designed 15+ production smart contracts with gas optimization, achieving 30–40% cost reductions',
      'Built React DApp frontends with Web3 integration and EIP-2612 permit functionality',
      'Developed custom tokenomics with deflationary mechanisms and reward distribution systems',
      'Processed 10,000+ transactions with zero critical vulnerabilities across multi-chain deployments',
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
