import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { httpClient } from "../../lib/http-client";
import { setAuthToken } from "../../stores/auth.store";
import { AuthLoginAdminRequestDto, AuthLoginAdminResponseDto } from "./auth.dto";

export const useAuthLoginAdminMutation = (onSuccess?: () => void) =>
  useMutation({
    onSuccess: (token) => {
      toast.success('Logged sucessfully!');
      setAuthToken(token);
      onSuccess?.();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          toast.error('Incorrect login credentials!');
        } else {
          toast.error('Login failed!');
        }
      }
    },
    mutationFn: async (data: AuthLoginAdminRequestDto): Promise<string> =>
      httpClient.post<AuthLoginAdminResponseDto>('/auth/login/admin', data).then(res => res.data),
  });
