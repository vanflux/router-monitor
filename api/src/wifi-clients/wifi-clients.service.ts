import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWifiClientsReportDto } from './wifi-clients.dto';
import { WifiClient, WifiClientDocument, WifiClientsReport, WifiClientsReportDocument } from './wifi-clients.entity';

@Injectable()
export class WifiClientsService {
  constructor(
    @InjectModel(WifiClientsReport.name)
    private readonly wifiClientsReportModel: Model<WifiClientsReportDocument>,
    @InjectModel(WifiClient.name)
    private readonly wifiClientModel: Model<WifiClientDocument>,
  ) {}
  
  async getAllClients() {
    return await this.wifiClientModel.find();
  }

  async getAllReports() {
    return await this.wifiClientsReportModel.find();
  }

  async createReport(agentId: string, wifiClientsReport: CreateWifiClientsReportDto) {
    await Promise.all(wifiClientsReport.clients.map(async ({ mac, hostname }) => {
      await this.wifiClientModel.findOneAndUpdate({ mac }, { mac, name: hostname }, { upsert: true, new: true, setDefaultsOnInsert: true });
    }));
    const report = await this.wifiClientsReportModel.create({
      ...wifiClientsReport,
      agentId,
    });
    return report.id;
  }
}
