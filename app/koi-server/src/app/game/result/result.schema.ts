import { ResultSchema } from 'shared~type-koi';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Result implements ResultSchema {
  @Prop()
  nickname: string;

  @Prop()
  round: number;

  @Prop()
  money: number;

  constructor({ nickname, round, money }: ResultSchema) {
    this.nickname = nickname;
    this.money = money;
    this.round = round;
  }
}

export type ResultDocument = HydratedDocument<Result>;

export const resultSchema = SchemaFactory.createForClass(Result);
