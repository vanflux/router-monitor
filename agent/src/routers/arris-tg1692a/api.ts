import { RouterException } from '../../exceptions/router-exception';
import { RouterLoginException } from '../../exceptions/router-login-exception';
import { RouterUnauthorizedException } from '../../exceptions/router-unauthorized-exception';
import { createHttpClient, HttpClient } from '../../lib/http-client';
import { RouterApi } from '../router-api';

export class ArrisTG1692AApi implements RouterApi {
  private httpClient: HttpClient;
  private credential: string | undefined;

  constructor(url: string) {
    this.httpClient = createHttpClient({ baseUrl: url });
  }

  async login(username: string, password: string): Promise<void> {
    const arg = Buffer.from(`${username}:${password}`).toString('base64');
    const t = Date.now();
    return new Promise<void>((resolve, reject) =>
      this.httpClient.get(`/login?arg=${arg}=&_n=0&_=${t}`, (err, res, body) => {
        if (err) return reject(err);
        if (res.statusCode !== 200) return reject(new RouterLoginException('Failed to login'));
        this.credential = body;
        resolve();
      })
    );
  }

  // https://mibs.observium.org/mib/ARRIS-ROUTER-DEVICE-MIB/
  // Exemple option: "1.3.6.1.4.1.4115.1.20.1.1.1.7.1.3" (arrisRouterWanCurrentIPAddr)
  getSingleValueOptions(optionIds: string[]): Promise<{[id: string]: string}> {
    const t = Date.now();
    return new Promise((resolve, reject) =>
      this.httpClient.get(`/snmpGet?oids=${optionIds.join(';')};&_n=0&_=${t}`, {
        headers: { Cookie: `credential=${this.credential}` },
        json: true,
      }, (err, res, body) => {
        if (err) return reject(err);
        if (res.statusCode === 401) return reject(new RouterUnauthorizedException());
        if (res.statusCode !== 200) return reject(new RouterException('Failed to get single value options', { optionIds }));
        resolve(body);
      })
    );
  }

  getMultiValueOptions(optionIds: string[]): Promise<{[id: string]: string}> {
    const t = Date.now();
    return new Promise((resolve, reject) =>
      this.httpClient.get(`/walk?oids=${optionIds.join(';')};&_n=0&_=${t}`, {
        headers: { Cookie: `credential=${this.credential}` },
        json: true,
      }, (err, res, body) => {
        if (err) return reject(err);
        if (res.statusCode === 401) return reject(new RouterUnauthorizedException());
        if (res.statusCode !== 200) return reject(new RouterException('Failed to get multi value options', { optionIds }));
        resolve(body);
      })
    );
  }
  
  setSingleValueOption(optionId: string, value: string, mode: string): Promise<{[id: string]: string}> {
    const t = Date.now();
    return new Promise((resolve, reject) =>
      this.httpClient.get(`/snmpSet?oid=${optionId}=${encodeURIComponent(value)};${mode};&_n=0&_=${t}`, {
        headers: { Cookie: `credential=${this.credential}` },
        json: true,
      }, (err, res, body) => {
        if (err) return reject(err);
        if (res.statusCode === 401) return reject(new RouterUnauthorizedException());
        if (res.statusCode !== 200) return reject(new RouterException('Failed to set single value option', { optionId, value, mode }));
        resolve(body);
      })
    );
  }

  macToInternal(input: string) {
    const internal = `$${input.replace(/[^0-9a-fA-F]/g, '')}`;
    return internal;
  }

  internalToMac(input: string) {
    if (input.startsWith('$')) return input.substring(1).match(/(.{2})/g)!.join(':');
    return [...input].map(char => char.charCodeAt(0).toString(16)).join(':');
  }
}
