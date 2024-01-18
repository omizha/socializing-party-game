import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { GameModule } from './game/game.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configsService: ConfigService) => {
        return {
          ignoreUndefined: true,
          uri: configsService.get<string>('MONGO_URI'),
        };
      },
    }),
    MulterModule.register(),
    GameModule,
  ],
  providers: [AppService, AppGateway],
})
export class AppModule {}
