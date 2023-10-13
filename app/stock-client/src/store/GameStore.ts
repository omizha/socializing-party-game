import { atom } from 'jotai';
import { GamePhase } from 'shared~type';

export const gamePhase = atom<GamePhase>('WAITING');

export const quizId = atom<string>('');
