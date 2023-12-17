import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PollUser } from './user.schema';

export class PollVote {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  users: PollUser[];

  @Prop()
  limitAllCount: number;

  @Prop()
  limitMaleCount: number;

  @Prop()
  limitFemaleCount: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export type PollVoteDocument = HydratedDocument<PollVote>;

export const pollVoteSchema = SchemaFactory.createForClass(PollVote);
