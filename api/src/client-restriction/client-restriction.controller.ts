import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Authorized } from 'src/auth/auth.decorator';
import { CreateClientRestrictionDto, UpdateClientRestrictionDto, ClientRestrictionDto } from './client-restriction.dto';
import { ClientRestrictionService } from './client-restriction.service';

@Controller('clientrestrictions')
@ApiTags('clientrestrictions')
export class ClientRestrictionController {
  constructor(private readonly clientRestrictionService: ClientRestrictionService) {}

  @Get()
  @Authorized('admin', 'agent')
  @ApiResponse({ type: ClientRestrictionDto })
  async getAll() {
    const clientRestrictions = await this.clientRestrictionService.getAll();
    return plainToInstance(ClientRestrictionDto, clientRestrictions.map(item => item.toJSON()));
  }

  @Get(':id')
  @Authorized('admin')
  @ApiResponse({ type: ClientRestrictionDto })
  async getById(@Param('id') id: string) {
    const clientRestriction = await this.clientRestrictionService.getById(id);
    return plainToInstance(ClientRestrictionDto, clientRestriction.toJSON());
  }

  @Patch()
  @Authorized('admin')
  @ApiResponse({ type: ClientRestrictionDto })
  async update(@Body() updateClientRestrictionDto: UpdateClientRestrictionDto) {
    await this.clientRestrictionService.update(updateClientRestrictionDto);
    const clientRestriction = await this.clientRestrictionService.getById(updateClientRestrictionDto._id);
    return plainToInstance(ClientRestrictionDto, clientRestriction.toJSON());
  }

  @Post()
  @Authorized('admin')
  @ApiResponse({ type: String })
  async create(@Body() createClientRestrictionDto: CreateClientRestrictionDto) {
    return await this.clientRestrictionService.create(createClientRestrictionDto);
  }

  @Delete(':id')
  @Authorized('admin')
  @ApiResponse({ type: String })
  async deleteById(@Param('id') id: string) {
    return await this.clientRestrictionService.deleteById(id);
  }
}
