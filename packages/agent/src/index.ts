import 'dotenv/config';
import { ArrisTG1692AApi } from "./routers/arris-tg1692a/api";
import { ArrisTG1692AWifiClientItem, ArrisTG1692AWifiClientsAdapter } from "./routers/arris-tg1692a/wifi-clients-adapter";

async function main() {
  const routerType = process.env.ROUTER_TYPE;
  const routerUrl = process.env.ROUTER_URL;
  const routerAdminUser = process.env.ROUTER_ADMIN_USER;
  const routerAdminPass = process.env.ROUTER_ADMIN_PASS;
  
  if (routerType !== 'arris-tg1692a') throw new Error('Router not supported!');
  if (!routerUrl) throw new Error('ROUTER_URL is missing');
  if (!routerAdminUser) throw new Error('ROUTER_ADMIN_USER is missing');
  if (!routerAdminPass) throw new Error('ROUTER_ADMIN_PASS is missing');

  const routerApi = new ArrisTG1692AApi(routerUrl);
  await routerApi.login(routerAdminUser, routerAdminPass);

  const wifiClients = new ArrisTG1692AWifiClientsAdapter(routerApi);
  while (true) {
    console.log('Requesting...');
    const wifiClientList = await wifiClients.list();
    console.log(
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
    );
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
