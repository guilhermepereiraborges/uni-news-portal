import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Category, CreateCategoryDTO } from '@uni-news/types';
import { httpClient } from '@/services/httpClient';
import { categoryKeys } from '@/config/keys';


export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateCategoryDTO) => {
      const { data } = await httpClient.post<Category>('/categories', body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
}