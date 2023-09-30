import { UserSchema } from 'shared~type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User implements UserSchema {
  @Prop({ unique: true })
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

export const userSchema = SchemaFactory.createForClass(User);
