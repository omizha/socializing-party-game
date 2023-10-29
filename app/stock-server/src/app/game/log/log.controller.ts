import { Controller, Get, Query } from '@nestjs/common';

@Controller('/game/log')
export class LogController {
  constructor() {}

  @Get()
  async getLogs(@Query('nickname') nickname: string): Promise<string> {
    return this.getLogs(nickname);
  }
}
