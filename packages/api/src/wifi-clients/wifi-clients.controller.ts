import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Auth, Authorized } from 'src/auth/auth.decorator';
import { AuthToken } from 'src/auth/auth.interface';
import { CreateWifiClientsReportDto, WifiClientsReportDto } from './wifi-clients.dto';
import { WifiClientsService } from './wifi-clients.service';

@Controller('wificlients')
@ApiTags('wificlients')
export class WifiClientsController {
  constructor(private readonly wifiClientsService: WifiClientsService) {}

  @Get()
  @Authorized('admin')
  @ApiResponse({ type: WifiClientsReportDto })
  async getAll() {
    const wifiClientsReports = await this.wifiClientsService.getAll();
    return plainToInstance(WifiClientsReportDto, wifiClientsReports.map(item => item.toJSON()));
  }

  @Post()
  @Authorized('agent')
  @ApiResponse({ type: String })
  async create(@Auth() authToken: AuthToken, @Body() createWifiClientsReportDto: CreateWifiClientsReportDto) {
    return await this.wifiClientsService.create(authToken.agent.id, createWifiClientsReportDto);
  }
}
