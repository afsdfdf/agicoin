import React, { useState } from 'react';

// 使用内联样式而不是 styled-components
const styles = {
  container: {
    padding: '16px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '24px',
    textAlign: 'center' as const
  },
  card: {
    background: '#f8f9fa',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    background: '#fff',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  statValue: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    color: '#333',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#666'
  },
  inputGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    color: '#333',
    fontSize: '16px',
    boxSizing: 'border-box' as const
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: '#007bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '16px'
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  iconPlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(0, 123, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#007bff',
    fontSize: '20px',
    margin: '0 auto 8px'
  }
};

// 简化版的 AIPlatform 组件，不使用外部依赖
const AIPlatformBasic: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  // 简化的数据
  const stats = {
    totalInvested: '1,234,567 AGI',
    averageReturn: '18.5%',
    activeUsers: '2,345',
    successRate: '92%'
  };

  // 简化的策略
  const strategies = [
    {
      title: '稳健增长',
      description: '低风险投资组合，主要投资大市值代币和稳定币，适合长期持有',
      risk: '低',
      return: '8-15%',
      period: '3-6个月'
    },
    {
      title: '均衡发展',
      description: '中等风险投资组合，平衡配置各类代币，适合中期投资',
      risk: '中',
      return: '15-25%',
      period: '2-4个月'
    },
    {
      title: '激进增长',
      description: '高风险高收益，主要投资新兴代币和DeFi项目，适合短期投机',
      risk: '高',
      return: '25-40%',
      period: '1-3个月'
    }
  ];

  const handleSubmit = async () => {
    try {
      if (!amount || parseFloat(amount) <= 0) return;
      
      setLoading(true);
      // 模拟 AI 分析过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowResult(true);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI 智能投资</h1>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.iconPlaceholder}>$</div>
          <div style={styles.statValue}>{stats.totalInvested}</div>
          <div style={styles.statLabel}>总投资额</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.iconPlaceholder}>%</div>
          <div style={styles.statValue}>{stats.averageReturn}</div>
          <div style={styles.statLabel}>平均收益率</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.iconPlaceholder}>U</div>
          <div style={styles.statValue}>{stats.activeUsers}</div>
          <div style={styles.statLabel}>活跃用户</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.iconPlaceholder}>✓</div>
          <div style={styles.statValue}>{stats.successRate}</div>
          <div style={styles.statLabel}>投资成功率</div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>投资金额 (AGI)</label>
          <input
            style={styles.input}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="请输入投资金额"
            min="0"
          />
        </div>

        <button
          style={{
            ...styles.button,
            ...(loading || !amount || parseFloat(amount) <= 0 ? styles.buttonDisabled : {})
          }}
          onClick={handleSubmit}
          disabled={loading || !amount || parseFloat(amount) <= 0}
        >
          {loading ? '分析中...' : '开始投资分析'}
        </button>
      </div>

      {showResult && (
        <div style={styles.card}>
          <h3 style={{ ...styles.title, marginBottom: '16px' }}>AI 投资方案</h3>
          <p>您的投资金额: {amount} AGI</p>
          <p>预期收益: 根据您选择的策略，预期年化收益为 15-25%</p>
          <p>建议投资周期: 2-4个月</p>
        </div>
      )}
    </div>
  );
};

export default AIPlatformBasic; 