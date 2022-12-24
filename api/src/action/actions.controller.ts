import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Authorized } from 'src/auth/auth.decorator';
import { ActionsRunnerService } from './actions-runner.service';
import { Action } from './actions.entity';

@Controller('actions')
@ApiTags('actions')
export class ActionsController {
  constructor(private readonly actionsRunnerService: ActionsRunnerService) {}

  @Post()
  @Authorized('admin')
  async run(@Body() action: Action) {
    return await this.actionsRunnerService.run(action);
  }
}
