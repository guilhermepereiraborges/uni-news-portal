import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { Login } from '@/view/pages/Login';

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/login')({
  validateSearch: (search) => loginSearchSchema.parse(search),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || '/_authenticated/dashboard' });
    }
  },
  
  component: Login,
});