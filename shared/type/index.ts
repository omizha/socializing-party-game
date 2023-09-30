export type * as Request from './Request';
export type * as Response from './Response';

export type UserSchema = {
  nickname: string;
  profilePictureUrl: string;
  isEntry: boolean;
};

const GamePhase = {
  CROWDING: 'CROWDING',
  QUIZ: 'QUIZ',
  WAITING: 'WAITING',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

export type QuizPhase = 'intro' | 'quiz' | 'result' | 'end';

export type GameSchema = {
  unique: boolean;
  gamePhase: GamePhase;
};
