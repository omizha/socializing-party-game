import { Injectable } from '@nestjs/common';
import { UserProfile } from 'shared~type';
import { SocketGateway } from './socket/socket.gateway';

@Injectable()
export class AppService {
  constructor(private readonly websocketServerGateway: SocketGateway) {}

  async fetchCurrentUserList(): Promise<UserProfile[]> {
    const sockets = await this.websocketServerGateway.server.fetchSockets();
    const datas = sockets.map((socket) => socket.data);

    return datas;
  }

  emitCurrentUserList(userProfiles: UserProfile[]): boolean {
    return this.websocketServerGateway.server.emit('currentUserList', userProfiles);
  }
}
