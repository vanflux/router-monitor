import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityDeleteException } from 'src/exceptions/entity-delete.exception';
import { EntityNotFoundException } from 'src/exceptions/entity-not-found.exception';
import { EntityUpdateException } from 'src/exceptions/entity-update.exception';
import { parseId } from 'src/utils/parse-id.util';
import { CreateClientRestrictionDto, UpdateClientRestrictionDto } from './client-restriction.dto';
import { ClientRestriction, ClientRestrictionDocument } from './client-restriction.entity';

@Injectable()
export class ClientRestrictionService {
  constructor(
    @InjectModel(ClientRestriction.name)
    private readonly clientRestrictionModel: Model<ClientRestrictionDocument>,
  ) {}
  
  async getAll(): Promise<ClientRestriction[]> {
    return await this.clientRestrictionModel.find();
  }
  
  async getById(id: string): Promise<ClientRestriction> {
    return await this.clientRestrictionModel.findOne({ _id: parseId(id) });
  }
  
  async getByClientId(clientId: string): Promise<ClientRestriction> {
    return await this.clientRestrictionModel.findOne({ clientId });
  }

  async update(updateClientRestrictionDto: UpdateClientRestrictionDto): Promise<void> {
    const { acknowledged, matchedCount } = await this.clientRestrictionModel.updateOne({
      _id: parseId(updateClientRestrictionDto._id),
    }, {
      $set: {
        clientId: updateClientRestrictionDto.clientId,
        active: updateClientRestrictionDto.active,
      }
    });
    if (!matchedCount) throw new EntityNotFoundException();
    if (!acknowledged) throw new EntityUpdateException();
  }

  async create(createClientRestrictionDto: CreateClientRestrictionDto): Promise<string> {
    const clientRestriction = await this.clientRestrictionModel.create(createClientRestrictionDto);
    return clientRestriction._id.toString();
  }

  async deleteById(id: string): Promise<void> {
    const { deletedCount, acknowledged } = await this.clientRestrictionModel.deleteOne({ _id: parseId(id) });
    if (!deletedCount) throw new EntityNotFoundException();
    if (!acknowledged) throw new EntityDeleteException();
  }
}
