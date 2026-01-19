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


export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  colorCode: z.string().nullable(),
  createdAt: z.string(),
});

export const CreateCategoryDTOSchema = z.object({
  name: z.string(),
  colorCode: z.string().optional(),
});


export const PostWithRelationsSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string(),
  featuredImageUrl: z.string().nullable(),
  status: PostStatusSchema,
  isFeatured: z.boolean(),
  isBreakingNews: z.boolean(),
  currentViewsCount: z.number().int().nonnegative(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().nullable(),
  authorId: z.string().uuid(),
  categoryId: z.string().uuid(),
  author: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string().nullable(),
  }),
  category: CategorySchema,
});

export type PostWithRelations = z.infer<typeof PostWithRelationsSchema>;
export type PostStatus = z.infer<typeof PostStatusSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;


export type Category = z.infer<typeof CategorySchema>;
export type CreateCategoryDTO = z.infer<typeof CreateCategoryDTOSchema>;
export type LoginParams = z.infer<typeof LoginParamsSchema>;
export type MeResponse = z.infer<typeof MeResponseSchema>;
export type User = z.infer<typeof UserSchema>;
export type Post = z.infer<typeof PostSchema>;
