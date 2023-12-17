import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { PollVote } from './vote.schema';

@Schema()
export class Poll {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  authorUserId: string;

  @Prop()
  votes: PollVote[];

  @Prop()
  limitAllCount?: number;

  @Prop()
  limitMaleCount?: number;

  @Prop()
  limitFemaleCount?: number;

  @Prop()
  isMultipleVote: boolean;

  @Prop()
  isAnonymous: boolean;

  @Prop()
  isAllowAddVote: boolean;

  @Prop()
  isPrivate: boolean;

  @Prop()
  availableUserIds: string[];

  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;

  @Prop({ type: SchemaTypes.Date })
  deletedAt?: Date;

  constructor(title: string, pollPartial: Partial<Omit<Poll, 'title'>>) {
    this.title = title;
    this.description = pollPartial.description ?? '';
    this.votes = pollPartial.votes ?? [];
    this.limitAllCount = pollPartial.limitAllCount;
    this.limitMaleCount = pollPartial.limitMaleCount;
    this.limitFemaleCount = pollPartial.limitFemaleCount;
    this.isMultipleVote = pollPartial.isMultipleVote ?? false;
    this.isAnonymous = pollPartial.isAnonymous ?? false;
    this.isAllowAddVote = pollPartial.isAllowAddVote ?? false;
    this.isPrivate = pollPartial.isPrivate ?? false;
    this.availableUserIds = pollPartial.availableUserIds ?? [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export type PollDocument = HydratedDocument<Poll>;

export const pollSchema = SchemaFactory.createForClass(Poll);
