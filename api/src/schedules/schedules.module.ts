import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionsModule } from 'src/action/actions.module';
import { SchedulesController } from './schedules.controller';
import { Schedule, ScheduleSchema } from './schedules.entity';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [ActionsModule, ConfigModule, MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
