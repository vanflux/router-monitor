import { SimulatedApi } from "./api";
import { WifiClientItem, WifiClients } from "../wifi-clients";

export interface SimulatedWifiClientItem extends WifiClientItem {}

export class SimulatedWifiClientsAdapter implements WifiClients {
  constructor(private api: SimulatedApi) {}

  async list(): Promise<SimulatedWifiClientItem[]> {
    return [
      {
        hostName: 'User 1',
        ipAddress: '192.168.0.2',
        mac: '11:22:33:44:55:66',
        rssi: Math.floor(40 + Math.random() * 30),
      },
      {
        hostName: 'User 1',
        ipAddress: '192.168.0.3',
        mac: '11:22:33:44:55:66',
        rssi: Math.floor(40 + Math.random() * 30),
      },
      {
        hostName: 'User 2',
        ipAddress: '192.168.0.4',
        mac: '55:11:22:33:44:55',
        rssi: Math.floor(10 + Math.random() * 30),
      },
      {
        hostName: 'User 2',
        ipAddress: '192.168.0.5',
        mac: '55:11:22:33:44:55',
        rssi: Math.floor(10 + Math.random() * 30),
      },
    ];
  }
}
