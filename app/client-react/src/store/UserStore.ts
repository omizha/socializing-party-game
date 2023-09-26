import { atomWithStorage } from 'jotai/utils';

export const nickname = atomWithStorage<string>('nickname', '');

export const profilePictureUrl = atomWithStorage<string>('profilePictureUrl', '/default-avatar.png');
