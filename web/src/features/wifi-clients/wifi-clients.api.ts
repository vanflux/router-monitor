import { useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { WifiClientDto, WifiClientsRssiReportDto } from "./wifi-clients.dto";

export const useWifiClientsRssiReportsQuery = (
  agentId?: string,
  granularity?: number,
  startDate?: Date,
  endDate?: Date
) =>
  useQuery({
    queryKey: ['wificlients', 'reports', 'rssi', agentId, granularity, startDate, endDate],
    enabled: !!agentId && !!granularity,
    queryFn: () =>
      httpClient.get<WifiClientsRssiReportDto[]>(`/wificlients/reports/rssi/agent/${agentId}`, {
        params: { granularity, startDate, endDate }
      }).then(res => res.data),
  });

export const useWifiClientsQuery = () =>
useQuery({
  queryKey: ['wificlients', 'clients'],
  queryFn: () =>
    httpClient.get<WifiClientDto[]>(`/wificlients`).then(res => res.data),
});
