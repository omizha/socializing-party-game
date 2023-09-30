import { atom } from 'jotai';
import { UserSchema } from 'shared~type';
import { socket } from '../library/socket-io';

/**
 * @deprecated 작동 안됨
 */
export const isConnected = atom(socket.connected);

export const userList = atom<UserSchema[]>([]);
