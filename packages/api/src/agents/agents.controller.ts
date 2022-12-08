import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
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
    return plainToInstance(AgentListItemDto, agents.map(item => item.toJSON()));
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
  @HttpCode(HttpStatus.OK)
  async genSecret(@Param('id') id: string) {
    return await this.agentsService.genSecret(id);
  }

  @Post('/router/type/:type')
  @Authorized('agent')
  @ApiResponse({ type: String })
  @HttpCode(HttpStatus.OK)
  async setRouterType(@Auth() authToken: AuthToken, @Param('type') type: string) {
    return await this.agentsService.setRouterType(authToken.agent.id, type);
  }
}
