import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Auth, Authorized } from 'src/auth/auth.decorator';
import { AuthToken } from 'src/auth/auth.interface';
import { CreateWifiClientsReportDto, UpdateWifiClientDto, WifiClientDto, WifiClientsRssiReportDto } from './wifi-clients.dto';
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

  @Get(':id')
  @Authorized('admin')
  @ApiResponse({ type: WifiClientDto })
  async getClientById(@Param('id') id: string) {
    const wifiClient = await this.wifiClientsService.getClientById(id);
    return plainToInstance(WifiClientDto, wifiClient.toJSON());
  }

  @Patch()
  @Authorized('admin')
  @ApiResponse({ type: WifiClientDto })
  async updateClient(@Body() updateWifiClientDto: UpdateWifiClientDto) {
    await this.wifiClientsService.updateClient(updateWifiClientDto);
    const wifiClient = await this.wifiClientsService.getClientById(updateWifiClientDto._id);
    return plainToInstance(WifiClientDto, wifiClient.toJSON());
  }

  @Get('reports/rssi/agent/:agentId')
  @Authorized('admin')
  @ApiResponse({ type: WifiClientsRssiReportDto })
  async getAllRssiReports(
    @Param('agentId') agentId: string,
    @Query('precision', ParseIntPipe) precision: number,
    @Query('startDate') startDateStr?: string,
    @Query('endDate') endDateStr?: string,
  ) {
    const startDate = startDateStr ? new Date(startDateStr) : undefined;
    const endDate = endDateStr ? new Date(endDateStr) : undefined;
    const wifiClientsReports = await this.wifiClientsService.getAllRssiReports(agentId, precision, startDate, endDate);
    return plainToInstance(WifiClientsRssiReportDto, wifiClientsReports);
  }

  @Post('reports')
  @Authorized('agent')
  @ApiResponse({ type: String })
  async createReport(@Auth() authToken: AuthToken, @Body() createWifiClientsReportDto: CreateWifiClientsReportDto) {
    return await this.wifiClientsService.createReport(authToken.agent.id, createWifiClientsReportDto);
  }
}
