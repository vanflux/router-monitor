import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWifiClientsReportDto } from './wifi-clients.dto';
import { WifiClient, WifiClientsReport } from './wifi-clients.entity';

@Injectable()
export class WifiClientsService {
  constructor(
    @InjectModel(WifiClientsReport)
    private readonly wifiClientsReportModel: typeof WifiClientsReport,
    @InjectModel(WifiClient)
    private readonly wifiClientModel: typeof WifiClient,
  ) {}

  async getAll() {
    return await this.wifiClientsReportModel.findAll({
      include: [{
        model: WifiClient,
      }],
    });
  }

  async create(agentId: string, wifiClientsReport: CreateWifiClientsReportDto) {
    const clients = await Promise.all(wifiClientsReport.clients.map(async client => {
      const [{mac}] = await this.wifiClientModel.upsert({ ...client }, { conflictFields: ['mac'] });
      const clientModel = new WifiClient({ mac });
      clientModel.wifiClientsReportClient = client.wifiClientsReportClient;
      return clientModel;
    }));
    const report = await this.wifiClientsReportModel.create({ ...wifiClientsReport, agentId });
    await report.setClients(clients);
    return report.id;
  }
}
