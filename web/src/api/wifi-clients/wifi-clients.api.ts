import { useMutation, useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { queryClient } from "../../lib/query-client";
import { UpdateWifiClientDto, WifiClientDto, WifiClientsRssiReportDto } from "./wifi-clients.dto";

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

export const useWifiClientByIdQuery = (id: string) =>
  useQuery({
    queryKey: ['wificlients', 'clients', id],
    queryFn: () =>
      httpClient.get<WifiClientDto>(`/wificlients/${id}`).then(res => res.data),
  })

export const useUpdateWifiClientMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['wificlients', 'clients']);
      onSuccess?.();
    },
    mutationFn: (updateWifiClientDto: UpdateWifiClientDto) =>
      httpClient.patch<WifiClientDto>('/wificlients', updateWifiClientDto).then(res => res.data),
  })
