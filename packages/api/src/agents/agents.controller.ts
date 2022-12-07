import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AgentListItemDto, CreateAgentDto } from './agents.dto';
import { AgentsService } from './agents.service';

@Controller('agents')
@ApiTags('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @ApiResponse({ type: AgentListItemDto })
  async getAll() {
    const agents = await this.agentsService.getAll();
    return plainToInstance(AgentListItemDto, agents);
  }

  @Post()
  @ApiResponse({ type: Number })
  async create(@Body() createAgentDto: CreateAgentDto) {
    return await this.agentsService.create(createAgentDto);
  }

  @Post('/:id/secret')
  @ApiResponse({ type: String })
  async genSecret(@Param('id', ParseIntPipe) id: number) {
    return await this.agentsService.genSecret(id);
  }
}
