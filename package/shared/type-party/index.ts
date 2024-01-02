export type * as Request from './Request';
export type * as Response from './Response';

export type PartyRequired = 'title';
export type PartyOmited = 'createdAt' | 'updatedAt' | 'deletedAt';
export type PartyForm = Pick<PartySchema, PartyRequired> & Partial<Omit<PartySchema, PartyRequired | PartyOmited>>;
export type PartySchema = {
  title: string;
  description: string;
  authorId?: string;
  pendingUserIds: string[];
  joinedUserIds: string[];
  likedUserIds: string[];
  limitAllCount: number;
  limitMaleCount: number;
  limitFemaleCount: number;
  publicScope: 'DRAFT' | 'PUBLIC' | 'PRIVATE' | 'CLOSED';
  privatePassword?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
export type PartySchemaWithId = PartySchema & { _id: string };
