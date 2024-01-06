import { Controller, Post, Query } from '@nestjs/common';

@Controller()
export class AppController {
  @Post('log')
  log(@Query('msg') msg: string): boolean {
    console.warn(`${decodeURIComponent(msg)} (${new Date()})`);
    return true;
  }
}
