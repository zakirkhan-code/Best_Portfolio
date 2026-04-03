import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { FiExternalLink, FiGithub, FiPlay, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: 'MiniAMM',
    slug: 'miniamm',
    imageCount: 1, // put miniamm-1.png, miniamm-2.png, etc in public/images/
    subtitle: 'Uniswap V2-Style DEX',
    description: 'A fully functional decentralized exchange built on Sepolia testnet featuring token swapping, liquidity pool management, an admin dashboard, and a token faucet. Includes comprehensive security implementations.',
    tech: ['Solidity', 'Foundry', 'React', 'Vite', 'ethers.js'],
    chain: 'Sepolia',
    features: ['Token Swapping', 'Liquidity Pools', 'Admin Dashboard', 'Token Faucet', 'Security Audited'],
    github: 'https://github.com/zakirkhan-code/MiniAMM',
    color: '#ff6b00',
  },
  {
    id: 2,
    title: 'MedChain AI',
    slug: 'medchain-ai',
    imageCount: 5,
    subtitle: 'Decentralized Healthcare Records',
    description: 'A comprehensive healthcare platform with 6 Solidity contracts, 35+ backend APIs, a React admin panel, and a React Native mobile app. Features atomic record creation and AI chat with multi-provider fallback.',
    tech: ['Solidity', 'Node.js', 'Express', 'React', 'React Native', 'AI/ML'],
    chain: 'Sepolia',
    features: ['6 Smart Contracts', '35+ APIs', 'Mobile App', 'AI Chat Integration', 'Atomic Records'],
    github: 'https://github.com/zakirkhan-code/MedChain-AI',
    color: '#00d4aa',
  },
  {
    id: 3,
    title: 'RWA Tokenization Platform',
    slug: 'rwa-tokenization',
    imageCount: 1,
    subtitle: 'Real World Asset Tokenization',
    description: 'Production-grade RWA platform deployed on Arbitrum mainnet using ERC-3643 standard. Features 8 interconnected smart contracts including identity/KYC registries, marketplace, and escrow systems.',
    tech: ['Solidity', 'ERC-3643', 'Hardhat', 'React', 'ethers.js'],
    chain: 'Arbitrum',
    features: ['8 Smart Contracts', 'ERC-3643 Compliant', 'KYC Registry', 'Auction System', 'Mainnet Deployed'],
    github: 'https://github.com/AspireX24/fann_contract',
    color: '#28A0F0',
  },
  {
    id: 4,
    title: 'DeepYield Finance',
    slug: 'deepyield',
    imageCount: 4,
    subtitle: 'Multi-Chain DeFi Yield Aggregator',
    description: 'A sophisticated yield aggregation platform supporting multiple blockchain networks. Built with React and TypeScript, enabling users to optimize their DeFi yields across different protocols.',
    tech: ['React', 'TypeScript', 'Solidity', 'Multi-chain'],
    chain: 'Multi-Chain',
    features: ['Yield Optimization', 'Multi-Chain Support', 'Protocol Aggregation', 'Portfolio Dashboard'],
    github: 'https://github.com/zakirkhan-code',
    color: '#8247E5',
  },
  {
    id: 5,
    title: 'DeFi Lending Platform',
    slug: 'defi-lending',
    imageCount: 4,
    subtitle: 'Decentralized Lending & Borrowing',
    description: 'A full-featured lending protocol with smart contracts on Sepolia and a React Native mobile application, allowing users to lend and borrow assets in a decentralized manner.',
    tech: ['Solidity', 'React Native', 'Hardhat', 'Node.js'],
    chain: 'Sepolia',
    features: ['Lending/Borrowing', 'Mobile App', 'Interest Rates', 'Collateral Management'],
    github: 'https://github.com/zakirkhan-code/DEFI_LENDING_APP',
    color: '#F0B90B',
  },
  {
    id: 6,
    title: 'Soulbound NFT Credentials',
    slug: 'soulbound-nft',
    imageCount: 10,
    subtitle: 'NFT-Based Verification System',
    description: 'A credential verification system using non-transferable Soulbound tokens. Integrates IPFS storage via Pinata and OpenAI for intelligent credential analysis.',
    tech: ['Solidity', 'Node.js', 'React', 'IPFS', 'OpenAI'],
    chain: 'Sepolia',
    features: ['Soulbound Tokens', 'IPFS Storage', 'AI Integration', 'Credential Verification'],
    github: 'https://github.com/zakirkhan-code/Credentials_System',
    color: '#E44D26',
  },
  {
    id: 7,
    title: 'ChainBridge Pro',
    slug: 'chainbridge-pro',
    imageCount: 4,
    subtitle: 'Cross-Chain Asset Management',
    description: 'A cross-chain asset management solution enabling seamless token transfers and portfolio management across multiple blockchain networks with unified interface.',
    tech: ['Solidity', 'React', 'Cross-chain', 'ethers.js'],
    chain: 'Multi-Chain',
    features: ['Cross-Chain Transfers', 'Portfolio Management', 'Multi-Network', 'Unified Interface'],
    github: 'https://github.com/zakirkhan-code',
    color: '#00d4aa',
  },
  {
    id: 8,
    title: 'Monero Wallet',
    slug: 'monero-wallet',
    imageCount: 8,
    subtitle: 'Mobile Crypto Wallet',
    description: 'A React Native mobile wallet application for Monero cryptocurrency, built from the ground up with secure key management and transaction capabilities.',
    tech: ['React Native', 'Monero', 'Cryptography'],
    chain: 'Monero',
    features: ['Secure Wallet', 'Transaction History', 'Key Management', 'Mobile-First'],
    github: 'https://github.com/zakirkhan-code/Monero_Wallet_App',
    color: '#FF6600',
  },
];

