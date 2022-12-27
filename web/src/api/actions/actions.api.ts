import { useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { ActionLogDto } from "./actions.dto";

export const useActionLogsQuery = () =>
  useQuery({
    queryKey: ['actionslogs'],
    queryFn: () =>
      httpClient.get<ActionLogDto[]>(`/actions/logs`).then(res => res.data),
  });
