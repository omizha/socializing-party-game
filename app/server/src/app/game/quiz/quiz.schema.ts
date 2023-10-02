import { QuizOffsetByPhase, QuizRecordByPhase, QuizSchema } from 'shared~type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Quiz implements QuizSchema {
  @Prop()
  isAnswerTime: boolean;

  @Prop()
  currentPhaseIdx: number;

  @Prop()
  offsetByPhase: Types.Array<QuizOffsetByPhase>;

  @Prop()
  recordByPhase: Types.Array<Record<string, QuizRecordByPhase>>;

  constructor() {
    this.isAnswerTime = false;
    this.currentPhaseIdx = 0;
    this.offsetByPhase = new Types.Array<QuizOffsetByPhase>();
    this.recordByPhase = new Types.Array<Record<string, QuizRecordByPhase>>();
  }
}

export type QuizDocument = HydratedDocument<Quiz>;

export const quizSchema = SchemaFactory.createForClass(Quiz);
