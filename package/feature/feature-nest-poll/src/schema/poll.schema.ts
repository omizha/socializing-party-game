import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { PollVote } from './vote.schema';

type Required = 'title' | 'authorId';
type Omited = 'createdAt' | 'updatedAt' | 'deletedAt' | 'isDeployed';

@Schema()
export class Poll {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  authorId: string;

  @Prop()
  votes: PollVote[];

  @Prop()
  limitAllCount?: number;

  @Prop()
  limitMaleCount?: number;

  @Prop()
  limitFemaleCount?: number;

  @Prop()
  isDeployed: boolean;

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

  constructor(required: Pick<Poll, Required>, partial: Partial<Omit<Poll, Required | Omited>>) {
    this.title = required.title;
    this.authorId = required.authorId;

    this.description = partial.description ?? '';
    this.votes = partial.votes ?? [];
    this.limitAllCount = partial.limitAllCount;
    this.limitMaleCount = partial.limitMaleCount;
    this.limitFemaleCount = partial.limitFemaleCount;
    this.isMultipleVote = partial.isMultipleVote ?? false;
    this.isAnonymous = partial.isAnonymous ?? false;
    this.isAllowAddVote = partial.isAllowAddVote ?? false;
    this.isPrivate = partial.isPrivate ?? false;
    this.availableUserIds = partial.availableUserIds ?? [];

    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isDeployed = false;
  }
}

export type PollDocument = HydratedDocument<Poll>;

export const pollSchema = SchemaFactory.createForClass(Poll);
