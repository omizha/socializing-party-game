import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PollUser } from './user.schema';

type Required = 'title' | 'description';
type Omited = 'users' | 'createdAt' | 'updatedAt' | 'deletedAt';

export class PollVote {
  @Prop()
  title: string;

  @Prop()
  description?: string;

  @Prop()
  users: PollUser[];

  @Prop()
  limitAllCount?: number;

  @Prop()
  limitMaleCount?: number;

  @Prop()
  limitFemaleCount?: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;

  constructor(required: Pick<PollVote, Required>, partial: Partial<Omit<PollVote, Required | Omited>>) {
    this.title = required.title;
    this.description = required.description ?? '';

    this.users = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.limitAllCount = partial.limitAllCount;
    this.limitMaleCount = partial.limitMaleCount;
    this.limitFemaleCount = partial.limitFemaleCount;
  }
}

export type PollVoteDocument = HydratedDocument<PollVote>;

export const pollVoteSchema = SchemaFactory.createForClass(PollVote);
