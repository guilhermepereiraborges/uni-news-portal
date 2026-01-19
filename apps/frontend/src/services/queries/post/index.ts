import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { PostWithRelations } from '@uni-news/types';
import { httpClient } from '@/services/httpClient';
import { postKeys } from '@/config/keys';

async function getAdminPosts() {
    const { data } = await httpClient.get<Array<PostWithRelations>>('/posts/admin/all');
    return data;
}

export const getPostsOptions = () => {
    return queryOptions({
        queryKey: postKeys.lists(),
        queryFn: getAdminPosts,
        staleTime: 1000 * 60 * 1, 
    });
}

export function usePosts() {
  return useSuspenseQuery(getPostsOptions());
}