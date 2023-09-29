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
    const foundUser = await this.getUser(user.nickname);
    if (!foundUser) {
      return (await this.userModel.create(user)).save();
    }

    return foundUser.updateOne(user);
  }

  async removeUser(nickname: string): Promise<void> {
    try {
      await this.userModel.deleteOne({ nickname });
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
