import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Authorized } from 'src/auth/auth.decorator';
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
    return plainToInstance(AgentListItemDto, agents);
  }

  @Post()
  @Authorized('admin')
  @ApiResponse({ type: String })
  async create(@Body() createAgentDto: CreateAgentDto) {
    return await this.agentsService.create(createAgentDto);
  }

  @Post('/:id/secret')
  @Authorized('admin')
  @ApiResponse({ type: String })
  async genSecret(@Param('id') id: string) {
    return await this.agentsService.genSecret(id);
  }
}
