import { Body, Controller, Get, Patch } from '@nestjs/common';
import { Request, Response } from 'shared~type';
import { Game } from './game.schema';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getGame(): Promise<Game> {
    return this.gameService.get();
  }

  @Patch()
  updateGame(@Body() body: Request.UpdateGame): Promise<Response.Game> {
    return this.gameService.updateGame(body);
  }
}
