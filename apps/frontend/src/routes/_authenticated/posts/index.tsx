import { createFileRoute } from '@tanstack/react-router';
import { getPostsOptions } from '@/services/queries/post';
import { Posts } from '@/view/pages/Post';
import { PostsSkeleton } from '@/view/pages/Post/components/PostsSkeleton';

export const Route = createFileRoute('/_authenticated/posts/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(getPostsOptions());
  },  
  pendingComponent: () => <PostsSkeleton/>,

  component: Posts,
});

