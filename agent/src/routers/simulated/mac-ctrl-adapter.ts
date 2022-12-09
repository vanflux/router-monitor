import { SimulatedApi } from "./api";
import { MacCtrl } from "../mac-ctrl";

export class SimulatedMacCtrlAdapter implements MacCtrl {
  constructor(
    private api: SimulatedApi,
  ) {}

  async setBlacklistMode(): Promise<void> {}

  async list(): Promise<string[]> {
    return [];
  }

  async add(mac: string): Promise<boolean> {
    return true;
  }

  async remove(mac: string): Promise<boolean> {
    return true;
  }
}
