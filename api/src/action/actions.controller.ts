import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorized } from 'src/auth/auth.decorator';
import { ActionsService } from './actions.service';
import { Action } from './actions.entity';
import { ActionLogDto } from './actions.dto';
import { plainToInstance } from 'class-transformer';

@Controller('actions')
@ApiTags('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Get('logs')
  @Authorized('admin')
  @ApiResponse({ type: ActionLogDto })
  async getActionLogs() {
    const agents = await this.actionsService.getActionLogs();
    return plainToInstance(ActionLogDto, agents.map(agent => agent.toJSON()));
  }

  @Post()
  @Authorized('admin')
  async run(@Body() action: Action) {
    return await this.actionsService.run(action);
  }
}
