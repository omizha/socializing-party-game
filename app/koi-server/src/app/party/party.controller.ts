import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { Request } from 'shared~type-party';
import { PartyService } from './party.service';
import { Party } from './schema/party.schema';

@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Get()
  getParties(): Promise<Party[]> {
    return this.partyService.getParties();
  }

  @Post()
  createParty(@Body() party: Party): Promise<Party> {
    return this.partyService.createParty(party);
  }

  @Patch()
  updateParty(@Body() body: Request.PatchParty): Promise<boolean> {
    return this.partyService.updateParty(body);
  }
}
