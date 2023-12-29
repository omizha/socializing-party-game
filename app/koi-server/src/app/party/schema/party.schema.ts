import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { PollOmited, PollRequired, PollSchema } from 'shared~type-poll';

@Schema()
export class Poll implements PollSchema {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  authorId?: string;

  @Prop()
  pendingUserIds: string[];

  @Prop()
  joinedUserIds: string[];

  @Prop()
  likedUserIds: string[];

  @Prop()
  limitAllCount: number;

  @Prop()
  limitMaleCount: number;

  @Prop()
  limitFemaleCount: number;

  @Prop()
  isPrivate: boolean;

  @Prop()
  privatePassword?: string;

  @Prop()
  isExposure: boolean;

  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;

  @Prop({ type: SchemaTypes.Date })
  deletedAt?: Date;

  constructor(required: Pick<Poll, PollRequired>, partial: Partial<Omit<Poll, PollRequired | PollOmited>>) {
    this.title = required.title;

    this.description = partial.description ?? '';
    this.authorId = partial.authorId;
    this.limitAllCount = partial.limitAllCount;
    this.limitMaleCount = partial.limitMaleCount;
    this.limitFemaleCount = partial.limitFemaleCount;
    this.isMultipleVote = partial.isMultipleVote ?? false;
    this.isAnonymous = partial.isAnonymous ?? false;
    this.isAllowAddVote = partial.isAllowAddVote ?? false;
    this.isWhitelist = partial.isWhitelist ?? false;
    this.whitelistUserIds = partial.whitelistUserIds ?? [];
    this.status = partial.status ?? 'DRAFT';

    this.votes = [];
    this.users = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export type PollDocument = HydratedDocument<Poll>;

export const pollSchema = SchemaFactory.createForClass(Poll);
