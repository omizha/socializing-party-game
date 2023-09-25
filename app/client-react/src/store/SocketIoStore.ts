import { atom } from 'jotai';
import { UserProfile } from 'shared~type';
import { socket } from '../library/socket-io';

export const isConnected = atom(socket.connected);

export const userList = atom<UserProfile[]>([]);
