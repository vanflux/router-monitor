
export interface WifiClientItem {
  mac: string;
  ipAddress: string;
  hostName: string;
  rssi: number;
}

export interface WifiClients {
  list(): Promise<WifiClientItem[]>;
}
