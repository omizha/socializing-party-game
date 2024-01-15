import { UserForm, UserRequired, UserSchema } from 'shared~type-stock';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema()
export class User implements UserSchema {
  @Prop()
  stockId: string;

  @Prop()
  userId: string;

  @Prop()
  money: number;

  @Prop({ type: SchemaTypes.Map })
  inventory: Record<string, number>;

  @Prop({ type: SchemaTypes.Date })
  lastActivityTime: Date;

  constructor(required: Pick<UserSchema, UserRequired>, partial: UserForm) {
    this.userId = required.userId;
    this.stockId = required.stockId;

    this.money = partial.money ?? 1000000;
    this.inventory = partial.inventory ?? {};
    this.lastActivityTime = new Date();
  }
}

export type UserDocument = HydratedDocument<User>;

export const userSchema = SchemaFactory.createForClass(User);
