import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { StockLog, StockLogDocument } from './log.schema';

@Injectable()
export class LogRepository {
  constructor(
    @InjectModel(StockLog.name)
    private readonly stockLogModel: Model<StockLog>,
  ) {}

  find(
    filter: FilterQuery<StockLog>,
    projection: ProjectionType<StockLog>,
    options: QueryOptions<StockLog>,
  ): Promise<StockLogDocument[]> {
    return this.stockLogModel.find(filter, projection, options);
  }

  create(log: StockLog): Promise<StockLogDocument> {
    return this.stockLogModel.create(log);
  }

  async deleteMany(filter: FilterQuery<StockLog>, options: QueryOptions<StockLog>): Promise<boolean> {
    return !!(await this.stockLogModel.deleteMany(filter, options));
  }
}
