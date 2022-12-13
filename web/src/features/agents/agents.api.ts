import { useMutation, useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { queryClient } from "../../lib/query-client";
import { AgentDto, UpdateAgentDto } from "./agents.dto";

export const useAgentsQuery = () =>
  useQuery({
    queryKey: ['agents'],
    queryFn: () =>
      httpClient.get<AgentDto[]>(`/agents`).then(res => res.data),
  });

export const useAgentByIdQuery = (id: string) =>
useQuery({
  queryKey: ['agents', id],
  queryFn: () =>
    httpClient.get<AgentDto>(`/agents/${id}`).then(res => res.data),
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
