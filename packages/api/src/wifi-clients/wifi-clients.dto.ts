import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";

export class WifiClientReportClientDto {
  @ApiProperty()
  @Expose()
  reportId: string;
  
  @ApiProperty()
  @Expose()
  clientMac: string;
  
  @ApiProperty()
  @Expose()
  rssi?: number;

  @ApiProperty()
  @Expose()
  hostname?: string;

  @ApiProperty()
  @Expose()
  ip?: string;
}

export class WifiClientDto {
  @ApiProperty()
  @Expose()
  id: string;
  
  @ApiProperty()
  @Expose()
  mac: string;
  
  @ApiProperty()
  @Expose()
  name?: string;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => WifiClientReportClientDto)
  wifiClientsReportClient: WifiClientReportClientDto;
}

export class WifiClientsReportDto {
  @ApiProperty()
  @Expose()
  id: string;
  
  @ApiProperty()
  @Expose()
  agentId: string;

  @ApiProperty({ type: WifiClientReportClientDto, isArray: true })
  @Expose()
  @Type(() => WifiClientDto)
  clients: WifiClientDto[];

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  createdAt: Date;
}

export class CreateWifiClientReportClientDto extends OmitType(WifiClientReportClientDto, ['clientMac', 'reportId']) {}

export class CreateWifiClientDto extends OmitType(WifiClientDto, ['id', 'createdAt', 'wifiClientsReportClient']) {
  @ApiProperty()
  @Expose()
  @Type(() => CreateWifiClientReportClientDto)
  wifiClientsReportClient: CreateWifiClientReportClientDto;
}

export class CreateWifiClientsReportDto extends OmitType(WifiClientsReportDto, ['id', 'agentId', 'createdAt', 'clients']) {
  @ApiProperty({ type: CreateWifiClientDto, isArray: true })
  @Expose()
  @Type(() => CreateWifiClientDto)
  clients: CreateWifiClientDto[];
}
