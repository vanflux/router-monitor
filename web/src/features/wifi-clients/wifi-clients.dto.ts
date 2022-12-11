
export interface WifiClientsRssiReportClientDto {
  mac: string;
  rssi: string;
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

