
export interface WifiClientsReportDto {
  routerType: string;
  clients: WifiClientsReportClientDto[];
}

export interface WifiClientsReportClientDto {
  mac: string;
  rssi: number;
  hostname: string;
  ip: string;
}
