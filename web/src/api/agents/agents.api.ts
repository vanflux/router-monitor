import { useMutation, useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { queryClient } from "../../lib/query-client";
import { AgentDto, CreateAgentDto, UpdateAgentDto } from "./agents.dto";

export const useAgentsQuery = () =>
  useQuery({
    queryKey: ['agents'],
    queryFn: () =>
      httpClient.get<AgentDto[]>(`/agents`).then(res => res.data),
  });

export const useAgentByIdQuery = (id?: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ['agents', id],
    queryFn: () =>
      httpClient.get<AgentDto>(`/agents/${id}`).then(res => res.data),
  });

export const useCreateAgentMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']);
      onSuccess?.();
    },
    mutationFn: (createAgentDto: CreateAgentDto) =>
      httpClient.post<AgentDto>(`/agents`, createAgentDto).then(res => res.data),
  });

export const useUpdateAgentMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']);
      onSuccess?.();
    },
    mutationFn: (updateAgentDto: UpdateAgentDto) =>
      httpClient.patch<AgentDto>(`/agents`, updateAgentDto).then(res => res.data),
  });

export const useDeleteAgentMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']);
      onSuccess?.();
    },
    mutationFn: (id: string) =>
      httpClient.delete<boolean>(`/agents/${id}`).then(res => res.data),
  });

export const useRegenAgentSecretMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']);
      onSuccess?.();
    },
    mutationFn: (id: string) =>
      httpClient.post<AgentDto>(`/agents/${id}/secret`).then(res => res.data),
  });
