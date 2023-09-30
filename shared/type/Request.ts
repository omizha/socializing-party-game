import type { GameSchema } from '.';

export type Empty = null;

export type UpdateGame = Partial<Omit<GameSchema, 'unique'>>;
