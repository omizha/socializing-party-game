import { QuizRecordByPhase, QuizSchema } from 'shared~type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Quiz implements QuizSchema {
  @Prop()
  isAnswerTime: boolean;

  @Prop()
  currentPhaseIdx: number;

  @Prop()
  offsetByPhase: Types.Array<Date>;

  @Prop()
  recordByPhase: Types.Array<Types.Map<QuizRecordByPhase>>;

  constructor() {
    this.isAnswerTime = false;
    this.currentPhaseIdx = 0;
    this.offsetByPhase = new Types.Array<Date>();
    this.recordByPhase = new Types.Array<Types.Map<QuizRecordByPhase>>();
  }
}

export type QuizDocument = HydratedDocument<Quiz>;

export const quizSchema = SchemaFactory.createForClass(Quiz);
