import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SiSolidity, SiEthereum, SiReact, SiNodedotjs, SiTypescript, SiMongodb, SiDocker, SiGit } from 'react-icons/si';
import { FiDatabase, FiSmartphone, FiTerminal, FiShield } from 'react-icons/fi';

const skillCategories = [
  {
    title: 'Blockchain & Smart Contracts',
    icon: <SiEthereum />,
    skills: [
      { name: 'Solidity', level: 95 },
      { name: 'Foundry', level: 90 },
      { name: 'Hardhat', level: 88 },
      { name: 'ethers.js / web3.js', level: 92 },
      { name: 'ERC Standards (20/721/1155/3643)', level: 90 },
      { name: 'OpenZeppelin', level: 88 },
    ],
  },
  {
    title: 'Security & Auditing',
    icon: <FiShield />,
    skills: [
      { name: 'Slither', level: 82 },
      { name: 'Mythril', level: 78 },
      { name: 'Ethernaut / DVDeFi', level: 85 },
      { name: 'UUPS Proxy Patterns', level: 85 },
      { name: 'Gas Optimization', level: 88 },
    ],
  },
  {
    title: 'Frontend & Mobile',
    icon: <SiReact />,
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'React Native', level: 80 },
      { name: 'TypeScript', level: 85 },
      { name: 'Vite / Next.js', level: 82 },
      { name: 'Tailwind CSS', level: 88 },
    ],
  },
  {
    title: 'Backend & DevOps',
    icon: <SiNodedotjs />,
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'REST APIs', level: 92 },
      { name: 'Git / GitHub', level: 90 },
      { name: 'IPFS / Pinata', level: 80 },
    ],
  },
];

const chains = [
  { name: 'Ethereum', color: '#627EEA' },
  { name: 'Arbitrum', color: '#28A0F0' },
  { name: 'Polygon', color: '#8247E5' },
  { name: 'BSC', color: '#F0B90B' },
  { name: 'Sepolia', color: '#CFB5F0' },
];

function SkillBar({ name, level, delay, inView }) {
  return (
    <div style={{ marginBottom: '0.8rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 400 }}>{name}</span>
        <span style={{ fontSize: '0.75rem', fontFamily: "'Space Mono', monospace", color: 'var(--orange-light)' }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: 'var(--border-color)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, var(--orange-primary), var(--orange-light))`,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" style={{ padding: '7rem 0', background: 'var(--bg-secondary)' }}>
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="orange-line" />
          <h2 className="section-title">
            Tech <span className="accent">Stack</span>
          </h2>
          <p className="section-subtitle">Tools and technologies I work with daily</p>
        </motion.div>

        {/* Chain badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          {chains.map((chain, i) => (
            <motion.div
              key={chain.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                padding: '0.4rem 1rem',
                background: `${chain.color}15`,
                border: `1px solid ${chain.color}40`,
                borderRadius: '50px',
                fontSize: '0.82rem',
                fontWeight: 500,
                color: chain.color,
                cursor: 'default',
              }}
            >
              {chain.name}
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + ci * 0.15, duration: 0.5 }}
              whileHover={{ borderColor: 'var(--orange-primary)', boxShadow: '0 4px 25px var(--orange-glow)' }}
              style={{
                padding: '1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.2rem' }}>
                <span style={{
                  fontSize: '1.2rem', color: 'var(--orange-primary)',
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--orange-glow)', borderRadius: '8px',
                }}>
                  {cat.icon}
                </span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{cat.title}</h3>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.3 + ci * 0.1 + si * 0.08}
                  inView={inView}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
