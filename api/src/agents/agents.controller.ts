import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Auth, Authorized } from 'src/auth/auth.decorator';
import { AuthToken } from 'src/auth/auth.interface';
import { AgentListItemDto, CreateAgentDto } from './agents.dto';
import { AgentsService } from './agents.service';

@Controller('agents')
@ApiTags('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @Authorized('admin')
  @ApiResponse({ type: AgentListItemDto })
  async getAll() {
    const agents = await this.agentsService.getAll();
    return plainToInstance(AgentListItemDto, agents.map(agent => agent.toJSON()));
  }

  @Post()
  @Authorized('admin')
  @ApiResponse({ type: String })
  async create(@Body() createAgentDto: CreateAgentDto) {
    return await this.agentsService.create(createAgentDto);
  }

  @Delete('/:id')
  @Authorized('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    return await this.agentsService.deleteById(id);
  }

  @Post('/:id/secret')
  @Authorized('admin')
  @ApiResponse({ type: String })
  @HttpCode(HttpStatus.OK)
  async genSecret(@Param('id') id: string) {
    return await this.agentsService.genSecret(id);
  }
}
