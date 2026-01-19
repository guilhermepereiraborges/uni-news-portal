import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { randomUUID } from 'node:crypto';
import {
  PostStatus,
  PrismaClient,
  UserRole,
} from '../src/generated/prisma/client';

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

  const authorIds = [adminUser.id, authorUser.id];

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

  const catMap: Record<string, string> = {};

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
    catMap[cat.slug] = cat.id;
  }

  console.log('3. Seeding Posts (30+ items)...');

  const makeSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

  const postsTemplates = [
    {
      title: 'O Futuro da IA na Educação Superior',
      cat: 'tecnologia',
      img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: true,
      break: false,
    },
    {
      title: 'Hackathon Universitário Quebra Recorde de Inscritos',
      cat: 'tecnologia',
      img: 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: true,
    },
    {
      title: 'Laboratório de Robótica Recebe Novos Equipamentos',
      cat: 'tecnologia',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: false,
    },
    {
      title: 'Novo App do Campus Facilita a Vida dos Alunos',
      cat: 'tecnologia',
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b5bbb695?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.DRAFT,
      feat: false,
      break: false,
    },
    {
      title: 'A Revolução do 5G nos Campi Inteligentes',
      cat: 'tecnologia',
      img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.SCHEDULED,
      feat: false,
      break: false,
    },
    {
      title: 'Segurança Cibernética: Palestra com Especialista',
      cat: 'tecnologia',
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.ARCHIVED,
      feat: false,
      break: false,
    },
    {
      title: 'Semana de Ciência e Tecnologia 2024',
      cat: 'ciencia',
      img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: true,
      break: false,
    },
    {
      title: 'Descoberta de Nova Espécie de Planta no Campus',
      cat: 'ciencia',
      img: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: true,
    },
    {
      title: 'Pesquisa sobre Energias Renováveis Ganha Prêmio',
      cat: 'ciencia',
      img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: false,
    },
    {
      title: 'O Telescópio da Universidade: Noite de Observação',
      cat: 'ciencia',
      img: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.SCHEDULED,
      feat: false,
      break: false,
    },
    {
      title: 'Feira de Biologia Marinha Atraí Visitantes',
      cat: 'ciencia',
      img: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.DRAFT,
      feat: false,
      break: false,
    },
    {
      title: 'Química no Cotidiano: Workshop Prático',
      cat: 'ciencia',
      img: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: false,
    },
    {
      title: 'Festival de Música Universitária: Line-up',
      cat: 'eventos',
      img: 'https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: true,
      break: false,
    },
    {
      title: 'Calourada 2024: Guia de Sobrevivência',
      cat: 'eventos',
      img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: false,
    },
    {
      title: 'Feira das Profissões Confirmada para Maio',
      cat: 'eventos',
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.SCHEDULED,
      feat: false,
      break: true,
    },
    {
      title: 'TEDxUniversity: Inscrições Abertas',
      cat: 'eventos',
      img: 'https://images.unsplash.com/photo-1475721027767-p753cba4209?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: false,
    },
    {
      title: 'Cinema ao Ar Livre no Gramado Central',
      cat: 'eventos',
      img: 'https://images.unsplash.com/photo-1517604931442-71053e3e2c3c?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.DRAFT,
      feat: false,
      break: false,
    },
    {
      title: 'Baile de Formatura de Direito',
      cat: 'eventos',
      img: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.ARCHIVED,
      feat: false,
      break: false,
    },
    {
      title: 'Final do Campeonato de Futsal',
      cat: 'esportes',
      img: 'https://images.unsplash.com/photo-1518605348400-437753e8783d?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: true,
      break: false,
    },
    {
      title: 'Time de Basquete Rumo ao Nacional',
      cat: 'esportes',
      img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: true,
    },
    {
      title: 'Nova Pista de Atletismo é Inaugurada',
      cat: 'esportes',
      img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: false,
    },
    {
      title: 'Natação: Seletiva para Novos Membros',
      cat: 'esportes',
      img: 'https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.SCHEDULED,
      feat: false,
      break: false,
    },
    {
      title: 'E-Sports: Torneio de Valorant e LoL',
      cat: 'esportes',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.DRAFT,
      feat: false,
      break: false,
    },
    {
      title: 'Yoga ao Amanhecer: Saúde Mental e Física',
      cat: 'esportes',
      img: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: false,
    },
    {
      title: 'Calendário Acadêmico 2025 Divulgado',
      cat: 'academico',
      img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: true,
      break: true,
    },
    {
      title: 'Bolsas de Intercâmbio para a Europa',
      cat: 'academico',
      img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: false,
    },
    {
      title: 'Biblioteca Estende Horário nas Provas Finais',
      cat: 'academico',
      img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      feat: false,
      break: false,
    },
    {
      title: 'Novo Curso de Arquitetura e Urbanismo',
      cat: 'academico',
      img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.SCHEDULED,
      feat: false,
      break: false,
    },
    {
      title: 'Dicas para Melhorar seu Rendimento nos Estudos',
      cat: 'academico',
      img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.DRAFT,
      feat: false,
      break: false,
    },
    {
      title: 'Resultado do Vestibular de Inverno',
      cat: 'academico',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      status: PostStatus.ARCHIVED,
      feat: false,
      break: false,
    },
  ];

  for (const [index, template] of postsTemplates.entries()) {
    const slug = makeSlug(template.title);

    let publishedAt: Date | null = null;
    const now = new Date();

    if (template.status === PostStatus.PUBLISHED) {
      publishedAt = new Date(
        now.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
      );
    } else if (template.status === PostStatus.SCHEDULED) {
      publishedAt = new Date(
        now.getTime() + Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
      );
    } else if (template.status === PostStatus.ARCHIVED) {
      publishedAt = new Date(
        now.getTime() - Math.floor(90 * 24 * 60 * 60 * 1000),
      );
    }

    const views =
      template.status === PostStatus.PUBLISHED
        ? Math.floor(Math.random() * 5000)
        : 0;

    const authorId = authorIds[index % authorIds.length];

    await prisma.post.upsert({
      where: { slug },
      update: {
        title: template.title,
        status: template.status,
        featuredImageUrl: template.img,
        currentViewsCount: views,
      },
      create: {
        id: randomUUID(),
        title: template.title,
        slug: slug,
        excerpt: `Confira todos os detalhes sobre "${template.title}". Uma notícia imperdível para a comunidade acadêmica.`,
        content: `
          <h2>${template.title}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <blockquote>"A educação é a arma mais poderosa que você pode usar para mudar o mundo."</blockquote>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        `,
        featuredImageUrl: template.img,
        status: template.status,
        isFeatured: template.feat,
        isBreakingNews: template.break,
        currentViewsCount: views,
        publishedAt: publishedAt,
        author: {
          connect: { id: authorId },
        },
        category: {
          connect: { id: catMap[template.cat] },
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
