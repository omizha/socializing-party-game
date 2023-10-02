import { Types } from 'mongoose';

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

export type GameSchema = {
  unique: boolean;
  gamePhase: GamePhase;
  quizId?: Types.ObjectId | null;
};

export type QuizOffsetByPhase = {
  answer: string;
  /**
   * 출제 시간
   */
  examTime: number;
};

export type QuizRecordByPhase = {
  answer: string;
  isCorrect: boolean;
  recordTime: number;
  score: number;
};

type Nickname = string;
export type QuizSchema = {
  isAnswerTime: boolean;
  currentPhaseIdx: number;
  offsetByPhase: Array<QuizOffsetByPhase>;
  recordByPhase: Array<Record<Nickname, QuizRecordByPhase>>;
};
