import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, UpdateQuery } from 'mongoose';
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

  getUser(nickname: string, options?: mongoose.QueryOptions<User>): Promise<UserDocument> {
    return this.userModel.findOne({ nickname }, null, options);
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

  async removeUser(nickname: string): Promise<ReturnType<Model<User>['deleteMany']> | undefined> {
    console.debug('removeUser ~ nickname:', nickname);
    try {
      return this.userModel.deleteOne({ nickname });
    } catch (e) {
      console.error(e);
    }

    return undefined;
  }

  async removeAllUser(): Promise<ReturnType<Model<User>['deleteMany']> | undefined> {
    console.debug('removeAllUser');
    try {
      return this.userModel.deleteMany();
    } catch (e) {
      console.error(e);
    }

    return undefined;
  }
}
