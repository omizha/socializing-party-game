import { PollVoteForm } from '.';

export type PostAddVotes = {
  pollId: string;

  votes: PollVoteForm[];
};
