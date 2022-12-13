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

  async getAllRssiReports(agentId: string, granularity: number, startDate?: Date, endDate?: Date) {
    return await this.wifiClientsReportModel.aggregate<WifiClientsRssiReportDto>([
      { $match: {
        agentId,
        ...((startDate || endDate) && {
          timestamp: {
            ...(startDate && {$gte: startDate}),
            ...(endDate && {$lte: endDate}),
          }
        }),
      } }, // Filter out irrelevant reports
      { $addFields: { dateParts: { $dateToParts: { date: '$timestamp' } } } }, // Split date into parts
      { $group: { // Group reports that occur on the same interval
        _id: {
          year: '$dateParts.year',
          month: '$dateParts.month',
          day: '$dateParts.day',
          hour: '$dateParts.hour',
          minute: { $subtract: [
            '$dateParts.minute',
            { $mod: [ '$dateParts.minute', granularity ] }
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
      await this.wifiClientModel.updateOne({ mac }, { $setOnInsert: { mac, name: hostname } }, { upsert: true });
    }));
    const report = await this.wifiClientsReportModel.create({
      ...wifiClientsReport,
      agentId,
      timestamp: new Date(),
    });
    return report.id;
  }
}
