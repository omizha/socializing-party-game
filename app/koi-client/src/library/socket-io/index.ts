import { io } from 'socket.io-client';
import { serverWebsocketUrl } from '../../config/baseUrl';

export const socket = io(serverWebsocketUrl);
