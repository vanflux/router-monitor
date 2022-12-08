import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WifiClientsController } from './wifi-clients.controller';
import { WifiClient, WifiClientsReport, WifiClientsReportClient } from './wifi-clients.entity';
import { WifiClientsService } from './wifi-clients.service';

@Module({
  imports: [SequelizeModule.forFeature([WifiClient, WifiClientsReport, WifiClientsReportClient])],
  controllers: [WifiClientsController],
  providers: [WifiClientsService],
  exports: [WifiClientsService],
})
export class WifiClientsModule {}
