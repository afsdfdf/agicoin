import React, { useState } from 'react';
import styled from 'styled-components';
import { IconBaseProps } from 'react-icons';
import { FiLock, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';

// 定义不同质押类型的接口
interface StakingPool {
  id: string;
  title: string;
  type: 'LP' | 'USDT' | 'AGI' | 'NFT';
  apr: string;
  minAmount: string;
  lockPeriod: string;
  totalStaked: string;
  icon: string;
}

interface NFTTier {
  id: string;
  name: string;
  icon: string;
  apr: string;
  minAmount: string;
  lockPeriod: string;
  totalStaked: string;
  color: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => `${theme.colors.primary}10`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  margin: 0 auto ${({ theme }) => theme.spacing.sm};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.h3};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tab = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  background: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.backgroundAlt};
  color: ${({ theme, active }) => active ? '#fff' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
  outline: none;
  transition: ${({ theme }) => theme.transitions.default};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const RewardsCard = styled(Card)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const RewardItem = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const RewardValue = styled.div`
  font-size: ${({ theme }) => theme.typography.h4};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const RewardLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const InfoText = styled.div`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f6fa'
  },
  header: {
    background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
    padding: '40px 20px 100px',
    textAlign: 'center' as const,
    position: 'relative' as const,
    borderRadius: '0 0 30px 30px',
    overflow: 'hidden' as const,
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40%',
      background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)'
    }
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative' as const,
    zIndex: 1
  },
  title: {
    fontSize: 'clamp(24px, 5vw, 32px)',
    fontWeight: 'bold' as const,
    color: '#fff',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: 'clamp(14px, 3vw, 16px)',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '40px'
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '-60px auto 0',
    padding: '0 20px',
    position: 'relative' as const,
    zIndex: 2
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '24px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s ease'
  },
  statValue: {
    fontSize: 'clamp(20px, 4vw, 24px)',
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: '#666'
  },
  poolsSection: {
    marginTop: '40px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
    marginBottom: '20px'
  },
  poolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
  },
  poolCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  poolHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  poolIcon: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
    borderRadius: '12px',
    marginRight: '12px',
    color: '#fff'
  },
  poolTitle: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a'
  },
  poolStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px'
  },
  poolStatItem: {
    textAlign: 'left' as const
  },
  poolStatLabel: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '4px'
  },
  poolStatValue: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: '#1a1a1a'
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500' as const,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  },
  modal: {
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '24px',
    borderRadius: '20px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto' as const
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  input: {
    width: '100%',
    padding: '14px',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '16px',
    marginBottom: '20px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    '&:focus': {
      borderColor: '#6e8efb'
    }
  },
  nftTierGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  nftTierCard: {
    padding: '16px',
    borderRadius: '16px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  }
};

const stakingPools: StakingPool[] = [
  {
    id: 'lp-agi-usdt',
    title: 'AGI-USDT LP质押',
    type: 'LP',
    apr: '150%',
    minAmount: '100 LP',
    lockPeriod: '30天',
    totalStaked: '1,234,567 LP',
    icon: '🔄'
  },
  {
    id: 'usdt',
    title: 'USDT质押',
    type: 'USDT',
    apr: '80%',
    minAmount: '100 USDT',
    lockPeriod: '15天',
    totalStaked: '500,000 USDT',
    icon: '💵'
  },
  {
    id: 'agi',
    title: 'AGI质押',
    type: 'AGI',
    apr: '120%',
    minAmount: '1000 AGI',
    lockPeriod: '90天',
    totalStaked: '2,345,678 AGI',
    icon: '🪙'
  },
  {
    id: 'nft',
    title: 'NFT质押',
    type: 'NFT',
    apr: '200%',
    minAmount: '1 NFT',
    lockPeriod: '180天',
    totalStaked: '156 NFTs',
    icon: '🎨'
  }
];

const nftTiers: NFTTier[] = [
  {
    id: 'diamond',
    name: '钻石',
    icon: '💎',
    apr: '300%',
    minAmount: '1 NFT',
    lockPeriod: '365天',
    totalStaked: '12 NFTs',
    color: '#b9f2ff'
  },
  {
    id: 'gold',
    name: '黄金',
    icon: '🏆',
    apr: '250%',
    minAmount: '1 NFT',
    lockPeriod: '270天',
    totalStaked: '25 NFTs',
    color: '#ffd700'
  },
  {
    id: 'silver',
    name: '白银',
    icon: '🥈',
    apr: '200%',
    minAmount: '1 NFT',
    lockPeriod: '180天',
    totalStaked: '45 NFTs',
    color: '#c0c0c0'
  },
  {
    id: 'bronze',
    name: '青铜',
    icon: '🥉',
    apr: '150%',
    minAmount: '1 NFT',
    lockPeriod: '90天',
    totalStaked: '78 NFTs',
    color: '#cd7f32'
  },
  {
    id: 'iron',
    name: '黑铁',
    icon: '⚒️',
    apr: '100%',
    minAmount: '1 NFT',
    lockPeriod: '30天',
    totalStaked: '156 NFTs',
    color: '#a19d94'
  }
];

