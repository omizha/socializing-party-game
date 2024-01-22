import { Injectable } from '@nestjs/common';
import mongoose, { MongooseQueryOptions } from 'mongoose';
import { UpdateOptions } from 'mongodb';
import { User } from './user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUserList(stockId: string, options?: mongoose.QueryOptions<User>): Promise<User[]> {
    return this.userRepository.find({ stockId }, undefined, options);
  }

  findOneByUserId(stockId: string, userId: string, options?: mongoose.QueryOptions<User>): Promise<User> {
    return this.userRepository.findOne({ stockId, userId }, null, options);
  }

  setUser(user: User): Promise<User> {
    return this.userRepository.findOneAndUpdate({ stockId: user.stockId, userId: user.userId }, user, { upsert: true });
  }

  removeUser(stockId: string, userId: string): Promise<boolean> {
    try {
      return this.userRepository.deleteOne({ stockId, userId });
    } catch (e: unknown) {
      throw new Error(e as string);
    }
  }

  async removeAllUser(stockId: string): Promise<boolean> {
    try {
      return this.userRepository.deleteMany({ stockId });
    } catch (e: unknown) {
      throw new Error(e as string);
    }
  }

  async initializeUsers(
    stockId: string,
    options?: UpdateOptions & Omit<MongooseQueryOptions<User>, 'lean'>,
  ): Promise<boolean> {
    console.debug('initializeUsers');
    try {
      return this.userRepository.initializeUsers(stockId, options);
    } catch (e: unknown) {
      throw new Error(e as string);
    }
  }
}
