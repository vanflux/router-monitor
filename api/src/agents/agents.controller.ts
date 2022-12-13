import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Auth, Authorized } from 'src/auth/auth.decorator';
import { AuthToken } from 'src/auth/auth.interface';
import { AgentDto, AgentListItemDto, CreateAgentDto, UpdateAgentDto } from './agents.dto';
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

  @Get('/:id')
  @Authorized('admin')
  @ApiResponse({ type: AgentListItemDto })
  async getById(@Param('id') id: string) {
    const agent = await this.agentsService.getById(id);
    return plainToInstance(AgentListItemDto, agent.toJSON());
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

  @Patch()
  @Authorized('admin')
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateAgentDto: UpdateAgentDto) {
    await this.agentsService.update(updateAgentDto);
    const agent = await this.agentsService.getById(updateAgentDto._id);
    return plainToInstance(AgentDto, agent.toJSON());
  }

  @Post('/:id/secret')
  @Authorized('admin')
  @ApiResponse({ type: String })
  @HttpCode(HttpStatus.OK)
  async genSecret(@Param('id') id: string) {
    return await this.agentsService.genSecret(id);
  }
}
