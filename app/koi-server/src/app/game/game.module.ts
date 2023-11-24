import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { Game, gameSchema } from './game.schema';
import { GameController } from './game.controller';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import { ResultModule } from './result/result.module';

@Module({
  controllers: [GameController],
  imports: [MongooseModule.forFeature([{ name: Game.name, schema: gameSchema }]), UserModule, LogModule, ResultModule],
  providers: [GameService],
})
export class GameModule {}
