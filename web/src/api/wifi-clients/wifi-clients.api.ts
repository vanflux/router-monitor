import { useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { WifiClientDto, WifiClientsRssiReportDto } from "./wifi-clients.dto";

export const useWifiClientsRssiReportsQuery = (
  agentId?: string,
  precision?: number,
  startDate?: Date,
  endDate?: Date
) =>
  useQuery({
    queryKey: ['wificlients', 'reports', 'rssi', agentId, precision, startDate, endDate],
    enabled: !!agentId && !!precision,
    queryFn: () =>
      httpClient.get<WifiClientsRssiReportDto[]>(`/wificlients/reports/rssi/agent/${agentId}`, {
        params: { precision, startDate, endDate }
      }).then(res => res.data),
  });

export const useWifiClientsQuery = () =>
useQuery({
  queryKey: ['wificlients', 'clients'],
  queryFn: () =>
    httpClient.get<WifiClientDto[]>(`/wificlients`).then(res => res.data),
});
