export type * as Request from './Request';
export type * as Response from './Response';

export type VoteUserSchema = {
  userId: string;
  nickname: string;
  gender: string;
  avatarUrl: string;
};

export type VoteSchema = {
  title: string;
  description: string;
  users: VoteUserSchema[];
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
  votes: VoteSchema[];
  limitAllCount?: number;
  limitMaleCount?: number;
  limitFemaleCount?: number;
  isDeployed: boolean;
  isMultipleVote: boolean;
  isAnonymous: boolean;
  isAllowAddVote: boolean;
  isPrivate: boolean;
  availableUserIds: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
