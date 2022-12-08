
export interface WifiClientsReport {
  clients: WifiClient[];
}

export interface WifiClient {
  name: string;
  mac: string;
  wifiClientsReportClient: WifiClientsReportClient;
}

export interface WifiClientsReportClient {
  rssi: number;
  hostname: string;
  ip: string;
}
