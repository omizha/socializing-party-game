import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { client } from 'shared~config';
import type { Request } from 'shared~type';
import { Socket } from 'socket.io';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.schema';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class QuizGateway {
  constructor(private readonly quizService: QuizService) {}

  @SubscribeMessage(client.quizAnswerTime)
  async onQuizAnswerTime(client: Socket, payload: Request.QuizAnswerTime): Promise<Quiz> {
    const examTime = new Date().getTime();
    const quiz = await this.quizService.enableAnswer(payload.quizId, {
      answer: payload.answer,
      examTime,
    });
    this.quizService.emitStartAnswer(quiz);
    return quiz;
  }

  @SubscribeMessage(client.quizAnswerStop)
  async onQuizAnswerStop(client: Socket, payload: Request.QuizAnswerStop): Promise<Quiz> {
    const quiz = await this.quizService.stopAndnextPhase(payload.quizId);
    this.quizService.emitStopAnswer(quiz);
    return quiz;
  }

  @SubscribeMessage(client.quizSubmit)
  async onQuizSubmit(client: Socket, payload: Request.QuizSubmit): Promise<Quiz> {
    const recordTime = new Date().getTime();
    const quiz = await this.quizService.getQuiz(payload.quizId);

    if (quiz.id !== payload.quizId) {
      throw new Error(`quizId is not matched. quizId=${quiz.id} !== payloadQuizId=${payload.quizId}`);
    }

    if (quiz.currentPhaseIdx !== payload.phaseIdx) {
      throw new Error(
        `phaseIdx is not matched. phaseIdx=${quiz.currentPhaseIdx} !== payloadPhaseIdx=${payload.phaseIdx}`,
      );
    }

    if (!quiz.isAnswerTime) {
      console.warn(`isAnswerTime is false. (${payload.nickname})`);
    }

    return this.quizService.recordAnswer(payload.quizId, payload.phaseIdx, payload.nickname, {
      answer: payload.answer,
      isCorrect: quiz.offsetByPhase[quiz.currentPhaseIdx].answer === payload.answer,
      recordTime,
      score: quiz.offsetByPhase[quiz.currentPhaseIdx].answer === payload.answer ? 1 : -1,
    });
  }
}
