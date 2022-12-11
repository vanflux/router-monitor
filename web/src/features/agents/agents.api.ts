import { useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { AgentDto } from "./agents.dto";

export const useAgentsQuery = () =>
useQuery({
  queryKey: ['agents'],
  queryFn: () =>
    httpClient.get<AgentDto[]>(`/agents`).then(res => res.data),
});
