import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { Result } from './result.schema';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name)
    private readonly resultModel: Model<Result>,
  ) {}

  async getResults(): Promise<Result[]> {
    return this.resultModel.find();
  }

  async setResult(result: Result, options: QueryOptions<Result> = {}): Promise<Result> {
    return this.resultModel.findOneAndReplace(
      {
        nickname: result.nickname,
        round: result.round,
      },
      result,
      {
        upsert: true,
        ...options,
      },
    );
  }
}
