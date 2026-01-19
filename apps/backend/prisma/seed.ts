import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import {
  PostStatus,
  PrismaClient,
  UserRole,
} from 'src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting Uni News seed...');

  console.log('1. Seeding Users...');

  const passwordHash = await bcrypt.hash('123456', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@uninews.com' },
    update: { name: 'Admin Master' },
    create: {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Admin Master',
      email: 'admin@uninews.com',
      passwordHash,
      role: UserRole.ADMIN,
      avatarUrl: 'https://github.com/shadcn.png',
    },
  });

  const authorUser = await prisma.user.upsert({
    where: { email: 'author@uninews.com' },
    update: { name: 'Jornalista Universitário' },
    create: {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Jornalista Universitário',
      email: 'author@uninews.com',
      passwordHash,
      role: UserRole.AUTHOR,
      avatarUrl: 'https://i.pravatar.cc/150?u=author',
    },
  });

  console.log('2. Seeding Categories...');

  const categoriesData = [
    {
      id: 'ca111111-1111-1111-1111-111111111111',
      name: 'Tecnologia',
      slug: 'tecnologia',
      colorCode: '#3B82F6',
    },
    {
      id: 'ca222222-2222-2222-2222-222222222222',
      name: 'Ciência',
      slug: 'ciencia',
      colorCode: '#10B981',
    },
    {
      id: 'ca333333-3333-3333-3333-333333333333',
      name: 'Eventos',
      slug: 'eventos',
      colorCode: '#F59E0B',
    },
    {
      id: 'ca444444-4444-4444-4444-444444444444',
      name: 'Esportes',
      slug: 'esportes',
      colorCode: '#EF4444',
    },
    {
      id: 'ca555555-5555-5555-5555-555555555555',
      name: 'Acadêmico',
      slug: 'academico',
      colorCode: '#8B5CF6',
    },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { colorCode: cat.colorCode },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        colorCode: cat.colorCode,
      },
    });
  }

  console.log('3. Seeding Posts...');

  const postsData = [
    {
      id: 'po111111-1111-1111-1111-111111111111',
      title: 'O Futuro da IA na Educação Superior',
      slug: 'futuro-ia-educacao',
      excerpt:
        'Como algoritmos generativos estão mudando a forma de ensinar e aprender nas universidades.',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
      featuredImageUrl:
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
      status: PostStatus.PUBLISHED,
      isFeatured: true,
      isBreakingNews: false,
      authorId: adminUser.id,
      categoryId: 'ca111111-1111-1111-1111-111111111111',
      currentViewsCount: 1250,
      publishedAt: new Date(),
    },
    {
      id: 'po222222-2222-2222-2222-222222222222',
      title: 'Semana de Ciência e Tecnologia 2024',
      slug: 'semana-ciencia-tecnologia-2024',
      excerpt:
        'Confira a programação completa do maior evento científico do campus.',
      content: '<p>A semana contará com palestras, workshops e hackathons.</p>',
      featuredImageUrl:
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
      status: PostStatus.PUBLISHED,
      isFeatured: false,
      isBreakingNews: true,
      authorId: authorUser.id,
      categoryId: 'ca222222-2222-2222-2222-222222222222',
      currentViewsCount: 840,
      publishedAt: new Date(Date.now() - 86400000),
    },
    {
      id: 'po333333-3333-3333-3333-333333333333',
      title: 'Final do Campeonato de Futsal',
      slug: 'final-campeonato-futsal',
      excerpt:
        'As atléticas de Engenharia e Direito se enfrentam nesta sexta-feira.',
      content: '<p>O jogo promete ser acirrado no ginásio principal.</p>',
      featuredImageUrl:
        'https://images.unsplash.com/photo-1518605348400-437753e8783d',
      status: PostStatus.DRAFT,
      isFeatured: false,
      isBreakingNews: false,
      authorId: authorUser.id,
      categoryId: 'ca444444-4444-4444-4444-444444444444',
      currentViewsCount: 0,
      publishedAt: null,
    },
  ];

  for (const post of postsData) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featuredImageUrl: post.featuredImageUrl,
        status: post.status,
        isFeatured: post.isFeatured,
        isBreakingNews: post.isBreakingNews,
        currentViewsCount: post.currentViewsCount,
        publishedAt: post.publishedAt,
        author: {
          connect: { id: post.authorId },
        },
        category: {
          connect: { id: post.categoryId },
        },
      },
    });
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
