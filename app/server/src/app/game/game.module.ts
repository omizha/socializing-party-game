import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { Game, gameSchema } from './game.schema';
import { SocketModule } from '../socket/socket.module';
import { GameController } from './game.controller';
import { UserModule } from './user/user.module';
import { GameGateway } from './game.gateway';
import { QuizModule } from './quiz/quiz.module';

@Module({
  controllers: [GameController],
  imports: [MongooseModule.forFeature([{ name: Game.name, schema: gameSchema }]), SocketModule, UserModule, QuizModule],
  providers: [GameService, GameGateway],
})
export class GameModule {}
