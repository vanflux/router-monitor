import { SimulatedApi } from "./api";
import { WifiClientItem, WifiClients } from "../wifi-clients";

export interface SimulatedWifiClientItem extends WifiClientItem {}

export class SimulatedWifiClientsAdapter implements WifiClients {
  constructor(private api: SimulatedApi) {}

  async list(): Promise<SimulatedWifiClientItem[]> {
    return [];
  }
}
