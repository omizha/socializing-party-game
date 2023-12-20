export type * as Request from './Request';
export type * as Response from './Response';

export type PollUserSchema = {
  userId: string;
  nickname?: string;
  gender?: string;
  age?: number;
  mbti?: string;
  avatarUrl?: string;
};

export type PollVoteRequired = 'title';
export type PollVoteOmited = 'users' | 'createdAt' | 'updatedAt' | 'deletedAt';
export type PollVoteForm = Pick<PollVoteSchema, PollVoteRequired> &
  Partial<Omit<PollVoteSchema, PollVoteRequired | PollVoteOmited>>;
export type PollVoteSchema = {
  title: string;
  description: string;
  userIds: string[];
  limitAllCount?: number;
  limitMaleCount?: number;
  limitFemaleCount?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type PollSchema = {
  title: string;
  description: string;
  authorId: string;
  votes: PollVoteSchema[];
  limitAllCount?: number;
  limitMaleCount?: number;
  limitFemaleCount?: number;
  isDeployed: boolean;
  isMultipleVote: boolean;
  isAnonymous: boolean;
  isAllowAddVote: boolean;
  isWhitelist: boolean;
  whitelistUserIds: string[];
  users: PollUserSchema[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
