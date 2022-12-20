import { CoordinatorGetWifiClientsException } from "../../exceptions/coordinator-get-wifi-clients-exception";
import { CoordinatorSendWifiClientsReportException } from "../../exceptions/coordinator-send-wifi-clients-report-exception";
import { CoordinatorApi } from "../api";

export class CoordinatorWifiClientReportsApi {
	constructor(
		private coordinatorApi: CoordinatorApi
	) {}

  async getWifiClients() {
    return new Promise<WifiClientDto[]>((resolve, reject) =>
      this.coordinatorApi.httpClient.get(
        `/wificlients`,
        {
          headers: { authorization: `Bearer ${this.coordinatorApi.token}` },
        },
        (err, res, body) => {
          if (err) return reject(err);
          if (res.statusCode !== 200) return reject(new CoordinatorGetWifiClientsException('Failed to get wifi clients'));
          resolve(body);
        },
      )
    );
  }

  async sendWifiClientsReport(wifiClientsReportDto: WifiClientsReportDto) {
    return new Promise<void>((resolve, reject) =>
      this.coordinatorApi.httpClient.post(
        `/wificlients/reports`,
        {
          headers: { authorization: `Bearer ${this.coordinatorApi.token}` },
          body: wifiClientsReportDto,
        },
        (err, res, body) => {
          if (err) return reject(err);
          if (res.statusCode !== 201) return reject(new CoordinatorSendWifiClientsReportException('Failed to send wifi clients report'));
          resolve();
        },
      )
    );
  }
}

export interface WifiClientDto {
  _id: string;
  mac: string;
  name: string;
  createdAt: string;
}

export interface WifiClientsReportDto {
  routerType: string;
  clients: WifiClientsReportClientDto[];
}

export interface WifiClientsReportClientDto {
  mac: string;
  rssi: number;
  hostname: string;
  ip: string;
}
