
export interface ClientRestrictionDto {
  _id: string;
  clientId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateClientRestrictionDto = Omit<ClientRestrictionDto, '_id' | 'createdAt' | 'updatedAt'>;

export type UpdateClientRestrictionDto = Pick<ClientRestrictionDto, '_id'> & Partial<ClientRestrictionDto>;
