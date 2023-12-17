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
  votes: PollVote[];

  @Prop()
  limitAllCount: number;

  @Prop()
  limitMaleCount: number;

  @Prop()
  limitFemaleCount: number;

  @Prop()
  isMultipleVote: boolean;

  @Prop()
  isAnonymous: boolean;

  @Prop()
  isPrivate: boolean;

  @Prop()
  isAllowAddVote: boolean;

  @Prop()
  availableUserIds: string[];

  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;

  @Prop({ type: SchemaTypes.Date })
  deletedAt: Date;
}

export type PollDocument = HydratedDocument<Poll>;

export const pollSchema = SchemaFactory.createForClass(Poll);
