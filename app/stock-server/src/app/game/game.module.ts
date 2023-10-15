import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { Game, gameSchema } from './game.schema';
import { GameController } from './game.controller';
import { UserModule } from './user/user.module';

@Module({
  controllers: [GameController],
  imports: [MongooseModule.forFeature([{ name: Game.name, schema: gameSchema }]), UserModule],
  providers: [GameService],
})
export class GameModule {}
