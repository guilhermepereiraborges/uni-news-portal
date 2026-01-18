import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import type { LoginParams, User } from '@uni-news/types'; 

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginParams) => {
      const response = await httpClient.post<LoginResponse>('/auth/login', data);
      return response.data;
    },
  });
}