import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Poll, PollDocument } from './schema/poll.schema';
import { PollVote } from './schema/vote.schema';

@Injectable()
export class PollRepository {
  constructor(
    @InjectModel(Poll.name)
    private readonly pollModel: Model<Poll>,
  ) {}

  getPolls(options?: mongoose.QueryOptions<Poll>): Promise<PollDocument[]> {
    return this.pollModel.find({}, null, options);
  }

  createPoll(poll: Poll): Promise<PollDocument> {
    return this.pollModel.create(
      new Poll(
        {
          authorId: poll.authorId,
          title: poll.title,
        },
        poll,
      ),
    );
  }

  async addVote(pollId: string, pollVote: PollVote): Promise<boolean> {
    const createdVote = new PollVote(pollVote, pollVote);
    // const voteDocument = this.pollVoteModel.create(createdVote);

    return !!this.pollModel.updateOne(
      { _id: pollId },
      {
        $push: {
          votes: createdVote,
        },
      },
    );
  }
}
