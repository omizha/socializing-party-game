import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class PollUser {
  @Prop()
  userId: string;

  @Prop()
  nickname: string;

  @Prop()
  gender: string;

  @Prop()
  avatarUrl: string;
}

export type PollUserDocument = HydratedDocument<PollUser>;

export const pollUserSchema = SchemaFactory.createForClass(PollUser);
