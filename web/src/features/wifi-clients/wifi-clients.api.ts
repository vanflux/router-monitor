import { useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { WifiClientDto, WifiClientsRssiReportDto } from "./wifi-clients.dto";

export const useWifiClientsRssiReportsQuery = (agentId: string | undefined, granularity: number | undefined) =>
  useQuery({
    queryKey: ['wificlients', 'reports', 'rssi', agentId, granularity],
    enabled: !!agentId && !!granularity,
    queryFn: () =>
      httpClient.get<WifiClientsRssiReportDto[]>(`/wificlients/reports/rssi/agent/${agentId}?granularity=${granularity}`).then(res => res.data),
  });

export const useWifiClientsQuery = () =>
useQuery({
  queryKey: ['wificlients', 'clients'],
  queryFn: () =>
    httpClient.get<WifiClientDto[]>(`/wificlients`).then(res => res.data),
});
