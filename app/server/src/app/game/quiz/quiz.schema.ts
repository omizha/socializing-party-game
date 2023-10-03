import { QuizOffsetByPhase, QuizParticipant, QuizRecordByPhase, QuizSchema } from 'shared~type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Quiz implements QuizSchema {
  @Prop()
  isCrowdingTime: boolean;

  @Prop()
  participant: Types.Array<QuizParticipant>;

  @Prop()
  isAnswerTime: boolean;

  @Prop()
  currentPhaseIdx: number;

  @Prop()
  offsetByPhase: Types.Array<QuizOffsetByPhase>;

  @Prop()
  recordByPhase: Types.Array<Record<string, QuizRecordByPhase>>;

  constructor() {
    this.isCrowdingTime = true;
    this.participant = new Types.Array<QuizParticipant>();
    this.isAnswerTime = false;
    this.currentPhaseIdx = 0;
    this.offsetByPhase = new Types.Array<QuizOffsetByPhase>();
    this.recordByPhase = new Types.Array<Record<string, QuizRecordByPhase>>();
  }
}

export type QuizDocument = HydratedDocument<Quiz>;

export const quizSchema = SchemaFactory.createForClass(Quiz);
