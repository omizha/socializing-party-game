import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import type { Request } from 'shared~type-poll';
import { Poll } from './schema/poll.schema';
import { PollService } from './poll.service';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get()
  queryPolls(): Promise<Poll[]> {
    return this.pollService.queryPolls();
  }

  @Get('/:pollId')
  queryPoll(@Param('pollId') pollId: string): Promise<Poll> {
    return this.pollService.queryPoll(pollId);
  }

  @Post()
  createPoll(@Body() poll: Poll): Promise<Poll> {
    console.debug('🚀 ~ file: poll.controller.ts:17 ~ PollController ~ createPoll ~ poll:', poll);
    return this.pollService.createPoll(poll);
  }

  @Patch()
  updatePoll(@Body() body: Request.PatchPoll): Promise<boolean> {
    return this.pollService.updatePoll(body);
  }

  @Delete()
  deletePolls(@Body() body: Request.DeletePolls): Promise<boolean> {
    return this.pollService.deletePolls(body.pollIds);
  }

  // @Delete('vote')
  // deleteVotes(@Body() body: Request.DeleteVotes) {
  //   return this.pollService.deleteVotes(body.pollId, body.voteIds);
  // }

  @Post('vote/add')
  addVotes(@Body() body: Request.PostAddVotes): Promise<boolean> {
    return this.pollService.addVotes(body.pollId, body.votes);
  }

  @Post('vote/toggle')
  async toggleVotes(@Body() body: Request.PatchToggleVotes): Promise<Poll> {
    return this.pollService.toggleVotes(body);
  }
}
