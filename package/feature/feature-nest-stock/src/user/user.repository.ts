import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, MongooseQueryOptions, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { DeleteOptions, UpdateOptions } from 'mongodb';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  find(
    filter?: FilterQuery<User>,
    projection?: ProjectionType<User>,
    options?: QueryOptions<User>,
  ): Promise<UserDocument[]> {
    return this.userModel.find(filter, projection, options);
  }

  findOne(
    filter: FilterQuery<User>,
    projection?: ProjectionType<User>,
    options?: QueryOptions<User>,
  ): Promise<UserDocument> {
    return this.userModel.findOne(filter, projection, options);
  }

  findOneAndUpdate(filter: FilterQuery<User>, update: User, options?: QueryOptions<User>): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(filter, update, { returnDocument: 'after', ...options });
  }

  async deleteOne(
    filter: FilterQuery<User>,
    options?: DeleteOptions & Omit<MongooseQueryOptions<User>, 'lean' | 'timestamps'>,
  ): Promise<boolean> {
    return !!(await this.userModel.deleteOne(filter, options));
  }

  async deleteMany(
    filter: FilterQuery<User>,
    options?: DeleteOptions & Omit<MongooseQueryOptions<User>, 'lean' | 'timestamps'>,
  ): Promise<boolean> {
    return !!(await this.userModel.deleteMany(filter, options));
  }

  async updateMany(
    filter: FilterQuery<User>,
    update: UpdateQuery<User>,
    options?: UpdateOptions & Omit<MongooseQueryOptions<User>, 'lean'>,
  ): Promise<boolean> {
    return !!(await this.userModel.updateMany(filter, update, options));
  }

  async initializeUsers(
    stockId: string,
    options?: UpdateOptions & Omit<MongooseQueryOptions<User>, 'lean'>,
  ): Promise<boolean> {
    try {
      return !!(await this.userModel.updateMany(
        { stockId },
        {
          $set: {
            inventory: {},
            lastActivityTime: new Date(),
            money: 1000000,
          },
        },
        options,
      ));
    } catch (e: unknown) {
      throw new Error(e as string);
    }
  }
}
