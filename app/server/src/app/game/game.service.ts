import { Injectable } from '@nestjs/common';
import { Request, UserSchema } from 'shared~type';
import { server } from 'shared~config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './game.schema';
import { SocketGateway } from '../socket/socket.gateway';
import { UserService } from './user/user.service';
import { QuizService } from './quiz/quiz.service';
import { QuizDocument } from './quiz/quiz.schema';

@Injectable()
export class GameService {
  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly userService: UserService,
    private readonly quizService: QuizService,
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
    const result = await this.gameModel.findOneAndUpdate({ unique: true }, game, {
      returnDocument: 'after',
      upsert: true,
    });
    this.emitGameInfo(result);
    return result;
  }

  async getGameQuiz(): Promise<{ game: GameDocument; quiz: QuizDocument }> {
    const game = await this.get();
    const quiz = await this.quizService.getQuiz(game.quizId.toHexString());
    return { game, quiz };
  }

  async setGameQuiz(): Promise<Game> {
    const quiz = await this.quizService.createQuiz();
    return this.updateGame({ gamePhase: 'QUIZ', quizId: quiz.id });
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
