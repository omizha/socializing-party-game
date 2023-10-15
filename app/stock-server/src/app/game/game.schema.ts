import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { CompanyInfo, GamePhase, GameSchema } from 'shared~type-stock';

@Schema()
export class Game implements GameSchema {
  @Prop()
  unique: boolean;

  @Prop()
  gamePhase: GamePhase;

  @Prop()
  startedTime: Date;

  @Prop({ type: SchemaTypes.Map })
  companies?: Record<string, CompanyInfo[]>;

  @Prop({ type: SchemaTypes.Map })
  remainingStocks?: Record<string, number>;

  constructor() {
    this.unique = true;
    this.gamePhase = 'CROWDING';
    this.startedTime = new Date();
  }
}

export type GameDocument = HydratedDocument<Game>;

export const gameSchema = SchemaFactory.createForClass(Game);