function ProjectMedia({ project }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [autoSliding, setAutoSliding] = useState(false);
  const intervalRef = useRef(null);

  // Generate image paths: slug-1.png, slug-2.png, etc.
  const imageCount = project.imageCount || 1;
  const imagePaths = Array.from({ length: imageCount }, (_, i) =>
    `/images/${project.slug}-${i + 1}.png`
  );
  const videoPath = `/videos/${project.slug}.mp4`;
  const hasVideo = !videoError;
  const hasMultipleImages = loadedImages.length > 1;

  // Track which images actually loaded
  const handleImgLoad = useCallback((index) => {
    setLoadedImages((prev) => {
      if (prev.includes(index)) return prev;
      return [...prev, index].sort((a, b) => a - b);
    });
  }, []);

  const handleImgError = useCallback((index) => {
    // Don't add to loadedImages
  }, []);

  // Auto-slide on hover when multiple images & no video
  useEffect(() => {
    if (isHovered && hasMultipleImages && (!hasVideo || !videoLoaded)) {
      setAutoSliding(true);
      intervalRef.current = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % loadedImages.length);
      }, 1800);
    } else {
      setAutoSliding(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, hasMultipleImages, hasVideo, videoLoaded, loadedImages.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && hasVideo) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImg(0);
    if (videoRef.current && hasVideo) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const goToSlide = (e, idx) => {
    e.stopPropagation();
    setCurrentImg(idx);
    // Reset auto-slide timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % loadedImages.length);
      }, 1800);
    }
  };

  const goNext = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % loadedImages.length);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + loadedImages.length) % loadedImages.length);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${isHovered ? project.color + '60' : project.color + '30'}`,
        background: `linear-gradient(135deg, ${project.color}10, var(--bg-secondary))`,
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* === IMAGE LAYERS === */}
      {imagePaths.map((path, i) => (
        <img
          key={i}
          src={path}
          alt={`${project.title} screenshot ${i + 1}`}
          onLoad={() => handleImgLoad(i)}
          onError={() => handleImgError(i)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: (isHovered && videoLoaded && hasVideo)
              ? 0
              : (loadedImages.indexOf(i) === currentImg ? 1 : 0),
            transform: (loadedImages.indexOf(i) === currentImg && isHovered && !hasVideo)
              ? 'scale(1.05)' : 'scale(1)',
            transition: 'opacity 0.5s ease, transform 0.6s ease',
            zIndex: loadedImages.indexOf(i) === currentImg ? 1 : 0,
          }}
        />
      ))}

      {/* Fallback if NO images loaded */}
      {loadedImages.length === 0 && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '0.8rem',
        }}>
          <div style={{
            fontSize: '2.5rem',
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            color: `${project.color}40`,
          }}>
            {project.title.split(' ').map(w => w[0]).join('')}
          </div>
          <div style={{
            fontSize: '0.7rem', color: 'var(--text-muted)',
            fontFamily: "'Space Mono', monospace", letterSpacing: '1px',
          }}>
            {project.chain}
          </div>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
            backgroundImage: `radial-gradient(${project.color} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />
        </div>
      )}

      {/* === VIDEO LAYER === */}
      <video
        ref={videoRef}
        src={videoPath}
        muted
        loop
        playsInline
        preload="none"
        onCanPlay={() => setVideoLoaded(true)}
        onError={() => setVideoError(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          opacity: isHovered && videoLoaded && hasVideo ? 1 : 0,
          transition: 'opacity 0.4s ease',
          zIndex: 2,
        }}
      />

      {/* === OVERLAY === */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: isHovered
          ? (hasVideo && videoLoaded ? 'transparent' : 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)')
          : 'rgba(0,0,0,0.15)',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Play button for video */}
        {hasVideo && (
          <motion.div
            animate={{ scale: isHovered ? 0 : 1, opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 54, height: 54, borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              border: `2px solid ${project.color}80`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: project.color, fontSize: '1.2rem',
            }}
          >
            <FiPlay style={{ marginLeft: 3 }} />
          </motion.div>
        )}
      </div>

      {/* === NAVIGATION ARROWS (multiple images, no video playing) === */}
      {hasMultipleImages && isHovered && !(hasVideo && videoLoaded) && (
        <>
          <motion.button
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={goPrev}
            style={{
              position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
              zIndex: 5, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              border: `1px solid ${project.color}40`, borderRadius: '50%',
              width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', cursor: 'pointer', fontSize: '0.85rem',
            }}
          >
            <FiChevronLeft />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={goNext}
            style={{
              position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
              zIndex: 5, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              border: `1px solid ${project.color}40`, borderRadius: '50%',
              width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', cursor: 'pointer', fontSize: '0.85rem',
            }}
          >
            <FiChevronRight />
          </motion.button>
        </>
      )}

      {/* === DOTS INDICATOR === */}
      {hasMultipleImages && !(hasVideo && videoLoaded && isHovered) && (
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          zIndex: 5, display: 'flex', gap: '5px', alignItems: 'center',
          padding: '0.2rem 0.5rem', background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)', borderRadius: '20px',
        }}>
          {loadedImages.map((imgIdx, i) => (
            <button
              key={imgIdx}
              onClick={(e) => goToSlide(e, i)}
              style={{
                width: currentImg === i ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: currentImg === i ? project.color : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* === VIDEO PLAYING INDICATOR === */}
      {isHovered && videoLoaded && hasVideo && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute', bottom: 8, left: 8,
            padding: '0.2rem 0.6rem', background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)', borderRadius: '4px',
            display: 'flex', alignItems: 'center', gap: '0.4rem', zIndex: 5,
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#ff4444', animation: 'pulse-dot 1.5s infinite',
          }} />
          <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 500 }}>Playing Demo</span>
        </motion.div>
      )}

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function ProjectCard({ project, index, inView }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 * (index % 4), duration: 0.6, type: 'spring', stiffness: 80 }}
      whileHover={{ borderColor: `${project.color}60`, boxShadow: `0 8px 40px ${project.color}15` }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Media Area — thumbnail + hover video */}
      <div style={{ padding: '1rem 1rem 0' }}>
        <ProjectMedia project={project} />
      </div>

      {/* Content */}
      <div style={{ padding: '1.2rem' }}>
        {/* Chain Badge */}
        <div style={{
          display: 'inline-block',
          padding: '0.2rem 0.6rem',
          background: `${project.color}15`,
          border: `1px solid ${project.color}30`,
          borderRadius: '50px',
          fontSize: '0.7rem',
          color: project.color,
          fontWeight: 500,
          marginBottom: '0.6rem',
        }}>
          {project.chain}
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.2rem' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--orange-light)', fontFamily: "'Space Mono', monospace", marginBottom: '0.6rem' }}>
          {project.subtitle}
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem', fontWeight: 300 }}>
          {project.description}
        </p>

        {/* Features */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {project.features.slice(0, 3).map((f) => (
            <span key={f} style={{
              padding: '0.2rem 0.5rem',
              background: 'var(--bg-secondary)',
              borderRadius: '4px',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
            }}>
              {f}
            </span>
          ))}
          {project.features.length > 3 && (
            <span style={{
              padding: '0.2rem 0.5rem',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
            }}>
              +{project.features.length - 3} more
            </span>
          )}
        </div>

        {/* Tech Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              padding: '0.15rem 0.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              fontFamily: "'Space Mono', monospace",
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: 'var(--orange-primary)' }}
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'color 0.2s' }}
          >
            <FiGithub /> Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="projects" style={{ padding: '7rem 0' }}>
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="orange-line" />
          <h2 className="section-title">
            Featured <span className="accent">Projects</span>
          </h2>
          <p className="section-subtitle">Real-world blockchain solutions I've architected and built</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}