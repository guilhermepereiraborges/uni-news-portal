import { PostCard } from "./PostCard";
import { SectionHeader } from "./SectionHeader";
import type { PostProps } from "./FeaturedPost";
import { Container } from "@/components/container";

interface PostGridProps {
  title?: string;
  posts: Array<PostProps>;
}

export function PostGrid({ title, posts }: PostGridProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-8">
      <Container>
        {title && <SectionHeader title={title} />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-slate-100 pb-8 md:border-none md:pb-0 last:border-none">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}