
export interface WifiClientsRssiReportClientDto {
  mac: string;
  rssi: number;
}

export interface WifiClientsRssiReportDto {
  clients: WifiClientsRssiReportClientDto[];
  date: string;
}

export interface WifiClientDto {
  _id: string;
  mac: string;
  name: string;
  createdAt: string;
}

export type UpdateWifiClientDto = Omit<WifiClientDto, '_id' | 'mac' | 'createdAt'>;
