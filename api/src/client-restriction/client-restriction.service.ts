import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateClientRestrictionDto, UpdateClientRestrictionDto } from './client-restriction.dto';
import { ClientRestriction, ClientRestrictionDocument } from './client-restriction.entity';

@Injectable()
export class ClientRestrictionService {
  constructor(
    @InjectModel(ClientRestriction.name)
    private readonly clientRestrictionModel: Model<ClientRestrictionDocument>,
  ) {}
  
  async getAll() {
    return await this.clientRestrictionModel.find();
  }
  
  async getById(id: string) {
    return await this.clientRestrictionModel.findOne({ _id: new Types.ObjectId(id) });
  }
  
  async getByClientId(clientId: string) {
    return await this.clientRestrictionModel.findOne({ clientId });
  }

  async update(updateClientRestrictionDto: UpdateClientRestrictionDto) {
    return await (await this.clientRestrictionModel.updateOne({
      _id: new Types.ObjectId(updateClientRestrictionDto._id),
    }, {
      $set: {
        clientId: updateClientRestrictionDto.clientId,
        active: updateClientRestrictionDto.active,
      }
    })).acknowledged;
  }

  async create(createClientRestrictionDto: CreateClientRestrictionDto) {
    const clientRestriction = await this.clientRestrictionModel.create(createClientRestrictionDto);
    return clientRestriction.id;
  }

  async deleteById(id: string) {
    return await (await this.clientRestrictionModel.deleteOne({ _id: new Types.ObjectId(id) })).acknowledged;
  }
}
