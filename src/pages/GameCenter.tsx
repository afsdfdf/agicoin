import React, { useState } from 'react';
import { FaGamepad, FaUsers, FaGift } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  players: number;
  reward: number;
}

const games: Game[] = [
  {
    id: 1,
    title: '赛车竞速',
    description: '体验刺激的赛车竞速游戏，与其他玩家一较高下，赢取丰厚奖励。',
    image: '/images/games/racing.png',
    players: 128,
    reward: 500
  },
  {
    id: 2,
    title: '寻宝探险',
    description: '探索神秘的宝藏地图，解开谜题，获得隐藏的AGI代币奖励。',
    image: '/images/games/treasure.png',
    players: 256,
    reward: 300
  },
  {
    id: 3,
    title: '农场经营',
    description: '经营你的虚拟农场，种植作物，饲养动物，通过交易赚取AGI代币。',
    image: '/images/games/farm.png',
    players: 512,
    reward: 200
  }
];

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
  gameGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    padding: '20px 0'
  },
  gameCard: {
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
  gameImage: {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  gameBadge: {
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
  },
  gameInfo: {
    padding: '20px'
  },
  gameTitle: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
    marginBottom: '8px'
  },
  gameDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '16px',
    lineHeight: '1.5'
  },
  gameStats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  players: {
    fontSize: '14px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  reward: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: '#6e8efb',
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
    gap: '8px',
    '&:hover': {
      opacity: 0.9
    }
  }
};

const GameCenter: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
    // TODO: Implement game launch logic
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>游戏中心</h1>
          <p style={styles.subtitle}>玩游戏赚取AGI代币，享受游戏乐趣</p>
        </div>
      </div>
      
      <div style={styles.mainContent}>
        <div style={styles.gameGrid}>
          {games.map((game) => (
            <div key={game.id} style={styles.gameCard}>
              <div style={styles.imageContainer}>
                <img src={game.image} alt={game.title} style={styles.gameImage} />
                <div style={styles.gameBadge}>
                  {React.createElement(FaGamepad as React.ComponentType<IconBaseProps>)}
                  <span>游戏</span>
                </div>
              </div>
              <div style={styles.gameInfo}>
                <h3 style={styles.gameTitle}>{game.title}</h3>
                <p style={styles.gameDescription}>{game.description}</p>
                <div style={styles.gameStats}>
                  <div style={styles.players}>
                    {React.createElement(FaUsers as React.ComponentType<IconBaseProps>)}
                    <span>{game.players} 玩家</span>
                  </div>
                  <div style={styles.reward}>
                    {React.createElement(FaGift as React.ComponentType<IconBaseProps>)}
                    <span>{game.reward} AGI</span>
                  </div>
                </div>
                <button 
                  style={styles.button}
                  onClick={() => handlePlayGame(game)}
                >
                  {React.createElement(FaGamepad as React.ComponentType<IconBaseProps>)}
                  开始游戏
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCenter; 