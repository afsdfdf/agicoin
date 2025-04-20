import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const GameCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  background-color: ${({ theme }) => theme.colors.background};
`;

const GameInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const GameTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const GameDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Stat = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9em;
`;

const StatValue = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const PlayButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const games = [
  {
    id: 1,
    title: '幸运抽奖',
    description: '使用 AGI 代币参与抽奖，赢取丰厚奖励！',
    image: '/images/games/game-lottery.png',
    onlinePlayers: '1.2k',
    prizePool: '5,000 AGI',
    minParticipation: '10 AGI'
  },
  {
    id: 2,
    title: '价格竞猜',
    description: '预测 AGI 价格走势，猜对赢取奖池奖励！',
    image: '/images/games/game-price-guess.png',
    onlinePlayers: '856',
    prizePool: '2,500 AGI',
    minParticipation: '50 AGI'
  },
  {
    id: 3,
    title: '挖矿游戏',
    description: '通过游戏化挖矿体验，赚取额外 AGI 奖励！',
    image: '/images/games/game-mining.png',
    onlinePlayers: '3.4k',
    prizePool: '10,000 AGI',
    minParticipation: '0 AGI'
  },
  {
    id: 4,
    title: 'NFT 卡牌对战',
    description: '使用你的 NFT 卡牌参与对战，胜利获得奖励！',
    image: '/images/games/game-nft-battle.png',
    onlinePlayers: '968',
    prizePool: '7,500 AGI',
    minParticipation: '100 AGI'
  }
];

const Games: React.FC = () => {
  return (
    <Container>
      <Title>游戏中心</Title>
      <GameGrid>
        {games.map(game => (
          <GameCard key={game.id}>
            <GameImage src={game.image} alt={game.title} />
            <GameInfo>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              <StatsRow>
                <Stat>
                  <StatValue>{game.onlinePlayers}</StatValue>
                  <StatLabel>在线玩家</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>{game.prizePool}</StatValue>
                  <StatLabel>奖池</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>{game.minParticipation}</StatValue>
                  <StatLabel>最小参与</StatLabel>
                </Stat>
              </StatsRow>
              <PlayButton>开始游戏</PlayButton>
            </GameInfo>
          </GameCard>
        ))}
      </GameGrid>
    </Container>
  );
};

export default Games; 