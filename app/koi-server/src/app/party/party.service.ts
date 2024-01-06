import { Injectable } from '@nestjs/common';
import { Request } from 'shared~type-party';
import { PartyRepository } from './party.repository';
import { Party, PartyDocument } from './schema/party.schema';

@Injectable()
export class PartyService {
  constructor(private readonly partyRepository: PartyRepository) {}

  queryParty(partyId: string): Promise<PartyDocument> {
    return this.partyRepository.findById(partyId);
  }

  queryParties(): Promise<PartyDocument[]> {
    return this.partyRepository.find(undefined);
  }

  createParty(party: Party): Promise<PartyDocument> {
    console.debug('🚀 ~ file: party.service.ts:14 ~ PartyService ~ createParty ~ party:', party);
    return this.partyRepository.create(party);
  }

  updateParty(party: Request.PatchParty): Promise<boolean> {
    return this.partyRepository.updateOne(party);
  }
}
