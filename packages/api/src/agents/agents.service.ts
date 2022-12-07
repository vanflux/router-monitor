import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { generate } from 'randomstring';
import { Agent } from 'src/agents/agents.entity';
import { AgentNotFoundException } from 'src/exceptions/agent-not-found.exception';
import { CreateAgentDto } from './agents.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent)
    private readonly agentModel: typeof Agent,
  ) {}

  async getAll(): Promise<Agent[]> {
    return this.agentModel.findAll();
  }

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    return (await this.agentModel.create({ ...createAgentDto })).id;
  }

  async genSecret(id: number): Promise<string> {
    const agent = await this.agentModel.findByPk(id);
    if (!agent) throw new AgentNotFoundException();
    const secret = generate(50);
    await this.agentModel.update({ secret }, { where: { id } });
    return secret;
  }
}
