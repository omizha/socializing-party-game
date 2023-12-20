import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PollVoteForm, Request } from 'shared~type-poll';
import { Poll, PollDocument } from './schema/poll.schema';
import { PollVote } from './schema/vote.schema';

@Injectable()
export class PollRepository {
  constructor(
    @InjectModel(Poll.name)
    private readonly pollModel: Model<Poll>,
  ) {}

  findById(
    pollId: string,
    projection?: mongoose.ProjectionType<Poll>,
    options?: mongoose.QueryOptions<Poll>,
  ): Promise<PollDocument> {
    return this.pollModel.findById(pollId, projection, options);
  }

  find(
    filter: mongoose.FilterQuery<Poll>,
    projection?: mongoose.ProjectionType<Poll>,
    options?: mongoose.QueryOptions<Poll>,
  ): Promise<PollDocument[]> {
    return this.pollModel.find(filter, projection, options);
  }

  createPoll(poll: Poll): Promise<PollDocument> {
    return this.pollModel.create(new Poll(poll, poll));
  }

  async addVotes(pollId: string, pollVotes: PollVoteForm[]): Promise<boolean> {
    const createdVotes = pollVotes.map((v) => new PollVote(v, v));

    return !!(await this.pollModel.updateOne({ _id: pollId }, { $addToSet: { votes: { $each: createdVotes } } }));
  }

  async toggleVotes({ pollId, user, joinVoteTitles, exitVoteTitles }: Request.PatchToggleVotes): Promise<PollDocument> {
    let poll: PollDocument;

    const session = await this.pollModel.startSession();
    await session.withTransaction(async () => {
      poll = await this.findById(pollId, undefined, { session });
      poll.votes.forEach((vote) => {
        const isJoined = vote.users.some((v) => v.userId === user.userId);
        if (joinVoteTitles?.some((v) => v === vote.title) && !isJoined) {
          vote.users.push(user);
        }
        if (exitVoteTitles?.some((v) => v === vote.title) && isJoined) {
          vote.users = vote.users.filter((v) => v.userId !== user.userId);
        }
      });
      poll.markModified('votes');
      await poll.save({ session });
    });
    await session.endSession();

    return poll;
  }
}
