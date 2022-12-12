import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export class WifiClientDto {
  @ApiProperty()
  @Expose()
  @Type(() => String)
  _id: string;
  
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
}

export class WifiClientReportClientDto {
  @ApiProperty()
  @Expose()
  mac: string;

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

export class WifiClientsReportDto {
  @ApiProperty()
  @Expose()
  @Type(() => String)
  _id: string;

  @ApiProperty()
  @Expose()
  routerType: string;
  
  @ApiProperty()
  @Expose()
  agentId: string;

  @ApiProperty({ type: WifiClientReportClientDto, isArray: true })
  @Expose()
  @Type(() => WifiClientReportClientDto)
  clients: WifiClientReportClientDto[];

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  timestamp: Date;
}

export class WifiClientsRssiReportClientDto {
  @ApiProperty()
  @Expose()
  mac: string;

  @ApiProperty()
  @Expose()
  rssi?: number;
}

export class WifiClientsRssiReportDto {
  @ApiProperty({ type: WifiClientsRssiReportClientDto, isArray: true })
  @Expose()
  @Type(() => WifiClientsRssiReportClientDto)
  clients: WifiClientsRssiReportClientDto[];

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  date: Date;
}

export class CreateWifiClientDto extends OmitType(WifiClientDto, ['_id', 'createdAt']) {}

export class CreateWifiClientReportClientDto extends WifiClientReportClientDto {}

export class CreateWifiClientsReportDto extends OmitType(WifiClientsReportDto, ['_id', 'agentId', 'timestamp', 'clients']) {
  @ApiProperty({ type: CreateWifiClientReportClientDto, isArray: true })
  @Expose()
  @Type(() => CreateWifiClientReportClientDto)
  clients: CreateWifiClientReportClientDto[];
}
