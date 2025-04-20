import { IconType } from 'react-icons';

export interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  icon: IconType;
} 