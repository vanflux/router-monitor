import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWifiClientsReportDto, WifiClientsRssiReportDto } from './wifi-clients.dto';
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

  async getAllRssiReports(agentId: string, granularity: number) {
    const timeFrom = new Date();
    timeFrom.setHours(timeFrom.getHours() - 24);
    return await this.wifiClientsReportModel.aggregate<WifiClientsRssiReportDto>([
      { $match: { agentId, createdAt: { $gt: timeFrom } } }, // Filter out irrelevant reports
      { $addFields: { createdAtParts: { $dateToParts: { date: '$createdAt' } } } }, // Split date into parts
      { $group: { // Group reports that occur on the same interval
        _id: {
          year: '$createdAtParts.year',
          month: '$createdAtParts.month',
          day: '$createdAtParts.day',
          hour: '$createdAtParts.hour',
          minute: { $subtract: [
            '$createdAtParts.minute',
            { $mod: [ '$createdAtParts.minute', granularity ] }
          ]}
        },
        reports: { '$addToSet': '$clients' }
      }},
      { $project: { // Re-build date based on interval parts
        reports: '$reports',
        date: {
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day',
            hour: '$_id.hour',
            minute: '$_id.minute'
          }
        }
      }},
      { $unwind: { path: '$reports' } }, // Unwind grouped reports
      { $unwind: { path: '$reports' } }, // Unwind clients inside reports
      { $group: { // Group same clients of same interval
        _id: { _id: '$_id', mac: '$reports.mac' },
        mac: { $first: '$reports.mac' },
        rssi: { $avg: '$reports.rssi' },
        date: { $first: '$date' }
      }},
      { $group: { _id: '$date', clients: { $addToSet: { mac: '$mac', rssi: '$rssi' } } } }, // Group reports
      { $project: { clients: '$clients', date: '$_id' } }, // Format documents
      { $sort: { date: 1 } }, // Sort by date asc
    ]);
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
