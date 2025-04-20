import React, { useState, useEffect } from 'react';
import { FaCoins, FaChartLine, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

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
    padding: '0 16px',
    position: 'relative' as const,
    zIndex: 2
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '12px',
    marginBottom: '24px'
  },
  statCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '16px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
  },
  statValue: {
    fontSize: '20px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#666'
  },
  section: {
    marginTop: '24px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  strategyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '12px'
  },
  strategyCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '16px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)'
    }
  },
  strategyHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },
  strategyIcon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
    borderRadius: '10px',
    marginRight: '10px',
    color: '#fff'
  },
  strategyTitle: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a'
  },
  strategyDescription: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '12px',
    lineHeight: '1.4'
  },
  strategyStats: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#666',
    marginBottom: '12px'
  },
  button: {
    width: '100%',
    padding: '10px',
    background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500' as const,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '14px',
    marginBottom: '12px'
  },
  riskLabel: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500' as const,
    marginBottom: '8px'
  },
  selectedStrategyCard: {
    border: '2px solid #6e8efb',
    transform: 'translateY(-2px)'
  }
};

interface Strategy {
  id: number;
  title: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedReturn: string;
  minInvestment: number;
  successRate: string;
}

const strategies: Strategy[] = [
  {
    id: 1,
    title: '稳健增长',
    description: '低风险策略，适合保守型投资者，通过多元化投资实现稳定收益',
    riskLevel: 'Low',
    expectedReturn: '8-12%',
    minInvestment: 1000,
    successRate: '95%'
  },
  {
    id: 2,
    title: '均衡发展',
    description: '中等风险策略，平衡收益与风险，适合大多数投资者',
    riskLevel: 'Medium',
    expectedReturn: '15-25%',
    minInvestment: 5000,
    successRate: '85%'
  },
  {
    id: 3,
    title: '激进增长',
    description: '高风险高收益策略，适合风险承受能力强的投资者',
    riskLevel: 'High',
    expectedReturn: '30-50%',
    minInvestment: 10000,
    successRate: '75%'
  }
];

const AIPlatform: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const stats = {
    totalValue: '12,345,678',
    activeUsers: '5,678',
    avgReturn: '137.5%',
    totalStaked: '789,012'
  };

  const getRiskColor = (risk: Strategy['riskLevel']) => {
    switch (risk) {
      case 'Low':
        return { background: '#e6f4ea', color: '#1e8e3e' };
      case 'Medium':
        return { background: '#fef7e6', color: '#f2994a' };
      case 'High':
        return { background: '#fce8e8', color: '#eb5757' };
    }
  };

  const handleInvest = async () => {
    if (!selectedStrategy || !investmentAmount) return;
    
    setLoading(true);
    try {
      // 这里添加投资逻辑
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('投资成功！');
      setSelectedStrategy(null);
      setInvestmentAmount('');
    } catch (error) {
      alert('投资失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>AI投资</h1>
          <p style={styles.subtitle}>智能投资，稳健收益</p>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>${stats.totalValue}</div>
            <div style={styles.statLabel}>总锁仓价值</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.activeUsers}</div>
            <div style={styles.statLabel}>质押用户数</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.avgReturn}</div>
            <div style={styles.statLabel}>平均年化收益</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.totalStaked} AGI</div>
            <div style={styles.statLabel}>总质押数量</div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {React.createElement(FaChartLine as React.ComponentType<IconBaseProps>, { style: { color: '#6e8efb' } })}
            投资策略
          </h2>
          <div style={styles.strategyGrid}>
            {strategies.map(strategy => (
              <div
                key={strategy.id}
                style={{
                  ...styles.strategyCard,
                  ...(selectedStrategy?.id === strategy.id ? styles.selectedStrategyCard : {})
                }}
                onClick={() => setSelectedStrategy(strategy)}
              >
                <div style={styles.strategyHeader}>
                  <div style={styles.strategyIcon}>
                    {React.createElement(FaChartLine as React.ComponentType<IconBaseProps>)}
                  </div>
                  <h3 style={styles.strategyTitle}>{strategy.title}</h3>
                </div>
                <div
                  style={{
                    ...styles.riskLabel,
                    ...getRiskColor(strategy.riskLevel)
                  }}
                >
                  风险等级: {strategy.riskLevel}
                </div>
                <p style={styles.strategyDescription}>{strategy.description}</p>
                <div style={styles.strategyStats}>
                  <span>预期收益: {strategy.expectedReturn}</span>
                  <span>成功率: {strategy.successRate}</span>
                </div>
                <div style={styles.strategyStats}>
                  <span>最低投资: {strategy.minInvestment.toLocaleString()} AGI</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedStrategy && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              {React.createElement(FaCoins as React.ComponentType<IconBaseProps>, { style: { color: '#6e8efb' } })}
              投资金额
            </h2>
            <div style={styles.strategyCard}>
              <input
                type="number"
                style={styles.input}
                placeholder={`最低投资 ${selectedStrategy.minInvestment.toLocaleString()} AGI`}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                min={selectedStrategy.minInvestment}
              />
              <button
                style={styles.button}
                onClick={handleInvest}
                disabled={loading || !investmentAmount || Number(investmentAmount) < selectedStrategy.minInvestment}
              >
                {loading ? '处理中...' : '确认投资'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlatform; 