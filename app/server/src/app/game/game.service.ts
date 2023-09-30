import { Injectable } from '@nestjs/common';
import { Request, UserSchema } from 'shared~type';
import { server } from 'shared~config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './game.schema';
import { SocketGateway } from '../socket/socket.gateway';
import { UserService } from './user/user.service';

@Injectable()
export class GameService {
  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly userService: UserService,
    @InjectModel(Game.name)
    private readonly gameModel: Model<Game>,
  ) {}

  async get(): Promise<GameDocument> {
    let game: GameDocument;

    const session = await this.gameModel.startSession();
    await session.withTransaction(async () => {
      game = await this.gameModel.findOne({ unique: true });
      if (!game) {
        game = await this.gameModel.create(new Game());
      }
    });
    await session.endSession();

    return game;
  }

  async updateGame(game: Request.UpdateGame): Promise<Game> {
    console.debug('updateGame', game);
    const result = await this.gameModel.findOneAndUpdate({ unique: true }, game, { upsert: true });
    this.emitGameInfo(result);
    return result;
  }

  async fetchCurrentUserList(): Promise<UserSchema[]> {
    // const sockets = await this.socketGateway.server.fetchSockets();
    // const datas = sockets.map((socket) => socket.data.nickname).filter((v) => !!v);

    return this.userService.getUsers();
  }

  emitCurrentUserList(userProfiles: UserSchema[]): boolean {
    return this.socketGateway.server.emit('currentUserList', userProfiles);
  }

  emitGameInfo(game: Game): boolean {
    return this.socketGateway.server.emit(server.gameInfo, game);
  }
}
