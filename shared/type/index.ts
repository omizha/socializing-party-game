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
};

export type QuizOffsetByPhase = {
  answer: string;
  /**
   * 출제 시간
   */
  examTime: Date;
};

export type QuizRecordByPhase = {
  answer: string;
  isCorrect: boolean;
  recordTime: Date;
  score: number;
};

type Nickname = string;
export type QuizSchema = {
  isAnswerTime: boolean;
  currentPhaseIdx: number;
  offsetByPhase: Array<Date>;
  recordByPhase: Array<Map<Nickname, QuizRecordByPhase>>;
};
