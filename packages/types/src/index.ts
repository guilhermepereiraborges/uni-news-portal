import { z } from 'zod';

export const UserRoleSchema = z.enum(['ADMIN', 'AUTHOR']);

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  role: UserRoleSchema,
});

export const PostStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED']);

export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().nullable().optional(),
  content: z.string().min(1),
  featuredImageUrl: z.string().url().nullable().optional(),
  status: PostStatusSchema,
  isFeatured: z.boolean(),
  isBreakingNews: z.boolean(),
  currentViewsCount: z.number().int().nonnegative(),
  publishedAt: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.string().uuid(),
  categoryId: z.string().uuid(),
});


export const MeResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
});


export const LoginParamsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginParams = z.infer<typeof LoginParamsSchema>;
export type MeResponse = z.infer<typeof MeResponseSchema>;
export type User = z.infer<typeof UserSchema>;
export type Post = z.infer<typeof PostSchema>;
