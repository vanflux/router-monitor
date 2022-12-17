import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateWifiClientsReportDto, UpdateWifiClientDto, WifiClientsRssiReportDto } from './wifi-clients.dto';
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
  
  async getClientById(id: string) {
    return await this.wifiClientModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async getAllRssiReports(agentId: string, precision: number, startDate?: Date, endDate?: Date) {
    return await this.wifiClientsReportModel.aggregate<WifiClientsRssiReportDto>([
      { $match: {
        agentId,
        ...((startDate || endDate) && {
          timestamp: {
            ...(startDate && {$gte: startDate}),
            ...(endDate && {$lte: endDate}),
          }
        }),
      }}, // Filter out irrelevant reports
      { $bucketAuto: {
        groupBy: '$timestamp',
        buckets: precision,
        output: {
          reports: {
            $push: '$clients',
          },
        },
      }},
      { $unwind: { path: '$reports' } }, // Unwind grouped reports
      { $unwind: { path: '$reports' } }, // Unwind clients inside reports
      { $group: { // Group same clients of same interval
        _id: { _id: '$_id', mac: '$reports.mac' },
        mac: { $first: '$reports.mac' },
        rssi: { $avg: '$reports.rssi' },
        date: { $first: '$_id.min' }
      }},
      { $group: { _id: '$date', clients: { $push: { mac: '$mac', rssi: '$rssi' } } } }, // Group reports
      { $project: { clients: '$clients', date: '$_id' } }, // Format documents
      { $sort: { date: 1 } }, // Sort by date asc
    ]);
  }

  async updateClient(updateWifiClientDto: UpdateWifiClientDto) {
    return await (await this.wifiClientModel.updateOne({ _id: new Types.ObjectId(updateWifiClientDto._id) }, { $set: { name: updateWifiClientDto.name } })).acknowledged;
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
