
export interface MacCtrlAdapter {
  list(): Promise<string[]>;
  add(mac: string): Promise<boolean>;
}
