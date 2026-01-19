import { createFileRoute } from '@tanstack/react-router';
import { getCategories } from '@/services/queries/category';
import { NewPost } from '@/view/pages/Post/components/NewPost';

export const Route = createFileRoute('/_authenticated/posts/new')({
  loader: ({ context }) => context.queryClient.ensureQueryData(getCategories()),
  component: NewPost,
});