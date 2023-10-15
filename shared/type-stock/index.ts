export type * as Request from './Request';
export type * as Response from './Response';

export type UserSchema = {
  nickname: string;
  money: number;
  inventory: Record<string, number>;
};

const GamePhase = {
  CROWDING: 'CROWDING',
  PLAYING: 'PLAYING',
  WAITING: 'WAITING',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

export type CompanyInfo = {
  가격: number;
  정보: string[];
};

export type GameSchema = {
  unique: boolean;
  gamePhase: GamePhase;
  startedTime?: Date;
  companies?: Record<string, CompanyInfo[]>;
  remainingStocks?: Record<string, number>;
};
