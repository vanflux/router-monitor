import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Auth, Authorized } from 'src/auth/auth.decorator';
import { AuthToken } from 'src/auth/auth.interface';
import { CreateWifiClientsReportDto, WifiClientDto, WifiClientsRssiReportDto } from './wifi-clients.dto';
import { WifiClientsService } from './wifi-clients.service';

@Controller('wificlients')
@ApiTags('wificlients')
export class WifiClientsController {
  constructor(private readonly wifiClientsService: WifiClientsService) {}

  @Get()
  @Authorized('admin')
  @ApiResponse({ type: WifiClientDto })
  async getAllClients() {
    const wifiClients = await this.wifiClientsService.getAllClients();
    return plainToInstance(WifiClientDto, wifiClients.map(item => item.toJSON()));
  }

  @Get('reports/rssi/agent/:agentId')
  @Authorized('admin')
  @ApiResponse({ type: WifiClientsRssiReportDto })
  async getAllRssiReports(
    @Param('agentId') agentId: string,
    @Query('granularity', ParseIntPipe) granularity: number,
    @Query('startDate') startDateStr?: string,
    @Query('endDate') endDateStr?: string,
  ) {
    const startDate = startDateStr ? new Date(startDateStr) : undefined;
    const endDate = endDateStr ? new Date(endDateStr) : undefined;
    const wifiClientsReports = await this.wifiClientsService.getAllRssiReports(agentId, granularity, startDate, endDate);
    return plainToInstance(WifiClientsRssiReportDto, wifiClientsReports);
  }

  @Post('reports')
  @Authorized('agent')
  @ApiResponse({ type: String })
  async createReport(@Auth() authToken: AuthToken, @Body() createWifiClientsReportDto: CreateWifiClientsReportDto) {
    return await this.wifiClientsService.createReport(authToken.agent.id, createWifiClientsReportDto);
  }
}
