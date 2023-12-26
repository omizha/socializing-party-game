import { isEqual } from 'lodash';
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

  async updatePoll(poll: Request.PatchPoll): Promise<boolean> {
    return !!(await this.pollModel.updateOne(
      {
        _id: poll._id,
      },
      {
        ...poll,
      },
    ));
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

      if (!poll) {
        throw new Error('poll not found');
      }

      if (poll.isWhitelist && !poll.whitelistUserIds.some((v) => v === user.userId)) {
        throw new Error('user is not whitelist');
      }

      if (poll.status !== 'OPEN') {
        throw new Error('poll is not open');
      }

      poll.votes.forEach((vote) => {
        const isJoinedVote = (): boolean => vote.userIds.some((v) => v === user.userId);
        if (joinVoteTitles?.some((v) => v === vote.title) && !isJoinedVote()) {
          vote.userIds.push(user.userId);
        }
        if (exitVoteTitles?.some((v) => v === vote.title) && isJoinedVote()) {
          vote.userIds = vote.userIds.filter((v) => v !== user.userId);
        }
      });

      let isJoinedPoll = false;
      for (const vote of poll.votes) {
        const isJoinedVote = vote.userIds.some((v) => v === user.userId);
        if (isJoinedVote) {
          isJoinedPoll = true;
          break;
        }
      }

      if (isJoinedPoll) {
        const pollUser = poll.users.find((v) => v.userId === user.userId);
        if (!pollUser) {
          poll.users.push(user);
        } else if (!isEqual(pollUser, user)) {
          pollUser.nickname = user.nickname;
          pollUser.gender = user.gender;
          pollUser.avatarUrl = user.avatarUrl;
          pollUser.age = user.age;
          pollUser.mbti = user.mbti;
        }
      } else {
        poll.users = poll.users.filter((v) => v.userId !== user.userId);
      }

      poll.markModified('votes');
      poll.markModified('users');
      await poll.save({ session });
    });
    await session.endSession();

    return poll;
  }

  async deletePolls(pollIds: string[]): Promise<boolean> {
    return !!(await this.pollModel.deleteMany({ _id: { $in: pollIds } }));
  }
}
