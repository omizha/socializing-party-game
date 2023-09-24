import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { WebsocketServerModule } from './websocket-server/websocket-server.module';

@Module({
  controllers: [AppController],
  imports: [WebsocketServerModule],
  providers: [AppService, AppGateway],
})
export class AppModule {}
