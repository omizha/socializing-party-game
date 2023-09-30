import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  getUsers(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  getUser(nickname: string): Promise<UserDocument> {
    return this.userModel.findOne({ nickname });
  }

  async setUser(user: User): Promise<UserDocument> {
    console.debug('setUser ~ user:', user);
    try {
      return await this.userModel.findOneAndUpdate({ nickname: user.nickname }, user, { upsert: true });
    } catch (e) {
      console.error('setUser', e);
      throw new Error(e);
    }
  }

  // eslint-disable-next-line consistent-return
  async removeUser(nickname: string): Promise<ReturnType<Model<User>['deleteMany']>> {
    console.debug('removeUser ~ nickname:', nickname);
    try {
      return this.userModel.deleteMany({ nickname });
    } catch (e) {
      console.error(e);
    }
  }

  async inOutUser(nickname: string, isEntry: boolean): Promise<UserDocument> {
    const user = await this.getUser(nickname);
    if (!user) {
      return this.setUser({ isEntry, nickname, profilePictureUrl: '/default-avatar.png' });
    }

    user.isEntry = isEntry;
    return user.save();
  }
}
