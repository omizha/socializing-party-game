import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { Log } from './log.schema';

@Controller('/game/log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getLogs(@Query('nickname') nickname: string): Promise<Log[]> {
    return this.logService.findByNickname(nickname);
  }
}
