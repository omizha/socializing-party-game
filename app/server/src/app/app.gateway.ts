import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WebsocketServerGateway } from './websocket-server/websocket-server/websocket-server.gateway';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(private readonly websocketServerGateway: WebsocketServerGateway) {}

  @SubscribeMessage('message')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleMessage(client: Socket, payload: any): string {
    console.debug(payload);
    client.emit('foo', payload);
    this.websocketServerGateway.server.emit('foo', `전체발송${payload}`);
    return 'Hello World!';
  }

  @SubscribeMessage('foo')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFoo(client: Socket, payload: any): string {
    console.debug(payload);
    // server.emit('foo', payload);
    return 'Hello World!';
  }
}
