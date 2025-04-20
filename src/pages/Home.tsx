import React, { useState, useEffect } from 'react';
import { FaCoins, FaCheck } from 'react-icons/fa';
import { Task } from '../types';

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
  tasksSection: {
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
  taskGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '12px'
  },
  taskCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '16px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
  },
  completedTaskCard: {
    background: 'rgba(34, 197, 94, 0.1)'
  },
  taskHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },
  taskIcon: {
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
  taskTitle: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a'
  },
  taskDescription: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '12px',
    lineHeight: '1.4'
  },
  taskReward: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#1a1a1a',
    fontWeight: '500' as const,
    marginBottom: '12px'
  },
  rewardIcon: {
    color: '#ffd700',
    fontSize: '16px'
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
  completedButton: {
    background: '#22c55e',
    cursor: 'default'
  }
};

const tasks: Task[] = [
  {
    id: 1,
    title: '完成注册',
    description: '注册并完善个人资料，开启您的AGI之旅',
    reward: 100,
    icon: FaCoins
  },
  {
    id: 2,
    title: '邀请好友',
    description: '邀请好友加入平台，双方都可获得奖励',
    reward: 50,
    icon: FaCoins
  },
  {
    id: 3,
    title: '首次质押',
    description: '参与质押挖矿，赚取AGI代币奖励',
    reward: 200,
    icon: FaCoins
  },
  {
    id: 4,
    title: '社区互动',
    description: '在社区中发表高质量内容或参与讨论',
    reward: 30,
    icon: FaCoins
  }
];

const Home: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [totalRewards, setTotalRewards] = useState<number>(0);
  const [dailyRewards, setDailyRewards] = useState<number>(0);

  useEffect(() => {
    // 从本地存储加载已完成的任务
    const savedTasks = localStorage.getItem('completedTasks');
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      setCompletedTasks(parsed);
      
      // 计算总奖励
      const total = tasks
        .filter(task => parsed.includes(task.id))
        .reduce((sum, task) => sum + task.reward, 0);
      setTotalRewards(total);
      
      // 设置每日奖励（示例）
      setDailyRewards(50);
    }
  }, []);

  const handleTaskComplete = (taskId: number) => {
    if (!completedTasks.includes(taskId)) {
      const newCompletedTasks = [...completedTasks, taskId];
      setCompletedTasks(newCompletedTasks);
      localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
      
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setTotalRewards(prev => prev + task.reward);
      }
    }
  };

  const stats = {
    totalRewards: totalRewards === 0 ? '0 AGI' : `${totalRewards.toLocaleString()} AGI`,
    dailyRewards: dailyRewards === 0 ? '0 AGI' : `${dailyRewards.toLocaleString()} AGI`,
    completedTasks: `${completedTasks.length}/${tasks.length}`,
    progress: `${Math.round((completedTasks.length / tasks.length) * 100)}%`
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>AGI</h1>
          <p style={styles.subtitle}>完成任务，赚取奖励</p>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.totalRewards}</div>
            <div style={styles.statLabel}>总收益</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.dailyRewards}</div>
            <div style={styles.statLabel}>今日收益</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.completedTasks}</div>
            <div style={styles.statLabel}>任务完成</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.progress}</div>
            <div style={styles.statLabel}>完成进度</div>
          </div>
        </div>

        <div style={styles.tasksSection}>
          <h2 style={styles.sectionTitle}>
            {React.createElement(FaCoins as any, { style: { color: '#6e8efb' } })}
            每日任务
          </h2>
          <div style={styles.taskGrid}>
            {tasks.map(task => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <div
                  key={task.id}
                  style={{
                    ...styles.taskCard,
                    ...(isCompleted ? styles.completedTaskCard : {})
                  }}
                >
                  <div style={styles.taskHeader}>
                    <div style={styles.taskIcon}>
                      {React.createElement(task.icon as any, { size: 24 })}
                    </div>
                    <h3 style={styles.taskTitle}>{task.title}</h3>
                  </div>
                  <p style={styles.taskDescription}>{task.description}</p>
                  <div style={styles.taskReward}>
                    {React.createElement(FaCoins as any, { style: styles.rewardIcon })}
                    {task.reward.toLocaleString()} AGI
                  </div>
                  <button
                    style={{
                      ...styles.button,
                      ...(isCompleted ? styles.completedButton : {})
                    }}
                    onClick={() => handleTaskComplete(task.id)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? (
                      <>
                        {React.createElement(FaCheck as any)} 已完成
                      </>
                    ) : (
                      '完成任务'
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 