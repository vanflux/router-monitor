import 'dotenv/config';
import { CoordinatorApi } from './coordinator/api';
import { WifiClientsReport } from './coordinator/wifi-client-report';
import { ArrisTG1692AApi } from "./routers/arris-tg1692a/api";
import { ArrisTG1692AWifiClientsAdapter } from "./routers/arris-tg1692a/wifi-clients-adapter";

async function main() {
  const routerType = process.env.ROUTER_TYPE;
  const routerUrl = process.env.ROUTER_URL;
  const routerAdminUser = process.env.ROUTER_ADMIN_USER;
  const routerAdminPass = process.env.ROUTER_ADMIN_PASS;
  const agentId = process.env.AGENT_ID;
  const agentSecret = process.env.AGENT_SECRET;
  const coordinatorUrl = process.env.COORDINATOR_URL;
  
  if (routerType !== 'arris-tg1692a') throw new Error('Router not supported!');
  if (!routerUrl) throw new Error('ROUTER_URL is missing');
  if (!routerAdminUser) throw new Error('ROUTER_ADMIN_USER is missing');
  if (!routerAdminPass) throw new Error('ROUTER_ADMIN_PASS is missing');
  if (!agentId) throw new Error('AGENT_ID is missing');
  if (!agentSecret) throw new Error('AGENT_SECRET is missing');
  if (!coordinatorUrl) throw new Error('COORDINATOR_URL is missing');

  const coordinatorApi = new CoordinatorApi(coordinatorUrl);
  console.log('Logging on coordinator...');
  await coordinatorApi.login(agentId, agentSecret);

  const routerApi = new ArrisTG1692AApi(routerUrl);
  console.log('Logging on router...');
  await routerApi.login(routerAdminUser, routerAdminPass);

  await coordinatorApi.sendRouterType(routerType);

  const wifiClients = new ArrisTG1692AWifiClientsAdapter(routerApi);
  while (true) {
    console.log('Requesting wifi client list...');
    const wifiClientList = await wifiClients.list();
    const wifiClientsReport: WifiClientsReport = {
      clients: wifiClientList.map(client => ({
        name: client.hostName,
        mac: client.mac,
        wifiClientsReportClient: {
          hostname: client.hostName,
          ip: client.ipAddrTextual,
          rssi: Number(client.rSSI),
        },
      })),
    };
    console.log('Sending wifi clients report to coordinator...');
    await coordinatorApi.sendWifiClientsReport(wifiClientsReport);

    /*console.log(
      wifiClientList
      .map(client => ({
        mac: client.mac,
        rSSI: client.rSSI,
        txPackets: client.txPackets,
        txFailuresPackets: client.txFailuresPackets,
        rxUnicastPackets: client.rxUnicastPackets,
        rxMulticastPackets: client.rxMulticastPackets,
        lastTxPktRateKbps: client.lastTxPktRateKbps,
        lastRxPktRateKbps: client.lastRxPktRateKbps,
        hostName: client.hostName,
      }))
      .reduce<{[mac: string]: Partial<ArrisTG1692AWifiClientItem>}>((obj, client) => (obj[client.mac] = client, obj), {})
    );*/
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
