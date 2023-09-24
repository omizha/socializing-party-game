import { atomWithStorage } from 'jotai/utils';

export const nickname = atomWithStorage<string>('nickname', '')