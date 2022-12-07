
export interface WifiClientItem {
  ipAddress: string;
  mac: string;
}

export interface WifiClientsAdapter {
  list(): Promise<WifiClientItem[]>;
}
