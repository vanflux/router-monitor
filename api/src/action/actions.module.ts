import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionsRunnerService } from './actions-runner.service';
import { ActionsController } from './actions.controller';
import { ActionLog, ActionLogSchema } from './actions.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: ActionLog.name, schema: ActionLogSchema }])],
  controllers: [ActionsController],
  providers: [ActionsRunnerService],
  exports: [ActionsRunnerService],
})
export class ActionsModule {}
