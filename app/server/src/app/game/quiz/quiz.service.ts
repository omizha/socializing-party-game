import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QuizOffsetByPhase, QuizRecordByPhase } from 'shared~type';
import { server } from 'shared~config';
import { Quiz, QuizDocument } from './quiz.schema';
import { SocketGateway } from '../../socket/socket.gateway';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    private readonly socketGateway: SocketGateway,
  ) {}

  async createQuiz(): Promise<Quiz> {
    const quiz = await this.quizModel.create(new Quiz());
    return quiz;
  }

  async getQuiz(id: string): Promise<QuizDocument> {
    return this.quizModel.findById(id);
  }

  async enableAnswer(id: string, offsetByPhase: QuizOffsetByPhase): Promise<Quiz> {
    let quiz: QuizDocument;

    const session = await this.quizModel.startSession();
    await session.withTransaction(async () => {
      quiz = await this.quizModel.findById(id);
      await quiz.updateOne({
        $set: {
          [`offsetByPhase.${quiz.currentPhaseIdx}`]: offsetByPhase,
          isAnswerTime: true,
        },
      });
    });
    await session.endSession();
    this.emitStartAnswer(quiz);
    return quiz;
  }

  async recordAnswer(id: string, phaseIdx: number, nickname: string, recordByPhase: QuizRecordByPhase): Promise<Quiz> {
    return this.quizModel.findByIdAndUpdate(id, {
      $set: {
        [`recordByPhase.${phaseIdx}.${nickname}`]: recordByPhase,
      },
    });
  }

  async stopAndnextPhase(id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findByIdAndUpdate(id, {
      $inc: {
        currentPhaseIdx: 1,
      },
      $set: {
        isAnswerTime: false,
      },
    });

    this.emitStopAnswer(quiz);

    return quiz;
  }

  emitStartAnswer(quiz: Quiz): boolean {
    return this.socketGateway.server.emit(server.quizStartAnswer, quiz);
  }

  emitStopAnswer(quiz: Quiz): boolean {
    return this.socketGateway.server.emit(server.quizStopAnswer, quiz);
  }
}
