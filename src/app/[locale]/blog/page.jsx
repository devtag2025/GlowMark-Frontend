import { getAllPosts } from '@/lib/wordpress';
import BlogCard from '@/components/Blog/BlogCard';
import BlogHeader from '@/components/Blog/BlogHeader';

export default async function BlogPage({ params }) {
  const { locale } = params;
  const posts = await getAllPosts(locale);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Spacer for global header */}
      <div className="h-24" />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <BlogHeader locale={locale} />

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-theme-muted">
              No blog posts available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard 
                key={post.id} 
                blog={post} 
                index={index} 
                locale={locale} 
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { locale } = params;
  
  const titles = {
    en: 'Blog - Latest Articles & Insights',
    fr: 'Blog - Derniers Articles et Insights',
    nl: 'Blog - Laatste Artikelen en Inzichten'
  };

  return {
    title: titles[locale] || titles.en,
    description: 'Discover our latest blog posts, insights, and expert tips.',
  };
}