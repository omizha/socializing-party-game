import { Module } from '@nestjs/common';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';

@Module({
  controllers: [PartyController],
  providers: [PartyService]
})
export class PartyModule {}
