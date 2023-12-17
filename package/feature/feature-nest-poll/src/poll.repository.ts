import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Poll, PollDocument } from './schema/poll.schema';

@Injectable()
export class PollRepository {
  constructor(
    @InjectModel(Poll.name)
    private readonly pollModel: Model<Poll>,
  ) {}

  getPolls(options?: mongoose.QueryOptions<Poll>): Promise<PollDocument[]> {
    return this.pollModel.find(null, null, options);
  }

  createPoll(poll: Poll): Promise<PollDocument> {
    return this.pollModel.create(new Poll(poll.title, poll));
  }
}
