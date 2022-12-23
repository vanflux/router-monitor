import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Authorized } from 'src/auth/auth.decorator';
import { ActionsRunnerService } from './actions-runner.service';
import { ActionDto } from './actions.dto';

@Controller('actions')
@ApiTags('actions')
export class ActionsController {
  constructor(private readonly actionsRunnerService: ActionsRunnerService) {}

  @Post()
  @Authorized('admin')
  async run(@Body() actionDto: ActionDto) {
    return await this.actionsRunnerService.run(actionDto.action);
  }
}
