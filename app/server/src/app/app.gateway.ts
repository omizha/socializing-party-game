import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WebsocketServerGateway } from './websocket-server/websocket-server.gateway';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayDisconnect {
  constructor(private readonly websocketServerGateway: WebsocketServerGateway) {}

  async handleDisconnect(client: Socket): Promise<void> {
    const sockets = await this.websocketServerGateway.server.fetchSockets();
    const datas = sockets.map((socket) => socket.data);

    this.websocketServerGateway.server.emit('currentUserList', datas);
  }

  @SubscribeMessage('message')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleMessage(client: Socket, payload: any): string {
    console.debug(payload);
    this.websocketServerGateway.server.emit('foo', `${client.data.nickname} : ${payload}`);
    return 'Hello World!';
  }

  @SubscribeMessage('foo')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFoo(client: Socket, payload: any): string {
    console.debug(payload);
    // server.emit('foo', payload);
    return 'Hello World!';
  }

  @SubscribeMessage('setNickname')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async setNickname(client: Socket, payload: any): Promise<string> {
    console.debug('setNickname', payload);
    client.data.nickname = payload;
    client.join(payload);

    const sockets = await this.websocketServerGateway.server.fetchSockets();

    const nicknames = sockets.map((socket) => {
      return socket.data.nickname;
    });

    console.log(nicknames);

    return 'Hello World!';
  }

  @SubscribeMessage('setUserProfile')
  async setUserProfile(client: Socket, payload: { nickname: string; profilePictureUrl: string }): Promise<string> {
    console.debug('setUserProfile', payload);

    client.data.nickname = payload.nickname;
    client.data.profilePictureUrl = payload.profilePictureUrl;
    client.join(payload.nickname);

    const sockets = await this.websocketServerGateway.server.fetchSockets();
    const datas = sockets.map((socket) => socket.data);

    this.websocketServerGateway.server.emit('currentUserList', datas);

    return 'Hello World!';
  }
}
