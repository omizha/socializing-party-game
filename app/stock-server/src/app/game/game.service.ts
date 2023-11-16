import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyInfo, Request } from 'shared~type-stock';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, UpdateQuery } from 'mongoose';
import { stock } from 'shared~config';
import { getDateDistance } from '@toss/date';
import { ceilToUnit } from '@toss/utils';
import { Game, GameDocument } from './game.schema';
import { UserService } from './user/user.service';
import { LogService } from './log/log.service';
import { Log } from './log/log.schema';
import { ResultService } from './result/result.service';
import { Result } from './result/result.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name)
    private readonly gameModel: Model<Game>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly userService: UserService,
    private readonly logService: LogService,
    private readonly resultService: ResultService,
  ) {}

  private async findOneAndUpdate(update: UpdateQuery<Game>): Promise<GameDocument> {
    let game: GameDocument;

    const session = await this.gameModel.startSession();
    await session.withTransaction(async () => {
      game = await this.gameModel.findOneAndUpdate({ unique: true }, update, {
        returnDocument: 'after',
        upsert: true,
      });
    });
    await session.endSession();

    return game;
  }

  async get(options?: mongoose.QueryOptions<Game>): Promise<GameDocument> {
    let game: GameDocument;

    const session = await this.gameModel.startSession();
    await session.withTransaction(async () => {
      game = await this.gameModel.findOne({ unique: true }, null, options);
      if (!game) {
        game = await this.gameModel.create(new Game());
      }
    });
    await session.endSession();

    return game;
  }

  async updateGame(game: Request.UpdateGame): Promise<Game> {
    console.debug('updateGame', game);
    const result = await this.findOneAndUpdate(game);
    return result;
  }

  async resetGame(): Promise<Game> {
    let game: Game;

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      game = await this.findOneAndUpdate({
        $set: {
          companies: {},
          fluctuationsInterval: 5,
          gamePhase: 'CROWDING',
          isTransaction: false,
          isVisibleRank: false,
          remainingStocks: {},
          round: 0,
          startedTime: new Date(),
          transactionInterval: 2,
        },
      });
      await this.userService.initializeUsers({ session });
      await this.logService.deleteAll({ session });
    });
    await session.endSession();

    return game;
  }

  async initStock(): Promise<Game> {
    const players = await this.userService.getUsers();

    const newCompanies = {} as Record<stock.CompanyNames, CompanyInfo[]>;
    const playerIdxs = [...Array(players.length).keys()];
    const randomPlayers = [...playerIdxs, ...playerIdxs, ...playerIdxs].sort(() => Math.random() - 0.5);
    const companyPriceChange: string[][] = [[]];
    // 1:00 ~ 1:45
    for (let i = 1; i < 10; i++) {
      companyPriceChange[i] = [...stock.getRandomCompanyNames(Math.ceil(players.length / 3))];
    }

    stock.getRandomCompanyNames().forEach((key) => {
      const company = key as stock.CompanyNames;
      // 1:00 ~ 1:45
      for (let i = 0; i < 10; i++) {
        if (!newCompanies[company]) {
          newCompanies[company] = [];
        }

        if (i === 0) {
          newCompanies[company][0] = {
            가격: 100000,
            정보: [],
          };
        } else {
          const isChange = companyPriceChange[i].some((v) => v === key);
          const prevPrice = newCompanies[company][i - 1].가격;
          // const price = isChange ? prevPrice + (Math.floor(Math.random() * 1000) - 500) * 100 : prevPrice;
          // const price = prevPrice + (Math.floor(Math.random() * 1000) - 500) * 100;

          const frunc = Math.floor(Math.random() * prevPrice) - Math.floor(prevPrice / 2);
          const price = ceilToUnit(prevPrice + (isChange ? Math.min(Math.random() * 50000, frunc) : frunc), 100);
          const info = [];

          if (isChange) {
            const infoPlayerIdx = randomPlayers.pop();
            if (infoPlayerIdx !== undefined) {
              const partnerPlayerIdx = infoPlayerIdx === players.length - 1 ? 0 : infoPlayerIdx + 1;
              info.push(players[infoPlayerIdx].nickname, players[partnerPlayerIdx].nickname);
            }
          }

          newCompanies[company][i] = {
            가격: price,
            정보: info,
          };
        }
      }
    });

    const remainingStocks = {};
    Object.keys(newCompanies).forEach((company) => {
      remainingStocks[company] = players.length * 2 - 1;
    });

    const result = this.findOneAndUpdate({
      $set: {
        companies: newCompanies,
        fluctuationsInterval: 5,
        gamePhase: 'PLAYING',
        isTransaction: false,
        isVisibleRank: false,
        remainingStocks,
        startedTime: new Date(),
        transactionInterval: 2,
      },
    });

    await this.logService.deleteAll();
    return result;
  }

  async buyStock(body: Request.BuyStock): Promise<Game> {
    const { nickname, company, amount, unitPrice } = body;
    console.debug('buyStock', { amount, company, nickname, unitPrice });
    let result: Game;

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const game = await this.get({ session });
      const user = await this.userService.getUser(nickname, { session });
      const players = await this.userService.getUsers({ session });

      if (!game.isTransaction) {
        throw new HttpException('지금은 거래할 수 없습니다', HttpStatus.CONFLICT);
      }

      if (!user) {
        throw new HttpException('유저 정보를 불러올 수 없습니다', HttpStatus.CONFLICT);
      }

      const { minutes, seconds } = getDateDistance(user.lastActivityTime, new Date());
      if (minutes === 0 && seconds < game.transactionInterval) {
        throw new HttpException(`${game.transactionInterval}초에 한 번만 거래할 수 있습니다`, HttpStatus.CONFLICT);
      }

      const companies = game.companies as unknown as Map<string, CompanyInfo[]>;
      const remainingStocks = game.remainingStocks as unknown as Map<string, number>;

      const companyInfo = companies.get(company);
      if (!companyInfo) {
        throw new HttpException('회사를 찾을 수 없습니다', HttpStatus.CONFLICT);
      }

      if (remainingStocks?.get(company) < amount) {
        throw new HttpException('시장에 주식이 없습니다', HttpStatus.CONFLICT);
      }

      // x분 단위로 가격이 변함
      const idx = Math.min(
        Math.floor(getDateDistance(game.startedTime, new Date()).minutes / game.fluctuationsInterval),
        9,
      );
      const companyPrice = companyInfo[idx].가격;
      const totalPrice = companyPrice * amount;
      if (user.money < totalPrice) {
        throw new HttpException('돈이 부족합니다', HttpStatus.CONFLICT);
      }
      if (companyPrice !== unitPrice) {
        throw new HttpException('주가가 변동되었습니다. 다시 시도해주세요', HttpStatus.CONFLICT);
      }

      const inventory = user.inventory as unknown as Map<string, number>;
      const companyCount = inventory.get(company) || 0;

      if (companyCount + amount > players.length - 1) {
        throw new HttpException('주식 보유 한도 초과', HttpStatus.CONFLICT);
      }

      inventory.set(company, companyCount + amount);

      const remainingCompanyStock = remainingStocks.get(company);
      remainingStocks.set(company, remainingCompanyStock - amount);

      user.money -= totalPrice;
      user.lastActivityTime = new Date();

      await user.save({
        session,
      });
      result = await game.save({
        session,
      });
      this.logService.addLog(
        new Log({
          action: 'BUY',
          company,
          date: user.lastActivityTime,
          nickname,
          price: companyPrice,
          quantity: amount,
        }),
      );
    });
    await session.endSession();

    return result;
  }

  async sellStock(body: Request.SellStock): Promise<Game> {
    const { nickname, company, amount, unitPrice } = body;
    let result: Game;

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const game = await this.get({ session });
      const user = await this.userService.getUser(nickname, { session });

      if (!user) {
        throw new HttpException('유저 정보를 불러올 수 없습니다', HttpStatus.CONFLICT);
      }

      if (!game.isTransaction) {
        throw new HttpException('지금은 거래할 수 없습니다', HttpStatus.CONFLICT);
      }

      const { minutes, seconds } = getDateDistance(user.lastActivityTime, new Date());
      if (minutes === 0 && seconds < game.transactionInterval) {
        throw new HttpException(`${game.transactionInterval}초에 한 번만 거래할 수 있습니다`, HttpStatus.CONFLICT);
      }

      const companies = game.companies as unknown as Map<string, CompanyInfo[]>;
      const remainingStocks = game.remainingStocks as unknown as Map<string, number>;
      const companyInfo = companies.get(company);
      const remainingCompanyStock = remainingStocks.get(company);

      if (!companyInfo) {
        throw new HttpException('회사 정보를 불러올 수 없습니다', HttpStatus.CONFLICT);
      }

      const inventory = user.inventory as unknown as Map<string, number>;
      if (!inventory.get(company) || inventory.get(company) < amount) {
        throw new HttpException('주식을 보유하고 있지 않습니다', HttpStatus.CONFLICT);
      }

      const idx = Math.min(
        Math.floor(getDateDistance(game.startedTime, new Date()).minutes / game.fluctuationsInterval),
        9,
      );
      const companyPrice = companyInfo[idx].가격;
      const totalPrice = companyPrice * amount;

      if (companyPrice !== unitPrice) {
        throw new HttpException('주가가 변동되었습니다. 다시 시도해주세요', HttpStatus.CONFLICT);
      }

      inventory.set(company, inventory.get(company) - amount);
      user.money += totalPrice;
      user.lastActivityTime = new Date();

      remainingStocks.set(company, remainingCompanyStock + amount);

      await user.save({ session });
      result = await game.save({ session });

      this.logService.addLog(
        new Log({
          action: 'SELL',
          company,
          date: user.lastActivityTime,
          nickname,
          price: companyPrice,
          quantity: amount,
        }),
      );
    });
    await session.endSession();

    return result;
  }

  async allUserSellStock(): Promise<Game> {
    let result: Game;

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const game = await this.get(session);
      const users = await this.userService.getUsers(session);

      if (!users) {
        throw new Error('users not found');
      }

      for await (const user of users) {
        const inventory = user.inventory as unknown as Map<string, number>;
        const companies = game.companies as unknown as Map<string, CompanyInfo[]>;
        const remainingStocks = game.remainingStocks as unknown as Map<string, number>;

        const idx = Math.min(
          Math.floor(getDateDistance(game.startedTime, new Date()).minutes / game.fluctuationsInterval),
          9,
        );
        inventory.forEach((amount, company) => {
          const companyPrice = companies.get(company)[idx]?.가격;
          const totalPrice = companyPrice * amount;

          user.money += totalPrice;
          remainingStocks.set(company, remainingStocks.get(company) + amount);
          inventory.set(company, 0);
        });

        await user.save({ session });
      }
      result = await game.save({ session });
    });
    await session.endSession();

    return result;
  }

  async saveGameResult(): Promise<Result[]> {
    let results: Result[];

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const game = await this.get(session);
      const users = await this.userService.getUsers(session);

      if (!users) {
        throw new Error('users not found');
      }

      for await (const user of users) {
        await this.resultService.setResult(
          {
            money: user.money,
            nickname: user.nickname,
            round: game.round,
          },
          {
            session,
          },
        );
      }

      results = await this.resultService.getResults(undefined, { session });
      results = results.filter((v) => v.round === game.round);
    });
    await session.endSession();

    return results;
  }
}
