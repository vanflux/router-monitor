import 'dotenv/config';
import { CoordinatorApi } from './coordinator/api';
import { CoordinatorClientRestrictionApi } from './coordinator/client-restriction/client-restriction';
import { CoordinatorWifiClientReportsApi, WifiClientsReportDto } from './coordinator/wifi-clients/wifi-client-reports';
import { RouterException } from './exceptions/router-exception';
import { ArrisTG1692AApi } from "./routers/arris-tg1692a/api";
import { ArrisTG1692AMacCtrlAdapter } from './routers/arris-tg1692a/mac-ctrl-adapter';
import { ArrisTG1692AWifiClientsAdapter } from "./routers/arris-tg1692a/wifi-clients-adapter";
import { MacCtrl } from './routers/mac-ctrl';
import { RouterApi } from './routers/router-api';
import { SimulatedApi } from './routers/simulated/api';
import { SimulatedMacCtrlAdapter } from './routers/simulated/mac-ctrl-adapter';
import { SimulatedWifiClientsAdapter } from './routers/simulated/wifi-clients-adapter';
import { WifiClients } from './routers/wifi-clients';
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
  const clientRestrictionInterval = parseInt(process.env.CLIENT_RESTRICTION_INTERVAL || '30');
  
  if (!routerType) throw new Error('ROUTER_TYPE is missing');
  if (!routerUrl) throw new Error('ROUTER_URL is missing');
  if (!routerAdminUser) throw new Error('ROUTER_ADMIN_USER is missing');
  if (!routerAdminPass) throw new Error('ROUTER_ADMIN_PASS is missing');
  if (!agentId) throw new Error('AGENT_ID is missing');
  if (!agentSecret) throw new Error('AGENT_SECRET is missing');
  if (!coordinatorUrl) throw new Error('COORDINATOR_URL is missing');
  if (!wifiClientsReportInterval || isNaN(wifiClientsReportInterval)) throw new Error('WIFI_CLIENTS_REPORT_INTERVAL is missing');
  if (!clientRestrictionInterval || isNaN(clientRestrictionInterval)) throw new Error('CLIENT_RESTRICTION_INTERVAL is missing');

  const coordinatorApi = new CoordinatorApi(coordinatorUrl);
  const coordinatorWifiClientReportsApi = new CoordinatorWifiClientReportsApi(coordinatorApi);
  const coordinatorClientRestrictionApi = new CoordinatorClientRestrictionApi(coordinatorApi);
  console.log('Logging on coordinator...');
  await coordinatorApi.login(agentId, agentSecret);

  let routerApi: RouterApi;
  let wifiClients: WifiClients;
  let macCtrl: MacCtrl;
  switch (routerType) {
    case 'arris-tg1692a':
      const arrisTG1692AApi = routerApi = new ArrisTG1692AApi(routerUrl);
      wifiClients = new ArrisTG1692AWifiClientsAdapter(arrisTG1692AApi);
      macCtrl = new ArrisTG1692AMacCtrlAdapter(arrisTG1692AApi);
      break;
    case 'simulated':
      const simulatedApi = routerApi = new SimulatedApi(routerUrl);
      wifiClients = new SimulatedWifiClientsAdapter(simulatedApi);
      macCtrl = new SimulatedMacCtrlAdapter(simulatedApi);
      break;
    default:
      throw new Error('Router not supported: ' + routerType);
  }

  console.log('Logging on router...');
  await routerApi.login(routerAdminUser, routerAdminPass);


  // Wifi Client report
  (async () => {
    console.log('Starting wifi client report loop...');
    while (true) {
      try {
        console.log('Requesting wifi client list...');
        const wifiClientList = await wifiClients.list();
        const wifiClientsReportDto: WifiClientsReportDto = {
          routerType,
          clients: wifiClientList.map(client => ({
            mac: client.mac,
            hostname: client.hostName,
            ip: client.ipAddress,
            rssi: client.rssi,
          })),
        };
        console.log('Sending wifi clients report to coordinator... Clients:', wifiClientList.length);
        await coordinatorWifiClientReportsApi.sendWifiClientsReport(wifiClientsReportDto);
      } catch (exc) {
        console.error('Exception:', exc);
        if (exc instanceof RouterException) {
          console.log('Re-logging on router...');
          await routerApi.login(routerAdminUser, routerAdminPass);
        }
      }
      await sleep(wifiClientsReportInterval * 1000);
    }
  })();

  // Client restriction
  (async () => {
    console.log('Starting client restriction loop...');
    while (true) {
      try {
        console.log('Requesting client restrictions from coordinator...');
        const clientRestrictions = await coordinatorClientRestrictionApi.getAll();
        console.log('Requesting wifi clients from coordinator...');
        const wifiClients = await coordinatorWifiClientReportsApi.getWifiClients();
        console.log('Requesting mac ctrl list from router...');
        const macCtrlList = await macCtrl.list();
        const toRemoveMacs = new Set(macCtrlList.map(mac => mac.toLowerCase()));
        for (const clientRestriction of clientRestrictions) {
          const wifiClient = wifiClients.find(wifiClient => wifiClient._id === clientRestriction.clientId);
          const mac = wifiClient?.mac;
          if (!mac) continue;
          const isOnMacCtrlList = macCtrlList.find(_mac => _mac === mac);

          if (clientRestriction.active && !isOnMacCtrlList) {
            // Add to router mac ctrl list
            console.log('Adding mac', mac, 'to router mac ctrl');
            toRemoveMacs.delete(mac.toLowerCase());
            await macCtrl.add(mac);
          }
        }
        for (const mac of toRemoveMacs) {
          // Remove from router mac ctrl list
          console.log('Removing mac', mac, 'from router');
          await macCtrl.remove(mac);
        }
      } catch (exc) {
        console.error('Exception:', exc);
        if (exc instanceof RouterException) {
          console.log('Re-logging on router...');
          await routerApi.login(routerAdminUser, routerAdminPass);
        }
      }
      await sleep(clientRestrictionInterval * 1000);
    }
  })();
}

main();
