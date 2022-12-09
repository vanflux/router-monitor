import 'dotenv/config';
import { CoordinatorApi } from './coordinator/api';
import { WifiClientsReportDto } from './coordinator/wifi-client-report';
import { RouterException } from './exceptions/router-exception';
import { ArrisTG1692AApi } from "./routers/arris-tg1692a/api";
import { ArrisTG1692AWifiClientsAdapter } from "./routers/arris-tg1692a/wifi-clients-adapter";
import { sleep } from './utils/sleep';

async function main() {
  const routerType = process.env.ROUTER_TYPE;
  const routerUrl = process.env.ROUTER_URL;
  const routerAdminUser = process.env.ROUTER_ADMIN_USER;
  const routerAdminPass = process.env.ROUTER_ADMIN_PASS;
  const agentId = process.env.AGENT_ID;
  const agentSecret = process.env.AGENT_SECRET;
  const coordinatorUrl = process.env.COORDINATOR_URL;
  const wifiClientsReportInterval = parseInt(process.env.WIFI_CLIENTS_REPORT_INTERVAL || '30');
  
  if (routerType !== 'arris-tg1692a') throw new Error('Router not supported!');
  if (!routerUrl) throw new Error('ROUTER_URL is missing');
  if (!routerAdminUser) throw new Error('ROUTER_ADMIN_USER is missing');
  if (!routerAdminPass) throw new Error('ROUTER_ADMIN_PASS is missing');
  if (!agentId) throw new Error('AGENT_ID is missing');
  if (!agentSecret) throw new Error('AGENT_SECRET is missing');
  if (!coordinatorUrl) throw new Error('COORDINATOR_URL is missing');
  if (!wifiClientsReportInterval || isNaN(wifiClientsReportInterval)) throw new Error('WIFI_CLIENTS_REPORT_INTERVAL is missing');

  const coordinatorApi = new CoordinatorApi(coordinatorUrl);
  console.log('Logging on coordinator...');
  await coordinatorApi.login(agentId, agentSecret);

  const routerApi = new ArrisTG1692AApi(routerUrl);
  console.log('Logging on router...');
  await routerApi.login(routerAdminUser, routerAdminPass);

  await sleep(2000);
  console.log('Starting wifi client report loop...');

  const wifiClients = new ArrisTG1692AWifiClientsAdapter(routerApi);
  while (true) {
    try {
      console.log('Requesting wifi client list...');
      const wifiClientList = await wifiClients.list();
      const wifiClientsReportDto: WifiClientsReportDto = {
        routerType,
        clients: wifiClientList.map(client => ({
          mac: client.mac,
          hostname: client.hostName,
          ip: client.ipAddrTextual,
          rssi: Number(client.rSSI),
        })),
      };
      console.log('Sending wifi clients report to coordinator... Clients:', wifiClientList.length);
      await coordinatorApi.sendWifiClientsReport(wifiClientsReportDto);
    } catch (exc) {
      console.error('Exception:', exc);
      if (exc instanceof RouterException) {
        console.log('Re-logging on router...');
        await routerApi.login(routerAdminUser, routerAdminPass);
      }
    }
    await sleep(wifiClientsReportInterval * 1000);
  }

  /*const macCtrl = new ArrisTG1692AMacCtrlAdapter(routerApi);
  await macCtrl.setBlacklistMode();
  console.log(await macCtrl.list());
  console.log(await macCtrl.add('12:12:44:55:55:56'));
  console.log(await macCtrl.list());
  console.log(await macCtrl.remove('12:12:44:55:55:56'));
  console.log(await macCtrl.list());*/
}

main();
