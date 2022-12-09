import { ArrisTG1692AApi } from "./api";
import { isValidMac } from "../../utils/mac-validator";
import { MacCtrl } from "../mac-ctrl";

export class ArrisTG1692AMacCtrlAdapter implements MacCtrl {
  constructor(
    private api: ArrisTG1692AApi,
    private wifiId = 10001,
  ) {}

  async setBlacklistMode() {
    await this.api.setSingleValueOption(`1.3.6.1.4.1.4115.1.20.1.1.3.22.1.6.${this.wifiId}`, '3', '2');
    await this.api.setSingleValueOption('1.3.6.1.4.1.4115.1.20.1.1.9.0', '1', '2');
  }

  async list(): Promise<string[]> {
    const values = await this.api.getMultiValueOptions(['1.3.6.1.4.1.4115.1.20.1.1.3.28']);
    return Object.entries(values)
    .filter(([key]) => key.startsWith(`1.3.6.1.4.1.4115.1.20.1.1.3.28.1.2.${this.wifiId}.`))
    .map(([_,value]) => this.api.internalToMac(value));
  }

  async add(mac: string): Promise<boolean> {
    if (!isValidMac(mac)) throw new Error('Invalid mac: ' + mac);
    const internalMac = this.api.macToInternal(mac);
    const values = await this.api.getMultiValueOptions(['1.3.6.1.4.1.4115.1.20.1.1.3.28']);
    const highestId = Object.keys(values)
    .filter(value => value.startsWith(`1.3.6.1.4.1.4115.1.20.1.1.3.28.1.2.${this.wifiId}.`))
    .map(value => Number(value.split('.').pop()))
    .sort((a,b) => a - b)
    .pop();
    const nextId = highestId == null ? 1 : (highestId + 1);
    await this.api.setSingleValueOption(`1.3.6.1.4.1.4115.1.20.1.1.3.28.1.3.${this.wifiId}.${nextId}`, '5', '2');
    await this.api.setSingleValueOption(`1.3.6.1.4.1.4115.1.20.1.1.3.28.1.2.${this.wifiId}.${nextId}`, internalMac, '4');
    await this.api.setSingleValueOption(`1.3.6.1.4.1.4115.1.20.1.1.3.28.1.3.${this.wifiId}.${nextId}`, '1', '2');
    await this.api.setSingleValueOption('1.3.6.1.4.1.4115.1.20.1.1.9.0', '1', '2');
    const newValues = await this.api.getMultiValueOptions(['1.3.6.1.4.1.4115.1.20.1.1.3.28']);
    const isOnTheList = Object.values(newValues).map(this.api.internalToMac).includes(mac);
    return isOnTheList;
  }

  async remove(mac: string) {
    if (!isValidMac(mac)) throw new Error('Invalid mac: ' + mac);
    const values = await this.api.getMultiValueOptions(['1.3.6.1.4.1.4115.1.20.1.1.3.28']);
    const id = Object.entries(values)
    .find(([_, value]) => mac === this.api.internalToMac(value))?.[0]?.split('.')?.pop();
    if (id === undefined) return true;
    await this.api.setSingleValueOption(`1.3.6.1.4.1.4115.1.20.1.1.3.28.1.3.${this.wifiId}.${id}`, '6', '2');
    await this.api.setSingleValueOption('1.3.6.1.4.1.4115.1.20.1.1.9.0', '1', '2');
    const newValues = await this.api.getMultiValueOptions(['1.3.6.1.4.1.4115.1.20.1.1.3.28']);
    const isNotOnTheList = !Object.values(newValues).map(this.api.internalToMac).includes(mac);
    return isNotOnTheList;
  }
}
