import { RouterApi } from '../router-api';

export class SimulatedApi implements RouterApi {
  constructor(url: string) {}

  async login(username: string, password: string): Promise<void> {}
}
