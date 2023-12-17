import { Injectable } from '@nestjs/common';
import { PollRepository } from './poll.repository';
import { Poll, PollDocument } from './schema/poll.schema';

@Injectable()
export class PollService {
  constructor(private readonly pollRepository: PollRepository) {}

  getPolls(): Promise<PollDocument[]> {
    return this.pollRepository.getPolls();
  }

  createPoll(poll: Poll): Promise<PollDocument> {
    console.debug('🚀 ~ file: poll.service.ts:14 ~ PollService ~ createPoll ~ poll:', poll);
    return this.pollRepository.createPoll(poll);
  }
}
