import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizGateway } from './quiz.gateway';
import { Quiz, quizSchema } from './quiz.schema';
import { SocketModule } from '../../socket/socket.module';

@Module({
  controllers: [QuizController],
  imports: [MongooseModule.forFeature([{ name: Quiz.name, schema: quizSchema }]), SocketModule],
  providers: [QuizService, QuizGateway],
})
export class QuizModule {}
