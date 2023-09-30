import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GamePhase } from 'shared~type';

@Schema()
export class Game {
  @Prop()
  unique: boolean;

  @Prop()
  gamePhase: GamePhase = 'CROWDING';

  constructor() {
    this.unique = true;
  }
}

export type GameDocument = HydratedDocument<Game>;

export const gameSchema = SchemaFactory.createForClass(Game);
