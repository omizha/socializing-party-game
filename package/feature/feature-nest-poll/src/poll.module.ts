import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { PollRepository } from './poll.repository';
import { Poll, pollSchema } from './schema/poll.schema';
import { PollVote, pollVoteSchema } from './schema/vote.schema';
import { PollUser, pollUserSchema } from './schema/user.schema';

@Module({
  controllers: [PollController],
  imports: [
    MongooseModule.forFeature([
      { name: Poll.name, schema: pollSchema },
      {
        name: PollVote.name,
        schema: pollVoteSchema,
      },
      {
        name: PollUser.name,
        schema: pollUserSchema,
      },
    ]),
  ],
  providers: [PollService, PollRepository],
})
export class PollModule {}
