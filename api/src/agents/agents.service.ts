import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generate } from 'randomstring';
import { Agent, AgentDocument } from 'src/agents/agents.entity';
import { EntityDeleteException } from 'src/exceptions/entity-delete.exception';
import { EntityNotFoundException } from 'src/exceptions/entity-not-found.exception';
import { EntityUpdateException } from 'src/exceptions/entity-update.exception';
import { parseId } from 'src/utils/parse-id.util';
import { CreateAgentDto, UpdateAgentDto } from './agents.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent.name)
    private readonly agentModel: Model<AgentDocument>,
  ) {}

  async getAll(): Promise<Agent[]> {
    return await this.agentModel.find();
  }

  async getById(id: string): Promise<Agent> {
    return await this.agentModel.findOne({ _id: parseId(id) });
  }

  async create(createAgentDto: CreateAgentDto): Promise<string> {
    return (await this.agentModel.create({ ...createAgentDto }))._id.toString();
  }

  async update(updateAgentDto: UpdateAgentDto): Promise<void> {
    const { acknowledged, matchedCount } = await this.agentModel.updateOne({ _id: parseId(updateAgentDto._id) }, { ...updateAgentDto });
    if (!matchedCount) throw new EntityNotFoundException();
    if (!acknowledged) throw new EntityUpdateException();
  }

  async deleteById(id: string): Promise<void> {
    const { acknowledged, deletedCount } = await this.agentModel.deleteOne({ _id: parseId(id) });
    if (!deletedCount) throw new EntityNotFoundException();
    if (!acknowledged) throw new EntityDeleteException();
  }

  async genSecret(id: string): Promise<string> {
    const agent = await this.agentModel.findById(parseId(id));
    if (!agent) throw new EntityNotFoundException();
    const secret = generate(50);
    await this.agentModel.updateOne({ _id: parseId(id) }, { $set: { secret } });
    return secret;
  }

  async getByIdAndSecret(id: string, secret: string): Promise<Agent> {
    return await this.agentModel.findOne({ _id: parseId(id), secret });
  }
}