const Staking: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [selectedNFTTier, setSelectedNFTTier] = useState<NFTTier | null>(null);
  const [stakeAmount, setStakeAmount] = useState<string>('');

  const stats = {
    totalValueLocked: '$12,345,678',
    totalStakers: '5,678',
    averageAPR: '137.5%',
    totalRewards: '789,012 AGI'
  };

  const handleStake = () => {
    // 处理质押逻辑
    console.log(`Staking ${stakeAmount} in pool ${selectedPool?.title}`);
    setSelectedPool(null);
    setStakeAmount('');
  };

  const handleNFTStake = (tier: NFTTier) => {
    setSelectedNFTTier(tier);
    setSelectedPool(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>AGI 质押挖矿</h1>
          <p style={styles.subtitle}>多样化的质押选项，赚取丰厚收益</p>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.totalValueLocked}</div>
            <div style={styles.statLabel}>总锁仓价值</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.totalStakers}</div>
            <div style={styles.statLabel}>质押用户数</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.averageAPR}</div>
            <div style={styles.statLabel}>平均年化收益</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.totalRewards}</div>
            <div style={styles.statLabel}>总奖励发放</div>
          </div>
        </div>

        <div style={styles.poolsSection}>
          <h2 style={styles.sectionTitle}>质押池</h2>
          <div style={styles.poolsGrid}>
            {stakingPools.map(pool => (
              <div
                key={pool.id}
                style={styles.poolCard}
                onClick={() => {
                  if (pool.type === 'NFT') {
                    setSelectedPool(pool);
                  } else {
                    setSelectedPool(pool);
                    setSelectedNFTTier(null);
                  }
                }}
              >
                <div style={styles.poolHeader}>
                  <div style={styles.poolIcon}>{pool.icon}</div>
                  <h3 style={styles.poolTitle}>{pool.title}</h3>
                </div>
                <div style={styles.poolStats}>
                  <div style={styles.poolStatItem}>
                    <div style={styles.poolStatLabel}>年化收益率</div>
                    <div style={styles.poolStatValue}>{pool.apr}</div>
                  </div>
                  <div style={styles.poolStatItem}>
                    <div style={styles.poolStatLabel}>最低质押</div>
                    <div style={styles.poolStatValue}>{pool.minAmount}</div>
                  </div>
                  <div style={styles.poolStatItem}>
                    <div style={styles.poolStatLabel}>锁定期</div>
                    <div style={styles.poolStatValue}>{pool.lockPeriod}</div>
                  </div>
                  <div style={styles.poolStatItem}>
                    <div style={styles.poolStatLabel}>总质押量</div>
                    <div style={styles.poolStatValue}>{pool.totalStaked}</div>
                  </div>
                </div>
                <button style={styles.button}>
                  {pool.type === 'NFT' ? '选择等级' : '开始质押'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPool?.type === 'NFT' && (
        <div style={styles.overlay} onClick={() => setSelectedPool(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 style={styles.poolTitle}>选择NFT等级</h3>
            <p style={styles.subtitle}>请选择您要质押的NFT等级</p>
            <div style={styles.nftTierGrid}>
              {nftTiers.map(tier => (
                <div
                  key={tier.id}
                  style={{
                    ...styles.nftTierCard,
                    background: tier.color
                  }}
                  onClick={() => handleNFTStake(tier)}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{tier.icon}</div>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{tier.name}</div>
                  <div style={{ fontSize: '14px' }}>{tier.apr} APR</div>
                </div>
              ))}
            </div>
            <button style={styles.button} onClick={() => setSelectedPool(null)}>
              返回
            </button>
          </div>
        </div>
      )}

      {selectedNFTTier && (
        <div style={styles.overlay} onClick={() => setSelectedNFTTier(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 style={styles.poolTitle}>{selectedNFTTier.name} NFT质押</h3>
            <p style={styles.subtitle}>请输入质押数量</p>
            <div style={{
              background: selectedNFTTier.color,
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '20px',
              textAlign: 'center' as const
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{selectedNFTTier.icon}</div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{selectedNFTTier.name}</div>
              <div style={{ fontSize: '14px' }}>{selectedNFTTier.apr} APR</div>
            </div>
            <input
              type="text"
              style={styles.input}
              value={stakeAmount}
              onChange={e => setStakeAmount(e.target.value)}
              placeholder={`最低质押数量: ${selectedNFTTier.minAmount}`}
            />
            <button style={styles.button} onClick={handleStake}>
              确认质押
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staking; 