import React, { useState } from 'react';
import { FaGem, FaMedal, FaAward, FaTrophy, FaShieldAlt } from 'react-icons/fa';
import { IconType, IconBaseProps } from 'react-icons';

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f6fa'
  },
  header: {
    background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
    padding: '20px 16px 80px',
    textAlign: 'center' as const,
    position: 'relative' as const,
    borderRadius: '0 0 40px 40px',
    overflow: 'hidden' as const
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative' as const,
    zIndex: 1
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold' as const,
    color: '#fff',
    marginBottom: '4px'
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '-50px auto 0',
    padding: '0 16px 32px',
    position: 'relative' as const,
    zIndex: 2
  },
  nftGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    padding: '20px 0'
  },
  nftCard: {
    background: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px)'
    }
  },
  imageContainer: {
    position: 'relative' as const,
    width: '100%',
    paddingTop: '100%',
    background: '#fff',
    overflow: 'hidden',
    borderRadius: '20px'
  },
  nftImage: {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  nftInfo: {
    padding: '20px'
  },
  nftTitle: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  nftDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '16px',
    lineHeight: '1.5'
  },
  nftStats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold' as const,
    color: '#6e8efb',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  supply: {
    fontSize: '14px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  button: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500' as const,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  tierBadge: {
    position: 'absolute' as const,
    bottom: '8px',
    right: '8px',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500' as const,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    zIndex: 1,
    background: '#1677ff'
  }
};

interface NFTTier {
  id: number;
  name: string;
  title: string;
  description: string;
  price: number;
  supply: number;
  image: string;
  icon: IconType;
  color: string;
  rewards: string;
}

const nftTiers: NFTTier[] = [
  {
    id: 1,
    name: 'Diamond',
    title: 'AGI 钻石级节点',
    description: '最高等级的 AGI 节点 NFT，享有 500% 挖矿收益加成，抢有项目决策一票决权，专属定制节点界面。',
    price: 100000,
    supply: 10,
    image: '/images/nft/agi-diamond.png',
    icon: FaGem,
    color: '#1677ff',
    rewards: '500% 挖矿加成'
  },
  {
    id: 2,
    name: 'Gold',
    title: 'AGI 黄金级节点',
    description: '高级节点特权，300% 挖矿收益加成，优先参与项目投票，专属客服支持。',
    price: 50000,
    supply: 50,
    image: '/images/nft/agi-iron.png',
    icon: FaTrophy,
    color: '#1677ff',
    rewards: '300% 挖矿加成'
  },
  {
    id: 3,
    name: 'Silver',
    title: 'AGI 白银级节点',
    description: '中级节点权益，200% 挖矿收益加成，社区荣誉徽章，专属活动资格。',
    price: 20000,
    supply: 200,
    image: '/images/nft/agi-gold.png',
    icon: FaMedal,
    color: '#1677ff',
    rewards: '200% 挖矿加成'
  },
  {
    id: 4,
    name: 'Bronze',
    title: 'AGI 青铜级节点',
    description: '入门级节点特权，150% 挖矿收益加成，参与社区治理。',
    price: 10000,
    supply: 500,
    image: '/images/nft/agi-copper.png',
    icon: FaAward,
    color: '#1677ff',
    rewards: '150% 挖矿加成'
  },
  {
    id: 5,
    name: 'Iron',
    title: 'AGI 铁级节点',
    description: '基础节点权益，120% 挖矿收益加成，基础社区权限。',
    price: 5000,
    supply: 1000,
    image: '/images/nft/agi-silver.png',
    icon: FaShieldAlt,
    color: '#1677ff',
    rewards: '120% 挖矿加成'
  }
];

const NFTMarketplace: React.FC = () => {
  const handlePurchase = async (nft: NFTTier) => {
    // 这里添加购买逻辑
    alert(`准备购买 ${nft.title}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>AGI 节点 NFT</h1>
          <p style={styles.subtitle}>解锁更高收益，享受专属特权</p>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.nftGrid}>
          {nftTiers.map(nft => (
            <div key={nft.id} style={styles.nftCard} onClick={() => handlePurchase(nft)}>
              <div style={styles.imageContainer}>
                <img
                  src={nft.image}
                  alt={nft.title}
                  style={styles.nftImage}
                />
                <div
                  style={{
                    ...styles.tierBadge
                  }}
                >
                  {React.createElement(nft.icon as React.ComponentType<IconBaseProps>, { size: 16 })}
                  {nft.name}
                </div>
              </div>
              <div style={styles.nftInfo}>
                <h3 style={styles.nftTitle}>
                  {React.createElement(nft.icon as React.ComponentType<IconBaseProps>, { size: 20, color: nft.color })}
                  {nft.title}
                </h3>
                <p style={styles.nftDescription}>{nft.description}</p>
                <div style={styles.nftStats}>
                  <div style={styles.price}>
                    {nft.price.toLocaleString()} AGI
                  </div>
                  <div style={styles.supply}>
                    限量 {nft.supply} 个
                  </div>
                </div>
                <button
                  style={styles.button}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchase(nft);
                  }}
                >
                  立即购买
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace; 