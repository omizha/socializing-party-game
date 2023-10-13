import { UserSchema } from 'shared~type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User implements UserSchema {
  @Prop({ unique: true })
  nickname: string;

  @Prop()
  profilePictureUrl: string;

  @Prop({ type: MongooseSchema.Types.String })
  team: 'L' | 'R';

  /**
   * @deprecated
   */
  @Prop()
  isEntry: boolean;

  constructor(nickname: string) {
    this.nickname = nickname;
    this.profilePictureUrl = '/default-avatar.png';
    this.team = Math.random() > 0.5 ? 'L' : 'R';
    this.isEntry = false;
  }
}

export type UserDocument = HydratedDocument<User>;

export const userSchema = SchemaFactory.createForClass(User);
