
export interface AgentDto {
  _id: string;
  secret: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateAgentDto = Omit<AgentDto, '_id' | 'secret' | 'createdAt' | 'updatedAt'>;

export type UpdateAgentDto = Partial<CreateAgentDto> & Pick<AgentDto, '_id'>;
