import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { Log, LogDocument } from './log.schema';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name)
    private readonly logModel: Model<Log>,
  ) {}

  async findByNickname(nickname: string, options?: QueryOptions<Log>): Promise<LogDocument[]> {
    console.debug('🚀 ~ file: log.service.ts:14 ~ LogService ~ findByNickname ~ nickname:', nickname);
    const logs = this.logModel.find(
      {
        nickname,
      },
      null,
      options,
    );
    return logs;
  }

  async addLog(log: Log): Promise<LogDocument> {
    return this.logModel.create(log);
  }
}
