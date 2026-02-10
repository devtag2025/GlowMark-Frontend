import { getPostBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { buildPageUrl } from "@/utils/paths";


export default async function BlogPostPage(props) {
  const params = await props.params; // ✅ IMPORTANT
  const { locale, slug } = params;

  const post = await getPostBySlug(slug, locale);

   console.log("post ", post);
   
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-theme">
      {/* Spacer for header */}
      <div className="h-24" />

      <article className="max-w-6xl mx-auto px-6 pb-24 pt-6">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href={buildPageUrl("blog", locale)}
            className="inline-flex items-center gap-2 text-theme-muted hover:text-theme transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-10 mb-12">
          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full h-72 sm:h-80 lg:h-[420px] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Category */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-sm font-medium text-purple-300 uppercase">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white">
                  {post.title}
                </h1>
              </div>
            </div>
          )}

          {/* Meta Info Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Overview */}
            <div className="glow-card rounded-3xl p-6">
              <h2 className="text-sm font-semibold text-purple-400 mb-4 uppercase">
                Overview
              </h2>
              <p className="text-sm text-theme-secondary leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Meta Info */}
            <div className="glow-card rounded-3xl p-6 grid grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-theme-light mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Published
                </p>
                <p className="font-medium text-theme">{post.date}</p>
              </div>
              <div>
                <p className="text-theme-light mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Read Time
                </p>
                <p className="font-medium text-theme">{post.readTime}</p>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="col-span-2">
                  <p className="text-theme-light mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[var(--background-secondary)] border border-[var(--border-color)] text-xs text-theme-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <section className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg prose-invert max-w-none
                       prose-headings:text-theme prose-headings:font-bold
                       prose-p:text-theme-secondary prose-p:leading-relaxed
                       prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-theme prose-strong:font-semibold
                       prose-ul:text-theme-secondary prose-ol:text-theme-secondary
                       prose-li:marker:text-purple-400
                       prose-img:rounded-2xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>
      </article>
    </main>
  );
}

// Metadata
export async function generateMetadata(props) {
  const params = await props.params; // ✅ IMPORTANT
  const { locale, slug } = params;

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}


// Remove or comment out generateStaticParams for now
// We'll use dynamic rendering instead of SSG
