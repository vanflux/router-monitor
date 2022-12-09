import { ArrisTG1692AApi } from "./api";
import { WifiClientItem, WifiClientsAdapter } from "../wifi-clients-adapter";
import { RouterException } from "../../exceptions/router-exception";

const optionIdMapping = {
  '10': ['lastSeen', Number],
  '11': ['idleTimeSeconds', Number],
  '12': ['inNetworkTimeSeconds', Number],
  '13': ['state', String],
  '14': ['flags', String],
  '15': ['txPackets', Number],
  '16': ['txFailuresPackets', Number],
  '17': ['rxUnicastPackets', Number],
  '18': ['rxMulticastPackets', Number],
  '19': ['lastTxPktRateKbps', Number],
  '2': ['ipAddrType', Number],
  '20': ['lastRxPktRateKbps', Number],
  '21': ['rateSet', String],
  '22': ['rSSI', Number],
  '3': ['ipAddr', String],
  '4': ['ipAddrTextual', String],
  '5': ['hostName', String],
  '6': ['internalMac', String],
  '7': ['macMfg', String],
  '8': ['status', Number],
  '9': ['firstSeen', Number],
};

export interface ArrisTG1692AWifiClientItem extends WifiClientItem {
  wifiId: number,
  index: number,
  lastSeen: number,
  idleTimeSeconds: number,
  inNetworkTimeSeconds: number,
  state: string,
  flags: string,
  txPackets: number,
  txFailuresPackets: number,
  rxUnicastPackets: number,
  rxMulticastPackets: number,
  lastTxPktRateKbps: number,
  ipAddrType: number,
  lastRxPktRateKbps: number,
  rateSet: string,
  rSSI: number,
  ipAddr: string,
  ipAddrTextual: string,
  hostName: string,
  internalMac: string,
  macMfg: string,
  status: number,
  firstSeen: number,
}

export class ArrisTG1692AWifiClientsAdapter implements WifiClientsAdapter {
  constructor(private api: ArrisTG1692AApi) {}

  async list(): Promise<ArrisTG1692AWifiClientItem[]> {
    const values = await this.api.getMultiValueOptions(['1.3.6.1.4.1.4115.1.20.1.1.3.42']);
    if (!values) throw new RouterException('Failed to get wifi clients, values is undefined');
    const wifiClients: {[clientId: string]: ArrisTG1692AWifiClientItem} = {};
    for (const key in values) {
      const [rest, optionId, wifiId, _, clientId] = key.match(/1\.3\.6\.1\.4\.1\.4115\.1\.20\.1\.1\.3\.42\.1\.(\w+)\.(\w+)\.(\w+\.\w+)\.(.+)/) || [];
      if (rest == null) continue;
      if (!wifiClients[clientId]) wifiClients[clientId] = { wifiId: Number(wifiId) } as any;
      const [optionName, optionType] = (optionIdMapping as any)[optionId];
      if (!optionName) continue;
      const value = values[key];
      if (optionName === 'internalMac') {
        wifiClients[clientId].mac = this.api.internalToMac(value);
      }
      (wifiClients[clientId] as any)[optionName] = optionType(value);
    }
    return Object.values(wifiClients).filter(client => client.mac);
  }
}
