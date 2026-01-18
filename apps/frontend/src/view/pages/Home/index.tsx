import { BreakingNewsBanner } from "./components/BreakingNewsBanner";
import { FeaturedPost  } from "./components/FeaturedPost";
import { PostGrid } from "./components/PostGrid";
import type {PostProps} from "./components/FeaturedPost";
import { Container } from "@/components/container";


const mockFeatured: PostProps = {
    id: "1",
    title: "Universidade Inaugura Centro de Pesquisa de Última Geração",
    excerpt: "A universidade inaugurou oficialmente seu novo centro de pesquisa de US$ 50 milhões, dedicado a impulsionar soluções em energia sustentável...",
    publishedAt: "2025-12-28",
    author: { name: "Dra. Sarah Mitchell" },
    slug: "novo-centro-de-pesquisa",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2686"
};

const mockCampusLife: Array<PostProps> = [
    {
        id: "2",
        title: "União Estudantil Realiza Festival de Inverno Anual",
        excerpt: "O festival de inverno reuniu estudantes, professores e funcionários para um dia de celebração e fortalecimento da comunidade.",
        publishedAt: "2025-12-27",
        author: { name: "Emily Rodriguez" },
        slug: "festival-de-inverno"
    },
    {
        id: "3",
        title: "Novo Centro de Bem-Estar Abre no Campus Principal",
        excerpt: "Os estudantes agora têm acesso a recursos abrangentes de saúde mental e fitness no recém-inaugurado centro de bem-estar.",
        publishedAt: "2025-12-26",
        author: { name: "Michael Chen" },
        slug: "centro-de-bem-estar"
    },
    {
        id: "4",
        title: "Departamento de Atletismo Celebra Título de Campeonato",
        excerpt: "O time de basquete universitário garantiu uma vitória histórica nas finais do campeonato regional neste fim de semana.",
        publishedAt: "2025-12-25",
        author: { name: "Jessica Thompson" },
        slug: "titulo-de-campeonato"
    }
];

export function Home() {
  return (
    // const data = Route.useLoaderData() <-- Futuramente usaremos isso
    <div className="flex flex-col gap-8 pb-20 bg-white">
      <BreakingNewsBanner message="Universidade anuncia novo centro de pesquisa para energia sustentável" />
      <section className="mt-4">
        <Container>
          <FeaturedPost post={mockFeatured} />
        </Container>
      </section>
      <PostGrid 
        title="Vida no Campus" 
        posts={mockCampusLife} 
      />
      <PostGrid 
        title="Notícias Acadêmicas" 
        posts={mockCampusLife} 
      />
    </div>
  );
}