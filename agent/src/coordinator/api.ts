import { CoordinatorLoginException } from "../exceptions/coordinator-login-exception";
import { createHttpClient, HttpClient } from "../lib/http-client";

export class CoordinatorApi {
  public httpClient: HttpClient;
  public token: string | undefined;

  constructor(url: string) {
    this.httpClient = createHttpClient({ baseUrl: url, json: true });
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
}
