import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { Log, logSchema } from './log.schema';

@Module({
  controllers: [LogController],
  exports: [LogService],
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: logSchema }])],
  providers: [LogService],
})
export class LogModule {}
