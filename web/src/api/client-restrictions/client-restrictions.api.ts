import { useMutation, useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { queryClient } from "../../lib/query-client";
import { ClientRestrictionDto, CreateClientRestrictionDto, UpdateClientRestrictionDto } from "./client-restrictions.dto";

export const useClientRestrictionsQuery = () =>
  useQuery({
    queryKey: ['clientrestrictions'],
    queryFn: () =>
      httpClient.get<ClientRestrictionDto[]>(`/clientrestrictions`).then(res => res.data),
  });

export const useClientRestrictionByIdQuery = (id?: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ['clientrestrictions', id],
    queryFn: () =>
      httpClient.get<ClientRestrictionDto>(`/clientrestrictions/${id}`).then(res => res.data),
  })

export const useCreateClientRestrictionMutation = (onError?: () => void, onSuccess?: () => void) =>
useMutation({
  onError,
  onSuccess: () => {
    queryClient.invalidateQueries(['clientrestrictions']);
    onSuccess?.();
  },
  mutationFn: (createClientRestrictionDto: CreateClientRestrictionDto) =>
    httpClient.post<ClientRestrictionDto>('/clientrestrictions', createClientRestrictionDto).then(res => res.data),
})

export const useUpdateClientRestrictionMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['clientrestrictions']);
      onSuccess?.();
    },
    mutationFn: (updateClientRestrictionDto: UpdateClientRestrictionDto) =>
      httpClient.patch<ClientRestrictionDto>('/clientrestrictions', updateClientRestrictionDto).then(res => res.data),
  })

export const useDeleteClientRestrictionMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['clientrestrictions']);
      onSuccess?.();
    },
    mutationFn: (id: string) =>
      httpClient.delete<ClientRestrictionDto>(`/clientrestrictions/${id}`).then(res => res.data),
  })
