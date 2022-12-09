import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WifiClientsController } from './wifi-clients.controller';
import { WifiClient, WifiClientSchema, WifiClientsReport, WifiClientsReportSchema } from './wifi-clients.entity';
import { WifiClientsService } from './wifi-clients.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WifiClient.name, schema: WifiClientSchema },
      { name: WifiClientsReport.name, schema: WifiClientsReportSchema},
    ])
  ],
  controllers: [WifiClientsController],
  providers: [WifiClientsService],
  exports: [WifiClientsService],
})
export class WifiClientsModule {}
