import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  private async findOneAndUpdate(nickname: string, update: UpdateQuery<User>): Promise<UserDocument> {
    let user: UserDocument;

    const session = await this.userModel.startSession();
    await session.withTransaction(async () => {
      user = await this.userModel.findOneAndUpdate({ nickname }, update, {
        returnDocument: 'after',
        upsert: true,
      });
    });
    await session.endSession();

    return user;
  }

  getUsers(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  getUser(nickname: string): Promise<UserDocument> {
    return this.userModel.findOne({ nickname });
  }

  async setUser(user: User): Promise<UserDocument> {
    console.debug('setUser ~ user:', user);
    try {
      return await this.userModel.findOneAndUpdate({ nickname: user.nickname }, user, {
        returnDocument: 'after',
        upsert: true,
      });
    } catch (e) {
      console.error('setUser', e);
      throw new Error(e);
    }
  }

  // eslint-disable-next-line consistent-return
  async removeUser(nickname: string): Promise<ReturnType<Model<User>['deleteMany']>> {
    console.debug('removeUser ~ nickname:', nickname);
    try {
      return this.userModel.deleteOne({ nickname });
    } catch (e) {
      console.error(e);
    }
  }
}
