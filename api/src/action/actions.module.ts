import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientRestrictionModule } from 'src/client-restriction/client-restriction.module';
import { ActionsRunnerService } from './actions-runner.service';
import { ActionsController } from './actions.controller';
import { ActionLog, ActionLogSchema } from './actions.entity';

@Module({
  imports: [
    ClientRestrictionModule,
    MongooseModule.forFeature([{ name: ActionLog.name, schema: ActionLogSchema }]),
  ],
  controllers: [ActionsController],
  providers: [ActionsRunnerService],
  exports: [ActionsRunnerService],
})
export class ActionsModule {}
