import { createFileRoute } from '@tanstack/react-router';
import { getCategories } from '@/services/queries/category';
import { Categories } from '@/view/pages/Categories';
import { CategoriesSkeleton } from '@/view/pages/Categories/components/categorysSkeleton';

export const Route = createFileRoute('/_authenticated/categories')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(getCategories());
  },
  pendingComponent: () => <CategoriesSkeleton />,
  component: Categories,
});

