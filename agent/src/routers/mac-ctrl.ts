
export interface MacCtrl {
  list(): Promise<string[]>;
  add(mac: string): Promise<boolean>;
  remove(mac: string): Promise<boolean>;
}
