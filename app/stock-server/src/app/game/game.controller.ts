import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { Request, Response } from 'shared~type-stock';
import { Game } from './game.schema';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getGame(): Promise<Game> {
    const game = await this.gameService.get();
    return game;
  }

  @Patch()
  updateGame(@Body() body: Request.UpdateGame): Promise<Response.Game> {
    return this.gameService.updateGame(body);
  }

  @Post('/reset')
  resetGame(): Promise<Response.Game> {
    return this.gameService.resetGame();
  }

  @Post('/stock/init')
  initStock(): Promise<Response.Game> {
    return this.gameService.initStock();
  }

  @Post('/stock/buy')
  buyStock(@Body() body: Request.BuyStock): Promise<Game> {
    return this.gameService.buyStock(body);
  }

  @Post('/stock/sell')
  sellStock(@Body() body: Request.SellStock): Promise<Game> {
    return this.gameService.sellStock(body);
  }
}
