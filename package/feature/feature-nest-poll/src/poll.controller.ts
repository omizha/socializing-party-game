import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import type { Request } from 'shared~type-poll';
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

  // @Delete()
  // deletePolls(@Body() body: Request.DeletePolls): Promise<boolean> {
  //   return this.pollService.deletePolls(body.pollIds);
  // }

  // @Delete('vote')
  // deleteVotes(@Body() body: Request.DeleteVotes) {
  //   return this.pollService.deleteVotes(body.pollId, body.voteIds);
  // }

  @Post('vote/add')
  addVotes(@Body() body: Request.PostAddVotes): Promise<boolean> {
    return this.pollService.addVotes(body.pollId, body.votes);
  }

  @Patch('vote/toggle')
  async toggleVotes(@Body() body: Request.PatchToggleVotes): Promise<Poll> {
    return this.pollService.toggleVotes(body);
  }
}
