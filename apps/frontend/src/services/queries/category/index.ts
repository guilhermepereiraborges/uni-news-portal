import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { Category } from '@uni-news/types';
import { httpClient } from '@/services/httpClient';
import { categoryKeys } from '@/config/keys';

async function getCategory() {
    const { data } = await httpClient.get<Array<Category>>('/categories');
      return data;
}

export const getCategories = () => {
    return queryOptions({
        queryKey: categoryKeys.lists(),
        queryFn: getCategory,
        staleTime: 1000 * 60 * 5,
    });
}


export function useCategories() {
  return useSuspenseQuery(getCategories());
}