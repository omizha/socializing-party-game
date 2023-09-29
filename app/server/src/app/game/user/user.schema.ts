import { UserProfile } from 'shared~type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User implements UserProfile {
  @Prop()
  nickname: string;

  @Prop()
  profilePictureUrl: string;

  @Prop()
  isEntry: boolean;

  constructor(nickname: string) {
    this.nickname = nickname;
    this.profilePictureUrl = '/default-avatar.png';
    this.isEntry = false;
  }
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
