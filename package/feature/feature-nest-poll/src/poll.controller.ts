import { Body, Controller, Get, Post } from '@nestjs/common';
import { Poll } from './schema/poll.schema';
import { PollService } from './poll.service';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get()
  getPolls(): Promise<Poll[]> {
    return this.pollService.getPolls();
  }

  @Post()
  createPoll(@Body() poll: Poll): Promise<Poll> {
    return this.pollService.createPoll(poll);
  }

  @Post('vote')
  vote(): void {}
}
