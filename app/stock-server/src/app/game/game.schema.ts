import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { CompanyInfo, GamePhase, GameSchema } from 'shared~type-stock';

@Schema()
export class Game implements GameSchema {
  @Prop()
  unique: boolean;

  @Prop()
  gamePhase: GamePhase;

  @Prop({ type: SchemaTypes.Date })
  startedTime: Date;

  @Prop({ type: SchemaTypes.Map })
  companies: Record<string, CompanyInfo[]>;

  @Prop({ type: SchemaTypes.Map })
  remainingStocks: Record<string, number>;

  @Prop()
  isVisibleRank: boolean;

  @Prop()
  isTransaction: boolean;

  constructor() {
    this.unique = true;
    this.gamePhase = 'CROWDING';
    this.startedTime = new Date();
    this.remainingStocks = {};
    this.companies = {};
    this.isVisibleRank = false;
    this.isTransaction = false;
  }
}

export type GameDocument = HydratedDocument<Game>;

export const gameSchema = SchemaFactory.createForClass(Game);
