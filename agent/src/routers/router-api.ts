
export interface RouterApi {
  login(username: string, password: string): Promise<void>;
}
