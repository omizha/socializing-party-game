import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { GamePhase, GameSchema } from 'shared~type';

@Schema()
export class Game implements GameSchema {
  @Prop()
  unique: boolean;

  @Prop()
  gamePhase: GamePhase;

  @Prop({ ref: 'Quiz', type: MongooseSchema.Types.ObjectId })
  quizId?: Types.ObjectId;

  constructor() {
    this.unique = true;
    this.gamePhase = 'CROWDING';
  }
}

export type GameDocument = HydratedDocument<Game>;

export const gameSchema = SchemaFactory.createForClass(Game);
