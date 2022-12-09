import request, { CoreOptions, Request, RequestAPI, RequiredUriUrl } from "request";
import { CoordinatorLoginException } from "../exceptions/coordinator-login-exception";
import { CoordinatorSendWifiClientsReportException } from "../exceptions/coordinator-send-wifi-clients-report-exception";
import { WifiClientsReportDto } from "./wifi-client-report";

export class CoordinatorApi {
  private httpClient: RequestAPI<Request, CoreOptions, RequiredUriUrl>;
  private token: string | undefined;

  constructor(url: string) {
    this.httpClient = request.defaults({ baseUrl: url, json: true });
  }

  async login(id: string, secret: string) {
    return new Promise<void>((resolve, reject) =>
      this.httpClient.post(`/auth/login/agent`, { body: { id, secret } }, (err, res, body) => {
        if (err) return reject(err);
        if (res.statusCode !== 200) return reject(new CoordinatorLoginException('Failed to login'));
        this.token = body.token;
        resolve();
      })
    );
  }

  async sendWifiClientsReport(wifiClientsReportDto: WifiClientsReportDto) {
    return new Promise<void>((resolve, reject) =>
      this.httpClient.post(
        `/wificlients/reports`,
        {
          headers: { authorization: `Bearer ${this.token}` },
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
