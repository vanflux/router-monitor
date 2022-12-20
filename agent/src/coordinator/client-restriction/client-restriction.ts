import { CoordinatorGetClientRestrictionException } from "../../exceptions/coordinator-get-client-restrictions-exception";
import { CoordinatorApi } from "../api";

export class CoordinatorClientRestrictionApi {
	constructor(
		private coordinatorApi: CoordinatorApi
	) {}

  async getAll() {
    return new Promise<ClientRestrictionDto[]>((resolve, reject) =>
      this.coordinatorApi.httpClient.get(
        `/clientrestrictions`,
        {
          headers: { authorization: `Bearer ${this.coordinatorApi.token}` },
        },
        (err, res, body) => {
          if (err) return reject(err);
          if (res.statusCode !== 200) return reject(new CoordinatorGetClientRestrictionException('Failed to get client restrictions'));
          resolve(body);
        },
      )
    );
  }
}

export interface ClientRestrictionDto {
  _id: string;
  clientId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
