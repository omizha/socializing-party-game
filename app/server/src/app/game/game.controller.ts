import { Controller, Get } from '@nestjs/common';
import { Game } from './game.schema';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getGame(): Promise<Game> {
    return this.gameService.get();
  }
}
