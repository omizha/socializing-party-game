import { Injectable } from '@nestjs/common';
import { QueryOptions } from 'mongoose';
import { StockLog, StockLogDocument } from './log.schema';
import { LogRepository } from './log.repository';

@Injectable()
export class LogService {
  constructor(private readonly stockLogRepository: LogRepository) {}

  async find(stockId: string, userId: string, options?: QueryOptions<StockLog>): Promise<StockLogDocument[]> {
    const logs = this.stockLogRepository.find(
      {
        stockId,
        userId,
      },
      undefined,
      options,
    );
    return logs;
  }

  async addLog(log: StockLog): Promise<StockLogDocument> {
    return this.stockLogRepository.create(log);
  }

  async deleteAllByStock(stockId: string, options?: QueryOptions<StockLog>): Promise<void> {
    await this.stockLogRepository.deleteMany({ stockId }, options);
  }
}
