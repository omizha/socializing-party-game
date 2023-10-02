import { atom } from 'jotai';
import { QuizOffsetByPhase, QuizRecordByPhase } from 'shared~type';

export const id = atom('');

export const isAnswerTime = atom(false);

export const currentPhaseIdx = atom(0);

export const offsetByPhase = atom<Array<QuizOffsetByPhase>>([]);

export const recordByPhase = atom<Array<Record<string, QuizRecordByPhase>>>([]);
