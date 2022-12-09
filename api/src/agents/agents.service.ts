import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { generate } from 'randomstring';
import { Agent, AgentDocument } from 'src/agents/agents.entity';
import { AgentNotFoundException } from 'src/exceptions/agent-not-found.exception';
import { CreateAgentDto } from './agents.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent.name)
    private readonly agentModel: Model<AgentDocument>,
  ) {}

  async getAll(): Promise<Agent[]> {
    return await this.agentModel.find();
  }

  async create(createAgentDto: CreateAgentDto): Promise<string> {
    return (await this.agentModel.create({ ...createAgentDto }))._id.toString();
  }

  async deleteById(id: string) {
    return await this.agentModel.deleteOne({ _id: new Types.ObjectId(id) });
  }

  async genSecret(id: string): Promise<string> {
    const agent = await this.agentModel.findById(new Types.ObjectId(id));
    if (!agent) throw new AgentNotFoundException();
    const secret = generate(50);
    await this.agentModel.updateOne({ _id: new Types.ObjectId(id) }, { $set: { secret } });
    return secret;
  }

  async getByIdAndSecret(id: string, secret: string): Promise<Agent> {
    return await this.agentModel.findOne({ _id: new Types.ObjectId(id), secret });
  }
}
