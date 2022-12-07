import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Agent } from 'src/entities/agent.entity';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent)
    private readonly agentModel: typeof Agent,
  ) {}

  async getAll(): Promise<Agent[]> {
    return this.agentModel.findAll();
  }
}
