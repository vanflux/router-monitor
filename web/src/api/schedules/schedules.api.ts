import { useMutation, useQuery } from "react-query";
import { httpClient } from "../../lib/http-client";
import { queryClient } from "../../lib/query-client";
import { ScheduleDto, CreateScheduleDto, UpdateScheduleDto } from "./schedules.dto";

export const useSchedulesQuery = () =>
  useQuery({
    queryKey: ['schedules'],
    queryFn: () =>
      httpClient.get<ScheduleDto[]>(`/schedules`).then(res => res.data),
  });

export const useScheduleByIdQuery = (id?: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ['schedules', id],
    queryFn: () =>
      httpClient.get<ScheduleDto>(`/schedules/${id}`).then(res => res.data),
  });

export const useCreateScheduleMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedules']);
      onSuccess?.();
    },
    mutationFn: (createScheduleDto: CreateScheduleDto) =>
      httpClient.post<ScheduleDto>(`/schedules`, createScheduleDto).then(res => res.data),
  });

export const useUpdateScheduleMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedules']);
      onSuccess?.();
    },
    mutationFn: (updateScheduleDto: UpdateScheduleDto) =>
      httpClient.patch<ScheduleDto>(`/schedules`, updateScheduleDto).then(res => res.data),
  });

export const useDeleteScheduleMutation = (onError?: () => void, onSuccess?: () => void) =>
  useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedules']);
      onSuccess?.();
    },
    mutationFn: (id: string) =>
      httpClient.delete<boolean>(`/schedules/${id}`).then(res => res.data),
  });
