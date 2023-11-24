import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { CompanyInfo, GamePhase, GameSchema } from 'shared~type-koi';

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

  @Prop()
  transactionInterval: number;

  @Prop()
  fluctuationsInterval: number;

  @Prop()
  round: number;

  constructor() {
    this.unique = true;
    this.gamePhase = 'CROWDING';
    this.startedTime = new Date();
    this.remainingStocks = {};
    this.companies = {};
    this.isVisibleRank = false;
    this.isTransaction = false;
    this.transactionInterval = 5;
    this.fluctuationsInterval = 5;
    this.round = 0;
  }
}

export type GameDocument = HydratedDocument<Game>;

export const gameSchema = SchemaFactory.createForClass(Game);
