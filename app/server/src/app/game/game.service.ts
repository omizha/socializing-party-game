import { Injectable } from '@nestjs/common';
import { UserProfile } from 'shared~type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument, Process } from './game.schema';
import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class GameService {
  constructor(
    private readonly socketGateway: SocketGateway,
    @InjectModel(Game.name)
    private readonly gameModel: Model<Game>,
  ) {}

  async get(): Promise<GameDocument> {
    const game = await this.gameModel.findOne({ unique: true });
    if (!game) {
      return (await this.gameModel.create(new Game())).save();
    }
    return game;
  }

  async setProcess(process: Process): Promise<GameDocument> {
    const game = await this.get();
    game.process = process;
    return game.save();
  }

  async fetchCurrentUserList(): Promise<UserProfile[]> {
    const sockets = await this.socketGateway.server.fetchSockets();
    const datas = sockets.map((socket) => socket.data).filter((data: UserProfile) => !!data.nickname);

    return datas;
  }

  emitCurrentUserList(userProfiles: UserProfile[]): boolean {
    return this.socketGateway.server.emit('currentUserList', userProfiles);
  }
}
