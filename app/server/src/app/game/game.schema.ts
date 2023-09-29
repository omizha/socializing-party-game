import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

const Process = {
  CROWDING: 'CROWDING',
} as const;
export type Process = (typeof Process)[keyof typeof Process];

@Schema()
export class Game {
  @Prop()
  unique: boolean;

  @Prop()
  process: Process = 'CROWDING';

  constructor() {
    this.unique = true;
  }
}

export type GameDocument = HydratedDocument<Game>;

export const GameSchema = SchemaFactory.createForClass(Game);
