import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientRestrictionModule } from 'src/client-restriction/client-restriction.module';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { ActionLog, ActionLogSchema } from './actions.entity';

@Module({
  imports: [
    ClientRestrictionModule,
    MongooseModule.forFeature([{ name: ActionLog.name, schema: ActionLogSchema }]),
  ],
  controllers: [ActionsController],
  providers: [ActionsService],
  exports: [ActionsService],
})
export class ActionsModule {}
