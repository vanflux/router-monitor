import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Auth, Authorized } from 'src/auth/auth.decorator';
import { AuthToken } from 'src/auth/auth.interface';
import { CreateWifiClientsReportDto, WifiClientDto, WifiClientsReportDto } from './wifi-clients.dto';
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

  @Get('reports')
  @Authorized('admin')
  @ApiResponse({ type: WifiClientsReportDto })
  async getAllReports() {
    const wifiClientsReports = await this.wifiClientsService.getAllReports();
    return plainToInstance(WifiClientsReportDto, wifiClientsReports.map(item => item.toJSON()));
  }

  @Post('reports')
  @Authorized('agent')
  @ApiResponse({ type: String })
  async createReport(@Auth() authToken: AuthToken, @Body() createWifiClientsReportDto: CreateWifiClientsReportDto) {
    return await this.wifiClientsService.createReport(authToken.agent.id, createWifiClientsReportDto);
  }
}
