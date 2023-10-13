import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { Request, Response } from 'shared~type';
import { Game } from './game.schema';
import { GameService } from './game.service';
import { QuizService } from './quiz/quiz.service';
import { Quiz } from './quiz/quiz.schema';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService, private readonly quizService: QuizService) {}

  @Get()
  getGame(): Promise<Game> {
    return this.gameService.get();
  }

  @Patch()
  updateGame(@Body() body: Request.UpdateGame): Promise<Response.Game> {
    return this.gameService.updateGame(body);
  }

  @Get('quiz')
  getGameQuiz(): Promise<{ game: Game; quiz: Quiz }> {
    return this.gameService.getGameQuiz();
  }

  @Post('quiz')
  setGameQuiz(): Promise<Response.Game> {
    return this.gameService.setGameQuiz();
  }
}
