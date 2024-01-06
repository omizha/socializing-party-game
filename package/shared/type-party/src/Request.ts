import type { PartyOmited, PartySchemaWithId } from '.';

export type PatchParty = Partial<Omit<PartySchemaWithId, PartyOmited>>;
