import { Injectable } from '@nestjs/common';
import { CompanyInfo, Request } from 'shared~type-stock';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, UpdateQuery } from 'mongoose';
import { stock } from 'shared~config';
import { getDateDistance } from '@toss/date';
import { Game, GameDocument } from './game.schema';
import { UserService } from './user/user.service';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name)
    private readonly gameModel: Model<Game>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly userService: UserService,
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
          gamePhase: 'CROWDING',
          remainingStocks: {},
          startedTime: new Date(),
        },
      });
      // await this.userService.removeAllUser();
    });
    session.endSession();

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
          const price = isChange ? prevPrice + (Math.floor(Math.random() * 20000) - 10000) * 10 : prevPrice;
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
      remainingStocks[company] = players.length - 1;
    });

    const result = this.findOneAndUpdate({
      $set: {
        companies: newCompanies,
        gamePhase: 'PLAYING',
        remainingStocks,
        startedTime: new Date(),
      },
    });
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

      if (!user) {
        throw new Error('user not found');
      }

      const companies = game.companies as unknown as Map<string, CompanyInfo[]>;
      const remainingStocks = game.remainingStocks as unknown as Map<string, number>;

      const companyInfo = companies.get(company);
      if (!companyInfo) {
        throw new Error('company not found');
      }

      if (remainingStocks?.get(company) < amount) {
        throw new Error('not enough stocks');
      }

      // 5분 단위로 가격이 변함
      const idx = Math.floor(getDateDistance(game.startedTime, new Date()).minutes / 5);
      const companyPrice = companyInfo[idx].가격;
      const totalPrice = companyPrice * amount;
      if (user.money < totalPrice) {
        throw new Error('not enough money');
      }
      if (companyPrice !== unitPrice) {
        throw new Error('invalid price');
      }

      const inventory = user.inventory as unknown as Map<string, number>;
      const companyCount = inventory.get(company) || 0;
      inventory.set(company, companyCount + amount);

      const remainingCompanyStock = remainingStocks.get(company);
      remainingStocks.set(company, remainingCompanyStock - amount);

      user.money -= totalPrice;

      await user.save({
        session,
      });
      result = await game.save({
        session,
      });
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
        throw new Error('user not found');
      }

      const companies = game.companies as unknown as Map<string, CompanyInfo[]>;
      const remainingStocks = game.remainingStocks as unknown as Map<string, number>;
      const companyInfo = companies.get(company);
      const remainingCompanyStock = remainingStocks.get(company);

      if (!companyInfo) {
        throw new Error('company not found');
      }

      const inventory = user.inventory as unknown as Map<string, number>;
      if (!inventory.get(company) || inventory.get(company) < amount) {
        throw new Error('not enough stocks');
      }

      const idx = Math.floor(getDateDistance(game.startedTime, new Date()).minutes / 5);
      const companyPrice = companyInfo[idx].가격;
      const totalPrice = companyPrice * amount;

      if (companyPrice !== unitPrice) {
        throw new Error('invalid price');
      }

      inventory.set(company, inventory.get(company) - amount);
      user.money += totalPrice;

      remainingStocks.set(company, remainingCompanyStock + amount);

      await user.save({ session });
      result = await game.save({ session });
    });
    await session.endSession();

    return result;
  }

  async sellAllStock(nickname: string): Promise<Game> {
    let result: Game;

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const game = await this.get(session);
      const user = await this.userService.getUser(nickname);

      if (!user) {
        throw new Error('user not found');
      }

      const { inventory } = user;
      const { companies } = game;
      const { remainingStocks } = game;

      Object.keys(inventory).forEach((company) => {
        const amount = inventory[company];
        const idx = Math.floor(getDateDistance(new Date(), game.startedTime).minutes / 5);
        const companyPrice = companies?.[company]?.[idx]?.가격;
        const totalPrice = companyPrice * amount;

        user.money += totalPrice;
        remainingStocks[company] += amount;
        inventory[company] = 0;
      });

      await user.save();
      result = await game.save();
    });
    session.endSession();

    return result;
  }
}
