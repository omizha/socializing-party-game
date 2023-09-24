import { Module } from '@nestjs/common';
import { WebsocketServerGateway } from './websocket-server/websocket-server.gateway';

@Module({
  exports: [WebsocketServerGateway],
  providers: [WebsocketServerGateway],
})
export class WebsocketServerModule {}
