import { UserSchema } from 'shared~type-koi';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema()
export class User implements UserSchema {
  @Prop({ unique: true })
  nickname: string;

  @Prop()
  money: number;

  @Prop({ type: SchemaTypes.Map })
  inventory: Record<string, number>;

  @Prop({ type: SchemaTypes.Date })
  lastActivityTime: Date;

  constructor(nickname: string) {
    this.nickname = nickname;
    this.money = 1000000;
    this.inventory = {};
    this.lastActivityTime = new Date();
  }
}

export type UserDocument = HydratedDocument<User>;

export const userSchema = SchemaFactory.createForClass(User);
